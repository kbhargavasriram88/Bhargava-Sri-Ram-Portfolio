"use client";

import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit2, Trash2 } from "lucide-react";
import { deleteExperience } from "@/actions/experience";
import { ExperienceDialog } from "./ExperienceDialog";

export function ExperienceTable({ experience }: { experience: any[] }) {
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this experience record?")) {
      setIsDeleting(id);
      await deleteExperience(id);
      setIsDeleting(null);
    }
  };

  return (
    <div className="rounded-md border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Role/Title</TableHead>
            <TableHead>Organization</TableHead>
            <TableHead>Timeline</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {experience.length === 0 && (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                No experience records found. Add one to get started.
              </TableCell>
            </TableRow>
          )}
          {experience.map((exp) => (
            <TableRow key={exp._id}>
              <TableCell>
                <div className="font-medium">{exp.title}</div>
                <Badge variant="outline" className="mt-1 text-[10px] uppercase">{exp.type}</Badge>
              </TableCell>
              <TableCell>{exp.organization}</TableCell>
              <TableCell className="text-sm text-muted-foreground">
                {new Date(exp.startDate).toLocaleDateString(undefined, { month: 'short', year: 'numeric' })} 
                {" - "} 
                {exp.current ? "Present" : new Date(exp.endDate).toLocaleDateString(undefined, { month: 'short', year: 'numeric' })}
              </TableCell>
              <TableCell className="text-right space-x-2">
                <ExperienceDialog 
                  experience={exp} 
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
                  onClick={() => handleDelete(exp._id)}
                  disabled={isDeleting === exp._id}
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
