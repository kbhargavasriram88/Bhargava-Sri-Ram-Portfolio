"use client";

import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit2, Trash2 } from "lucide-react";
import { deleteProject } from "@/actions/projects";
import { ProjectDialog } from "./ProjectDialog";

export function ProjectTable({ projects }: { projects: any[] }) {
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this project?")) {
      setIsDeleting(id);
      await deleteProject(id);
      setIsDeleting(null);
    }
  };

  return (
    <div className="rounded-md border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Technologies</TableHead>
            <TableHead>Order</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {projects.length === 0 && (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                No projects found. Add one to get started.
              </TableCell>
            </TableRow>
          )}
          {projects.map((project) => (
            <TableRow key={project._id}>
              <TableCell className="font-medium">{project.title}</TableCell>
              <TableCell><Badge variant="secondary">{project.category}</Badge></TableCell>
              <TableCell>
                <div className="flex gap-1 flex-wrap">
                  {project.technologies.slice(0, 3).map((t: string) => (
                    <Badge key={t} variant="outline" className="text-xs">{t}</Badge>
                  ))}
                  {project.technologies.length > 3 && <Badge variant="outline" className="text-xs">+{project.technologies.length - 3}</Badge>}
                </div>
              </TableCell>
              <TableCell>{project.order}</TableCell>
              <TableCell className="text-right space-x-2">
                <ProjectDialog 
                  project={project} 
                  trigger={
                    <Button variant="ghost" size="icon">
                      <Edit2 className="w-4 h-4" />
                    </Button>
                  } 
                />
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-destructive hover:text-destructive"
                  onClick={() => handleDelete(project._id)}
                  disabled={isDeleting === project._id}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
