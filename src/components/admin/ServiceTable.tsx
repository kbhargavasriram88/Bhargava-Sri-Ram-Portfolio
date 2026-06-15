"use client";

import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit2, Trash2 } from "lucide-react";
import { deleteService } from "@/actions/services";
import { ServiceDialog } from "./ServiceDialog";

export function ServiceTable({ services }: { services: any[] }) {
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this service?")) {
      setIsDeleting(id);
      await deleteService(id);
      setIsDeleting(null);
    }
  };

  return (
    <div className="rounded-md border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Features</TableHead>
            <TableHead>Base Price</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {services.length === 0 && (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                No services found. Add one to get started.
              </TableCell>
            </TableRow>
          )}
          {services.map((service) => (
            <TableRow key={service._id}>
              <TableCell className="font-medium">{service.title}</TableCell>
              <TableCell>
                <div className="flex gap-1 flex-wrap">
                  {service.features.map((f: string) => (
                    <Badge key={f} variant="secondary" className="text-xs">{f}</Badge>
                  ))}
                </div>
              </TableCell>
              <TableCell>${service.basePrice}</TableCell>
              <TableCell className="text-right space-x-2">
                <ServiceDialog 
                  service={service} 
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
                  onClick={() => handleDelete(service._id)}
                  disabled={isDeleting === service._id}
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
