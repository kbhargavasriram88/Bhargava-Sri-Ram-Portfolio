"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { createProject, updateProject } from "@/actions/projects";

export function ProjectDialog({ project, trigger }: { project?: any; trigger?: React.ReactElement }) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    title: project?.title || "",
    description: project?.description || "",
    imageUrl: project?.imageUrl || "",
    category: project?.category || "Web Development",
    githubUrl: project?.githubUrl || "",
    liveUrl: project?.liveUrl || "",
    technologies: project?.technologies?.join(", ") || "",
    order: project?.order || 0,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    const payload = {
      ...formData,
      technologies: formData.technologies ? formData.technologies.split(",").map((t: string) => t.trim()) : [],
    };

    try {
      if (project?._id) {
        await updateProject(project._id, payload);
      } else {
        await createProject(payload);
      }
      setOpen(false);
    } catch (error) {
      console.error("Error saving project:", error);
      alert("Failed to save project. Check console for details.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={trigger || <Button>Add Project</Button>} />
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{project ? "Edit Project" : "Add Project"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Title</Label>
              <Input required value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} />
            </div>
            <div className="space-y-2">
              <Label>Category</Label>
              <select 
                className="w-full flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={formData.category} 
                onChange={(e) => setFormData({...formData, category: e.target.value})}
              >
                <option value="Web Development">Web Development</option>
                <option value="Full Stack">Full Stack</option>
                <option value="AI/ML">AI/ML</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea required value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} />
          </div>
          <div className="space-y-2">
            <Label>Image URL (Cloudinary or public link)</Label>
            <Input required value={formData.imageUrl} onChange={(e) => setFormData({...formData, imageUrl: e.target.value})} />
          </div>
          <div className="space-y-2">
            <Label>Technologies (comma separated)</Label>
            <Input value={formData.technologies} onChange={(e) => setFormData({...formData, technologies: e.target.value})} placeholder="React, Node.js, Tailwind" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>GitHub URL</Label>
              <Input value={formData.githubUrl} onChange={(e) => setFormData({...formData, githubUrl: e.target.value})} />
            </div>
            <div className="space-y-2">
              <Label>Live URL</Label>
              <Input value={formData.liveUrl} onChange={(e) => setFormData({...formData, liveUrl: e.target.value})} />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Order (Sorting)</Label>
            <Input type="number" value={formData.order} onChange={(e) => setFormData({...formData, order: parseInt(e.target.value) || 0})} />
          </div>
          
          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button type="submit" disabled={isLoading}>{isLoading ? "Saving..." : "Save Project"}</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
