"use client"
import { useState } from "react";
import { format } from "date-fns";
import { Search as SearchIcon, Trash2, Mail, UserCheck, UserX, AlertTriangle, Download, Filter } from "lucide-react";
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

// Sample initial data
const initialSubscribers = [
  {
    id: "sub_1",
    name: "Jane Cooper",
    email: "jane.cooper@example.com",
    status: "active",
    subscriptionDate: new Date(2024, 2, 15),
    preferences: {
      marketing: true,
      updates: true,
      promotions: false
    },
  },
  {
    id: "sub_2",
    name: "Cody Fisher",
    email: "cody.fisher@example.com",
    status: "inactive",
    subscriptionDate: new Date(2023, 11, 10),
    preferences: {
      marketing: false,
      updates: true,
      promotions: false
    },
  },
  {
    id: "sub_3",
    name: "Esther Howard",
    email: "esther.howard@example.com",
    status: "active",
    subscriptionDate: new Date(2024, 3, 5),
    preferences: {
      marketing: true,
      updates: true,
      promotions: true
    },
  },
  {
    id: "sub_4",
    name: "Kristin Watson",
    email: "kristin.watson@example.com",
    status: "unconfirmed",
    subscriptionDate: new Date(2024, 3, 12),
    preferences: {
      marketing: false,
      updates: false,
      promotions: false
    },
  },
  {
    id: "sub_5",
    name: "Cameron Williamson",
    email: "cameron.williamson@example.com",
    status: "active",
    subscriptionDate: new Date(2024, 1, 20),
    preferences: {
      marketing: true,
      updates: false,
      promotions: true
    },
  },
  {
    id: "sub_6",
    name: "Brooklyn Simmons",
    email: "brooklyn.simmons@example.com",
    status: "bounced",
    subscriptionDate: new Date(2023, 9, 5),
    preferences: {
      marketing: true,
      updates: true,
      promotions: false
    },
  }
];

