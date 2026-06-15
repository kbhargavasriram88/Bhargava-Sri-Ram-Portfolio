"use client";

import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit2, Trash2, Star } from "lucide-react";
import { deleteTestimonial } from "@/actions/testimonials";
import { TestimonialDialog } from "@/components/admin/TestimonialDialog";

export function TestimonialTable({ testimonials }: { testimonials: any[] }) {
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this testimonial?")) {
      setIsDeleting(id);
      await deleteTestimonial(id);
      setIsDeleting(null);
    }
  };

  return (
    <div className="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Client/Person</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Rating</TableHead>
            <TableHead>Order</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {testimonials.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                No testimonials found. Add one to get started!
              </TableCell>
            </TableRow>
          ) : (
            testimonials.map((t) => (
              <TableRow key={t._id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    {t.imageUrl ? (
                      <img src={t.imageUrl} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center font-bold">
                        {t.name.charAt(0)}
                      </div>
                    )}
                    <div>
                      <p className="font-medium">{t.name}</p>
                      <p className="text-sm text-muted-foreground">{t.role}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{t.type}</Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span>{t.rating}</span>
                  </div>
                </TableCell>
                <TableCell>{t.order}</TableCell>
                <TableCell className="text-right space-x-2">
                  <TestimonialDialog 
                    testimonial={t} 
                    trigger={<Button variant="ghost" size="icon"><Edit2 className="w-4 h-4" /></Button>} 
                  />
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="text-destructive hover:text-destructive"
                    onClick={() => handleDelete(t._id)}
                    disabled={isDeleting === t._id}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
