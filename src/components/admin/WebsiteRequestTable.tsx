"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Trash2, Eye, Mail, Phone, Calendar, DollarSign, Clock, MessageSquare, ExternalLink } from "lucide-react";
import { updateWebsiteRequestStatus, deleteWebsiteRequest } from "@/actions/websiteRequest";
import { ClientRequirementDetailModal } from "@/components/admin/ClientRequirementDetailModal";

export function WebsiteRequestTable({ requests }: { requests: any[] }) {
  const router = useRouter();
  const [selectedRequest, setSelectedRequest] = useState<any | null>(null);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>("All");

  const filteredRequests = statusFilter === "All" 
    ? requests 
    : requests.filter((r) => r.status === statusFilter);

  const handleStatusChange = async (id: string, newStatus: string) => {
    await updateWebsiteRequestStatus(id, newStatus);
    if (selectedRequest && selectedRequest._id === id) {
      setSelectedRequest({ ...selectedRequest, status: newStatus });
    }
    router.refresh();
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this website request?")) {
      setIsDeleting(id);
      await deleteWebsiteRequest(id);
      if (selectedRequest?._id === id) setSelectedRequest(null);
      router.refresh();
      setIsDeleting(null);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "New":
        return <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">New</Badge>;
      case "In Touch":
        return <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">In Touch</Badge>;
      case "Accepted":
        return <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">Accepted</Badge>;
      case "Completed":
        return <Badge className="bg-teal-500/20 text-teal-400 border-teal-500/30">Completed</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-4">
      {/* FILTER BAR */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        <span className="text-xs font-semibold text-muted-foreground mr-2">Filter by Status:</span>
        {["All", "New", "In Touch", "Accepted", "Completed", "Archived"].map((status) => (
          <Button
            key={status}
            variant={statusFilter === status ? "default" : "outline"}
            size="sm"
            onClick={() => setStatusFilter(status)}
            className="text-xs h-8"
          >
            {status}
          </Button>
        ))}
      </div>

      {/* TABLE */}
      <div className="rounded-md border bg-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell className="font-semibold">Client Name</TableCell>
              <TableCell className="font-semibold">Service Type</TableCell>
              <TableCell className="font-semibold">Budget</TableCell>
              <TableCell className="font-semibold">Timeline</TableCell>
              <TableCell className="font-semibold">Status</TableCell>
              <TableCell className="font-semibold text-right">Actions</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRequests.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  No website requests found.
                </TableCell>
              </TableRow>
            ) : (
              filteredRequests.map((req) => (
                <TableRow key={req._id} className="hover:bg-muted/30 transition-colors">
                  <TableCell className="font-medium">
                    <div>{req.name}</div>
                    <div className="text-xs text-muted-foreground">{req.email}</div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{req.serviceType}</Badge>
                  </TableCell>
                  <TableCell className="text-sm font-semibold text-emerald-400">
                    {req.budget}
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">
                    {req.timeline}
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(req.status)}
                  </TableCell>
                  <TableCell className="text-right space-x-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setSelectedRequest(req)}
                      title="View Details"
                    >
                      <Eye className="w-4 h-4 text-primary" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-destructive hover:text-destructive"
                      onClick={() => handleDelete(req._id)}
                      disabled={isDeleting === req._id}
                      title="Delete Request"
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

      {/* REQUEST DETAILS MODAL */}
      <ClientRequirementDetailModal
        request={selectedRequest}
        open={!!selectedRequest}
        onClose={() => setSelectedRequest(null)}
        onStatusChange={handleStatusChange}
        getStatusBadge={getStatusBadge}
      />
    </div>
  );
}
