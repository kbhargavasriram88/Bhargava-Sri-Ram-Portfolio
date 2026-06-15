"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createCertificate, updateCertificate } from "@/actions/certificates";

export function CertificateDialog({ certificate, trigger }: { certificate?: any; trigger?: React.ReactElement }) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: certificate?.title || "",
    issuer: certificate?.issuer || "",
    date: certificate?.date ? new Date(certificate.date).toISOString().split('T')[0] : "",
    certificateUrl: certificate?.certificateUrl || "",
    imageUrl: certificate?.imageUrl || "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    if (certificate?._id) {
      await updateCertificate(certificate._id, formData);
    } else {
      await createCertificate(formData);
    }
    
    setIsLoading(false);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={trigger || <Button>Add Certificate</Button>} />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{certificate ? "Edit Certificate" : "Add Certificate"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label>Certificate Title</Label>
            <Input required value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} />
          </div>
          <div className="space-y-2">
            <Label>Issuing Organization</Label>
            <Input required value={formData.issuer} onChange={(e) => setFormData({...formData, issuer: e.target.value})} />
          </div>
          <div className="space-y-2">
            <Label>Issue Date</Label>
            <Input type="date" required value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} />
          </div>
          <div className="space-y-2">
            <Label>Credential URL</Label>
            <Input type="url" value={formData.certificateUrl} onChange={(e) => setFormData({...formData, certificateUrl: e.target.value})} />
          </div>
          <div className="space-y-2">
            <Label>Image/Badge URL</Label>
            <Input value={formData.imageUrl} onChange={(e) => setFormData({...formData, imageUrl: e.target.value})} />
          </div>
          
          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button type="submit" disabled={isLoading}>{isLoading ? "Saving..." : "Save Certificate"}</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
