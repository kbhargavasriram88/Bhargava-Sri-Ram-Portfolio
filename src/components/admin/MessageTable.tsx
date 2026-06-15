"use client";

import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trash2, Eye, CheckCircle2 } from "lucide-react";
import { deleteMessage, markMessageRead } from "@/actions/messages";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export function MessageTable({ messages }: { messages: any[] }) {
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [selectedMessage, setSelectedMessage] = useState<any | null>(null);

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this message?")) {
      setIsDeleting(id);
      await deleteMessage(id);
      setIsDeleting(null);
    }
  };

  const handleView = async (msg: any) => {
    setSelectedMessage(msg);
    if (!msg.read) {
      await markMessageRead(msg._id);
    }
  };

  return (
    <>
      <div className="rounded-md border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Status</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {messages.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                  No messages found.
                </TableCell>
              </TableRow>
            )}
            {messages.map((msg) => (
              <TableRow key={msg._id} className={msg.read ? "opacity-70" : "font-semibold bg-muted/20"}>
                <TableCell>
                  {msg.read ? (
                    <Badge variant="outline" className="text-muted-foreground">Read</Badge>
                  ) : (
                    <Badge variant="default" className="bg-primary">New</Badge>
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span>{msg.name}</span>
                    <span className="text-xs text-muted-foreground font-normal">{msg.email}</span>
                  </div>
                </TableCell>
                <TableCell className="max-w-[200px] truncate">{msg.subject}</TableCell>
                <TableCell className="text-muted-foreground text-sm">
                  {new Date(msg.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right space-x-2">
                  <Button variant="ghost" size="icon" onClick={() => handleView(msg)}>
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="text-destructive hover:text-destructive"
                    onClick={() => handleDelete(msg._id)}
                    disabled={isDeleting === msg._id}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={!!selectedMessage} onOpenChange={() => setSelectedMessage(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Message Details</DialogTitle>
          </DialogHeader>
          {selectedMessage && (
            <div className="space-y-6 mt-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground mb-1">From</p>
                  <p className="font-medium">{selectedMessage.name}</p>
                  <a href={`mailto:${selectedMessage.email}`} className="text-primary hover:underline">{selectedMessage.email}</a>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">Date</p>
                  <p className="font-medium">{new Date(selectedMessage.createdAt).toLocaleString()}</p>
                </div>
              </div>
              <div>
                <p className="text-muted-foreground mb-1 text-sm">Subject</p>
                <p className="font-medium">{selectedMessage.subject}</p>
              </div>
              <div>
                <p className="text-muted-foreground mb-2 text-sm">Message</p>
                <div className="bg-muted/30 p-4 rounded-md text-sm whitespace-pre-wrap leading-relaxed">
                  {selectedMessage.message}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
