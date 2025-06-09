"use client";

import useSWR from "swr";
import { useState } from "react";
import { format } from "date-fns";
import {
  Search as SearchIcon,
  Trash2,
  Mail,
  UserCheck,
  UserX,
  AlertTriangle,
  Download,
  Filter,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function NewsletterSubscribersPage() {
  const { data: subscribers = [], mutate } = useSWR(
    "/api/v1/newsletter/subscribers",
    fetcher
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [subscriberToDelete, setSubscriberToDelete] = useState<any>(null);
  const [isEditPreferencesDialogOpen, setIsEditPreferencesDialogOpen] =
    useState(false);
  const [subscriberToEdit, setSubscriberToEdit] = useState<any>(null);
  const [editedPreferences, setEditedPreferences] = useState<string[]>([]);

  // Filter subscribers based on search query, status
  const filteredSubscribers = subscribers.filter((subscriber: any) => {
    const matchesSearch =
      subscriber.userName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      subscriber.email.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || subscriber.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Handle delete subscriber
  const handleDeleteSubscriber = async () => {
    if (subscriberToDelete) {
      await fetch(
        `/api/v1/newsletter/subscriber?email=${subscriberToDelete.email}`,
        {
          method: "DELETE",
        }
      );
      mutate();
      setSubscriberToDelete(null);
      setIsDeleteDialogOpen(false);
    }
  };

  // Open edit preferences dialog
  const openEditPreferences = (subscriber: any) => {
    setSubscriberToEdit(subscriber);
    setEditedPreferences(subscriber.preferences || []);
    setIsEditPreferencesDialogOpen(true);
  };

  // Save preferences
  const savePreferences = async () => {
    if (subscriberToEdit) {
      const res = await fetch("/api/v1/newsletter/subscriber", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: subscriberToEdit.email,
          preferences: editedPreferences,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        toast.error(errorData.error || "Failed to update preferences");
      }

      mutate();
      setIsEditPreferencesDialogOpen(false);
      setSubscriberToEdit(null);
    }
  };

  // Toggle subscriber status
  const toggleSubscriberStatus = async (subscriber: any) => {
    if (subscriber.status === "unsubscribed") {
      await fetch("/api/v1/newsletter/subscriber", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: subscriber.email,
          preferences: ["promotions", "updates"],
        }),
      })
        .then(() => {
          mutate();
        })
        .finally(() => {
          toast.success("Subscriber re-subscribed successfully!");
        });
    } else {
      await fetch(`/api/v1/newsletter/unsubscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: subscriber.email }),
      })
        .then(() => {
          mutate();
        })
        .finally(() => {
          toast.success("Subscriber unsubscribed successfully!");
        });
    }
  };

  // Get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            Active
          </Badge>
        );
      case "unsubscribed":
        return (
          <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">
            Inactive
          </Badge>
        );
      case "bounced":
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
            Bounced
          </Badge>
        );
      default:
        return <Badge>{status}</Badge>;
    }
  };

  // Count subscribers by status
  const activeCount = subscribers.filter(
    (sub: any) => sub.status === "active"
  ).length;
  const inactiveCount = subscribers.filter(
    (sub: any) => sub.status === "unsubscribed"
  ).length;
  const bouncedCount = subscribers.filter(
    (sub: any) => sub.status === "bounced"
  ).length;

  return (
    <div className="container-custom mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Newsletter Subscribers</h1>
        <Button className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Export CSV
        </Button>
      </div>

      {/* Stats overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="p-4 bg-white border rounded-md">
          <div className="text-sm text-gray-500">Total Subscribers</div>
          <div className="text-2xl font-bold">{subscribers.length}</div>
        </div>
        <div className="p-4 bg-white border rounded-md">
          <div className="text-sm text-gray-500">Active</div>
          <div className="text-2xl font-bold text-green-600">{activeCount}</div>
        </div>
        <div className="p-4 bg-white border rounded-md">
          <div className="text-sm text-gray-500">Inactive</div>
          <div className="text-2xl font-bold text-yellow-600">
            {inactiveCount}
          </div>
        </div>
        <div className="p-4 bg-white border rounded-md">
          <div className="text-sm text-gray-500">Bounced</div>
          <div className="text-2xl font-bold text-red-600">{bouncedCount}</div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        {/* Search bar */}
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <SearchIcon className="h-4 w-4 text-gray-400" />
          </div>
          <Input
            type="text"
            placeholder="Search by name or email..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Status filter */}
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="unsubscribed">Inactive</SelectItem>
            <SelectItem value="bounced">Bounced</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Subscription Date</TableHead>
              <TableHead>Preferences</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSubscribers.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-center py-6 text-gray-500"
                >
                  No subscribers found matching your criteria
                </TableCell>
              </TableRow>
            ) : (
              filteredSubscribers.map((subscriber: any) => (
                <TableRow key={subscriber.id}>
                  <TableCell className="font-medium">
                    {subscriber.userName || subscriber.email}
                  </TableCell>
                  <TableCell>{subscriber.email}</TableCell>
                  <TableCell>{getStatusBadge(subscriber.status)}</TableCell>
                  <TableCell>
                    {format(new Date(subscriber.subscribedAt), "MMM dd, yyyy")}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1 flex-wrap">
                      {subscriber.preferences.includes("promotions") && (
                        <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100">
                          Promotions
                        </Badge>
                      )}
                      {subscriber.preferences.includes("updates") && (
                        <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">
                          Updates
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => openEditPreferences(subscriber)}
                        title="Edit Preferences"
                      >
                        <Filter className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => toggleSubscriberStatus(subscriber)}
                        title={
                          subscriber.status === "active"
                            ? "Deactivate"
                            : "Activate"
                        }
                      >
                        {subscriber.status === "active" ? (
                          <UserX className="h-4 w-4" />
                        ) : (
                          <UserCheck className="h-4 w-4" />
                        )}
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="text-red-500 hover:text-red-700"
                        onClick={() => {
                          setSubscriberToDelete(subscriber);
                          setIsDeleteDialogOpen(true);
                        }}
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this subscriber? This action
              cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteSubscriber}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Preferences Dialog */}
      <Dialog
        open={isEditPreferencesDialogOpen}
        onOpenChange={setIsEditPreferencesDialogOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Communication Preferences</DialogTitle>
            <DialogDescription>
              {subscriberToEdit && (
                <span>
                  Modify email preferences for {subscriberToEdit.email}
                </span>
              )}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="promotions"
                checked={editedPreferences.includes("promotions")}
                onChange={(e) => {
                  const updatedPreferences = e.target.checked
                    ? [...editedPreferences, "promotions"]
                    : editedPreferences.filter((pref) => pref !== "promotions");
                  setEditedPreferences(updatedPreferences);
                }}
              />
              <label htmlFor="promotions">Promotions</label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="updates"
                checked={editedPreferences.includes("updates")}
                onChange={(e) => {
                  const updatedPreferences = e.target.checked
                    ? [...editedPreferences, "updates"]
                    : editedPreferences.filter((pref) => pref !== "updates");
                  setEditedPreferences(updatedPreferences);
                }}
              />
              <label htmlFor="updates">Updates</label>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditPreferencesDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={savePreferences}>Save Preferences</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
