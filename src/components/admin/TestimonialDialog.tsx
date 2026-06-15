"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { createTestimonial, updateTestimonial } from "@/actions/testimonials";

export function TestimonialDialog({ testimonial, trigger }: { testimonial?: any; trigger?: React.ReactElement }) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    name: testimonial?.name || "",
    role: testimonial?.role || "",
    type: testimonial?.type || "Client",
    content: testimonial?.content || "",
    rating: testimonial?.rating || 5,
    imageUrl: testimonial?.imageUrl || "",
    order: testimonial?.order || 0,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (testimonial?._id) {
      await updateTestimonial(testimonial._id, formData);
    } else {
      await createTestimonial(formData);
    }
    
    setIsLoading(false);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={trigger || <Button>Add Testimonial</Button>} />
      <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{testimonial ? "Edit Testimonial" : "Add Testimonial"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Name</Label>
              <Input required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
            </div>
            <div className="space-y-2">
              <Label>Role / Company</Label>
              <Input required value={formData.role} onChange={(e) => setFormData({...formData, role: e.target.value})} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Type</Label>
              <select 
                className="w-full flex h-10 items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={formData.type} 
                onChange={(e) => setFormData({...formData, type: e.target.value})}
              >
                <option value="Client">Client</option>
                <option value="Colleague">Colleague</option>
                <option value="Mentor">Mentor</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label>Rating (1-5)</Label>
              <Input type="number" min={1} max={5} required value={formData.rating} onChange={(e) => setFormData({...formData, rating: parseInt(e.target.value) || 5})} />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Testimonial Content</Label>
            <Textarea required className="h-32" value={formData.content} onChange={(e) => setFormData({...formData, content: e.target.value})} />
          </div>
          <div className="space-y-2">
            <Label>Profile Image URL (Optional)</Label>
            <Input value={formData.imageUrl} onChange={(e) => setFormData({...formData, imageUrl: e.target.value})} placeholder="https://..." />
          </div>
          <div className="space-y-2">
            <Label>Order</Label>
            <Input type="number" value={formData.order} onChange={(e) => setFormData({...formData, order: parseInt(e.target.value) || 0})} />
          </div>
          
          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button type="submit" disabled={isLoading}>{isLoading ? "Saving..." : "Save Testimonial"}</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
