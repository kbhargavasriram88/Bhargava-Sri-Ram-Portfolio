"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { createService, updateService } from "@/actions/services";

export function ServiceDialog({ service, trigger }: { service?: any; trigger?: React.ReactElement }) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    title: service?.title || "",
    description: service?.description || "",
    icon: service?.icon || "Code",
    features: service?.features?.join(", ") || "",
    basePrice: service?.basePrice || 0,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    const payload = {
      ...formData,
      features: formData.features.split(",").map((f: string) => f.trim()).filter(Boolean),
    };

    if (service?._id) {
      await updateService(service._id, payload);
    } else {
      await createService(payload);
    }
    
    setIsLoading(false);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={trigger || <Button>Add Service</Button>} />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{service ? "Edit Service" : "Add Service"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label>Title</Label>
            <Input required value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} />
          </div>
          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea required value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} />
          </div>
          <div className="space-y-2">
            <Label>Icon Name (Lucide React)</Label>
            <Input required value={formData.icon} onChange={(e) => setFormData({...formData, icon: e.target.value})} placeholder="Globe, Layout, Smartphone" />
          </div>
          <div className="space-y-2">
            <Label>Features (comma separated)</Label>
            <Input value={formData.features} onChange={(e) => setFormData({...formData, features: e.target.value})} placeholder="SEO, Responsive, Fast" />
          </div>
          <div className="space-y-2">
            <Label>Base Price ($)</Label>
            <Input type="number" value={formData.basePrice} onChange={(e) => setFormData({...formData, basePrice: e.target.value === "" ? "" : Number(e.target.value)})} />
          </div>
          
          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button type="submit" disabled={isLoading}>{isLoading ? "Saving..." : "Save Service"}</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
