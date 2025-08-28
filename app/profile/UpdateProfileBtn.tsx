// UpdateProfileBtn.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { updateUser } from "@/controllers/updateUserProfile";

export default function UpdateProfileBtn({ user }: { user: any }) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    firstName: user.firstName || "",
    lastName: user.lastName || "",
    description: user.description || "",
    businessHours: user.businessHours || "",
    responseTime: user.responseTime || "",
    phone: user.phone || "",
    country: user.country || "",
    city: user.city || "",
    state: user.state || "",
    zipCode: user.zipCode || "",
  });
  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Handle submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await updateUser(user.id, form);

      if (res.success) {
        toast.success("Profile updated successfully!");
        setOpen(false);
      } else {
        toast.error(res.message || "Update failed");
      }
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button variant="outline" size="icon" onClick={() => setOpen(true)}>
        <Edit className="w-4 h-4" />
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Profile</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-2">
              <Input name="firstName" value={form.firstName} onChange={handleChange} placeholder="First Name" />
              <Input name="lastName" value={form.lastName} onChange={handleChange} placeholder="Last Name" />
            </div>
            <Textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" />
            <Input name="businessHours" value={form.businessHours} onChange={handleChange} placeholder="Business Hours" />
            <Input name="responseTime" value={form.responseTime} onChange={handleChange} placeholder="Response Time" />
            <Input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone" />
            <div className="grid grid-cols-2 gap-2">
              <Input name="country" value={form.country} onChange={handleChange} placeholder="Country" />
              <Input name="city" value={form.city} onChange={handleChange} placeholder="City" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Input name="state" value={form.state} onChange={handleChange} placeholder="State" />
              <Input name="zipCode" value={form.zipCode} onChange={handleChange} placeholder="Zip Code" />
            </div>
            <DialogFooter>
              <Button type="submit" disabled={loading}>
                {loading ? "Updating..." : "Update"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
