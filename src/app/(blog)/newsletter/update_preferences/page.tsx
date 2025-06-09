"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function UpdatePreferencesPage() {
    const [id, setId] = useState<string | null>(null);
    const [email, setEmail] = useState<string | null>(null);

    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        setId(searchParams.get("id"));
        setEmail(searchParams.get("email"));
    }, []);
    
    const [preferences, setPreferences] = useState<string[]>([]);
    const [isSaving, setIsSaving] = useState(false);

    const handleCheckboxChange = (preference: string) => {
        setPreferences((prev) =>
            prev.includes(preference)
                ? prev.filter((p) => p !== preference)
                : [...prev, preference]
        );
    };

    const savePreferences = async () => {
        setIsSaving(true);
        try {
            const res = await fetch("/api/v1/newsletter/subscriber", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ preferences, email }),
            });

            if (!res.ok) {
                const errorData = await res.json();
                toast.error(errorData.error || "Failed to update preferences");
            } else {
                toast.success("Preferences updated successfully!");
            }
        } catch (error) {
            toast.error("An error occurred while updating preferences");
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="p-6 bg-white rounded-md shadow-md w-full max-w-md">
                <h2 className="text-center text-xl font-semibold mb-4">Update Preferences</h2>
                <div className="grid gap-4 py-4">
                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            id="promotions"
                            checked={preferences.includes("promotions")}
                            onChange={() => handleCheckboxChange("promotions")}
                        />
                        <label htmlFor="promotions">Promotions</label>
                    </div>
                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            id="updates"
                            checked={preferences.includes("updates")}
                            onChange={() => handleCheckboxChange("updates")}
                        />
                        <label htmlFor="updates">Updates</label>
                    </div>
                </div>
                <div className="flex justify-center mt-4">
                    <Button onClick={savePreferences} disabled={isSaving}>
                        {isSaving ? "Saving..." : "Save Preferences"}
                    </Button>
                </div>
            </div>
        </div>
    );
}
