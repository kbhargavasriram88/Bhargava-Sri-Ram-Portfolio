"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { createExperience, updateExperience } from "@/actions/experience";

export function ExperienceDialog({ experience, trigger }: { experience?: any; trigger?: React.ReactElement }) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    title: experience?.title || "",
    organization: experience?.organization || "",
    type: experience?.type || "Work",
    startDate: experience?.startDate ? new Date(experience.startDate).toISOString().split('T')[0] : "",
    endDate: experience?.endDate ? new Date(experience.endDate).toISOString().split('T')[0] : "",
    current: experience?.current || false,
    description: experience?.description || "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    if (experience?._id) {
      await updateExperience(experience._id, formData);
    } else {
      await createExperience(formData);
    }
    
    setIsLoading(false);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={trigger || <Button>Add Experience</Button>} />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{experience ? "Edit Experience" : "Add Experience"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Title/Role</Label>
              <Input required value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} />
            </div>
            <div className="space-y-2">
              <Label>Organization</Label>
              <Input required value={formData.organization} onChange={(e) => setFormData({...formData, organization: e.target.value})} />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Type</Label>
            <select 
              className="w-full flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm"
              value={formData.type} 
              onChange={(e) => setFormData({...formData, type: e.target.value})}
            >
              <option value="Work">Work</option>
              <option value="Education">Education</option>
              <option value="Volunteer">Volunteer</option>
              <option value="Leadership">Leadership</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Start Date</Label>
              <Input type="date" required value={formData.startDate} onChange={(e) => setFormData({...formData, startDate: e.target.value})} />
            </div>
            <div className="space-y-2">
              <Label>End Date</Label>
              <Input type="date" value={formData.endDate} disabled={formData.current} onChange={(e) => setFormData({...formData, endDate: e.target.value})} />
              <div className="flex items-center gap-2 mt-2">
                <input type="checkbox" id="current" checked={formData.current} onChange={(e) => setFormData({...formData, current: e.target.checked, endDate: ""})} />
                <Label htmlFor="current" className="text-sm font-normal">I currently work here</Label>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea required value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} />
          </div>
          
          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button type="submit" disabled={isLoading}>{isLoading ? "Saving..." : "Save Experience"}</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
