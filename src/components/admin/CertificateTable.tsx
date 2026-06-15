"use client";

import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit2, Trash2, ExternalLink } from "lucide-react";
import { deleteCertificate } from "@/actions/certificates";
import { CertificateDialog } from "./CertificateDialog";

export function CertificateTable({ certificates }: { certificates: any[] }) {
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this certificate?")) {
      setIsDeleting(id);
      await deleteCertificate(id);
      setIsDeleting(null);
    }
  };

  return (
    <div className="rounded-md border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Issuer</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {certificates.length === 0 && (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                No certificates found. Add one to get started.
              </TableCell>
            </TableRow>
          )}
          {certificates.map((cert) => (
            <TableRow key={cert._id}>
              <TableCell className="font-medium">
                {cert.title}
                {cert.certificateUrl && (
                  <a href={cert.certificateUrl} target="_blank" rel="noreferrer" className="inline-flex items-center ml-2 text-primary hover:underline text-xs">
                    Link <ExternalLink className="w-3 h-3 ml-1" />
                  </a>
                )}
              </TableCell>
              <TableCell>{cert.issuer}</TableCell>
              <TableCell className="text-muted-foreground">
                {new Date(cert.date).toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}
              </TableCell>
              <TableCell className="text-right space-x-2">
                <CertificateDialog 
                  certificate={cert} 
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
                  onClick={() => handleDelete(cert._id)}
                  disabled={isDeleting === cert._id}
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