export default function NewsletterSubscribersPage() {
  const [subscribers, setSubscribers] = useState(initialSubscribers);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [subscriberToDelete, setSubscriberToDelete] = useState<any>(null);
  const [isEditPreferencesDialogOpen, setIsEditPreferencesDialogOpen] = useState(false);
  const [subscriberToEdit, setSubscriberToEdit] = useState<any>(null);
  const [editedPreferences, setEditedPreferences] = useState({
    marketing: false,
    updates: false,
    promotions: false
  });

  // Filter subscribers based on search query, status
  const filteredSubscribers = subscribers.filter((subscriber) => {
    const matchesSearch = 
      subscriber.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      subscriber.email.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesStatus = 
      statusFilter === "all" || 
      subscriber.status === statusFilter;
      
    return matchesSearch && matchesStatus;
  });

  // Handle delete subscriber
  const handleDeleteSubscriber = () => {
    if (subscriberToDelete) {
      setSubscribers(subscribers.filter(sub => sub.id !== subscriberToDelete));
      setSubscriberToDelete(null);
      setIsDeleteDialogOpen(false);
    }
  };

  // Open edit preferences dialog
  const openEditPreferences = (subscriber: any) => {
    setSubscriberToEdit(subscriber);
    setEditedPreferences({ ...subscriber.preferences });
    setIsEditPreferencesDialogOpen(true);
  };

  // Save preferences
  const savePreferences = () => {
    if (subscriberToEdit) {
      setSubscribers(subscribers.map(sub => {
        if (sub.id === subscriberToEdit.id) {
          return {
            ...sub,
            preferences: editedPreferences
          };
        }
        return sub;
      }));
      setIsEditPreferencesDialogOpen(false);
      setSubscriberToEdit(null);
    }
  };

  // Toggle subscriber status
  const toggleSubscriberStatus = (id: string, currentStatus: string) => {
    setSubscribers(subscribers.map(sub => {
      if (sub.id === id) {
        return {
          ...sub,
          status: currentStatus === "active" ? "inactive" : "active"
        };
      }
      return sub;
    }));
  };

  // Get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>;
      case "inactive":
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Inactive</Badge>;
      case "unconfirmed":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Unconfirmed</Badge>;
      case "bounced":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Bounced</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  // Count subscribers by status
  const activeCount = subscribers.filter(sub => sub.status === "active").length;
  const inactiveCount = subscribers.filter(sub => sub.status === "inactive").length;
  const unconfirmedCount = subscribers.filter(sub => sub.status === "unconfirmed").length;
  const bouncedCount = subscribers.filter(sub => sub.status === "bounced").length;

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
          <div className="text-sm text-gray-500">Inactive/Unconfirmed</div>
          <div className="text-2xl font-bold text-yellow-600">{inactiveCount + unconfirmedCount}</div>
        </div>
        <div className="p-4 bg-white border rounded-md">
          <div className="text-sm text-gray-500">Bounced</div>
          <div className="text-2xl font-bold text-red-600">{bouncedCount}</div>
        </div>
      </div>

      {bouncedCount > 0 && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md flex items-center">
          <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
          <div>
            <p className="font-medium text-red-700">
              {bouncedCount} {bouncedCount === 1 ? 'email' : 'emails'} have bounced and may need to be removed
            </p>
          </div>
        </div>
      )}

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
            <SelectItem value="inactive">Inactive</SelectItem>
            <SelectItem value="unconfirmed">Unconfirmed</SelectItem>
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
                <TableCell colSpan={7} className="text-center py-6 text-gray-500">
                  No subscribers found matching your criteria
                </TableCell>
              </TableRow>
            ) : (
              filteredSubscribers.map((subscriber) => {
                let rowClass = "";
                if (subscriber.status === "bounced") rowClass = "bg-red-50";
                else if (subscriber.status === "unconfirmed") rowClass = "bg-yellow-50";
                
                return (
                  <TableRow key={subscriber.id} className={rowClass}>
                    <TableCell className="font-medium">{subscriber.name}</TableCell>
                    <TableCell>{subscriber.email}</TableCell>
                    <TableCell>{getStatusBadge(subscriber.status)}</TableCell>
                    <TableCell>{format(subscriber.subscriptionDate, "MMM dd, yyyy")}</TableCell>
                    <TableCell>
                      <div className="flex gap-1 flex-wrap">
                        {subscriber.preferences.marketing && (
                          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Marketing</Badge>
                        )}
                        {subscriber.preferences.updates && (
                          <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">Updates</Badge>
                        )}
                        {subscriber.preferences.promotions && (
                          <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100">Promotions</Badge>
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
                          onClick={() => toggleSubscriberStatus(subscriber.id, subscriber.status)}
                          title={subscriber.status === "active" ? "Deactivate" : "Activate"}
                        >
                          {subscriber.status === "active" ? 
                            <UserX className="h-4 w-4" /> : 
                            <UserCheck className="h-4 w-4" />
                          }
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          className="text-red-500 hover:text-red-700"
                          onClick={() => {
                            setSubscriberToDelete(subscriber.id);
                            setIsDeleteDialogOpen(true);
                          }}
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })
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
              Are you sure you want to delete this subscriber? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteSubscriber}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Preferences Dialog */}
      <Dialog open={isEditPreferencesDialogOpen} onOpenChange={setIsEditPreferencesDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Communication Preferences</DialogTitle>
            <DialogDescription>
              {subscriberToEdit && (
                <span>Modify email preferences for {subscriberToEdit.email}</span>
              )}
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="marketing"
                checked={editedPreferences.marketing}
                onChange={(e) => setEditedPreferences({
                  ...editedPreferences,
                  marketing: e.target.checked
                })}
              />
              <label htmlFor="marketing">Marketing Communications</label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="updates"
                checked={editedPreferences.updates}
                onChange={(e) => setEditedPreferences({
                  ...editedPreferences,
                  updates: e.target.checked
                })}
              />
              <label htmlFor="updates">Product Updates</label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="promotions"
                checked={editedPreferences.promotions}
                onChange={(e) => setEditedPreferences({
                  ...editedPreferences,
                  promotions: e.target.checked
                })}
              />
              <label htmlFor="promotions">Promotions and Offers</label>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditPreferencesDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={savePreferences}>
              Save Preferences
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}