"use client";

import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit2, Trash2 } from "lucide-react";
import { deleteSkill } from "@/actions/skills";
import { SkillDialog } from "./SkillDialog";
import { Progress } from "@/components/ui/progress";

export function SkillTable({ skills }: { skills: any[] }) {
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this skill?")) {
      setIsDeleting(id);
      await deleteSkill(id);
      setIsDeleting(null);
    }
  };

  return (
    <div className="rounded-md border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead className="w-[30%]">Proficiency</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {skills.length === 0 && (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                No skills found. Add one to get started.
              </TableCell>
            </TableRow>
          )}
          {skills.map((skill) => (
            <TableRow key={skill._id}>
              <TableCell className="font-medium">{skill.name}</TableCell>
              <TableCell><Badge variant="outline">{skill.category}</Badge></TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Progress value={skill.level} className="h-2" />
                  <span className="text-xs text-muted-foreground w-8">{skill.level}%</span>
                </div>
              </TableCell>
              <TableCell className="text-right space-x-2">
                <SkillDialog 
                  skill={skill} 
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
                  onClick={() => handleDelete(skill._id)}
                  disabled={isDeleting === skill._id}
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
