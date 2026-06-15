"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createSkill, updateSkill } from "@/actions/skills";

export function SkillDialog({ skill, trigger }: { skill?: any; trigger?: React.ReactElement }) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    name: skill?.name || "",
    category: skill?.category || "Frontend",
    progress: skill?.progress || 80,
    yearsOfExperience: skill?.yearsOfExperience || 1,
    level: skill?.level || "Intermediate",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    if (skill?._id) {
      await updateSkill(skill._id, formData);
    } else {
      await createSkill(formData);
    }
    
    setIsLoading(false);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={trigger || <Button>Add Skill</Button>} />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{skill ? "Edit Skill" : "Add Skill"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label>Name</Label>
            <Input required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder="e.g. Next.js" />
          </div>
          <div className="space-y-2">
            <Label>Category</Label>
            <select 
              className="w-full flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm"
              value={formData.category} 
              onChange={(e) => setFormData({...formData, category: e.target.value})}
            >
              <option value="Frontend">Frontend</option>
              <option value="Backend">Backend</option>
              <option value="Database">Database</option>
              <option value="AI/ML">AI/ML</option>
              <option value="Hosting">Hosting</option>
              <option value="Deployment">Deployment</option>
              <option value="Version Control">Version Control</option>
            </select>
          </div>
          <div className="space-y-2">
            <Label>Proficiency Level (0-100)</Label>
            <Input type="number" min="0" max="100" required value={formData.progress} onChange={(e) => setFormData({...formData, progress: parseInt(e.target.value) || 0})} />
          </div>
          <div className="space-y-2">
            <Label>Years of Experience</Label>
            <Input type="number" min="0" step="0.5" required value={formData.yearsOfExperience} onChange={(e) => setFormData({...formData, yearsOfExperience: parseFloat(e.target.value) || 0})} />
          </div>
          <div className="space-y-2">
            <Label>Level</Label>
            <select 
              className="w-full flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm"
              value={formData.level} 
              onChange={(e) => setFormData({...formData, level: e.target.value})}
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
              <option value="Expert">Expert</option>
            </select>
          </div>
          
          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button type="submit" disabled={isLoading}>{isLoading ? "Saving..." : "Save Skill"}</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
