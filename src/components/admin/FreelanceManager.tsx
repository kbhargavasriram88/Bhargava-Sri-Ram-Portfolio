"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { 
  FileText, Briefcase, Settings, Search, Eye, Trash2, Mail, Phone, 
  ExternalLink, Sparkles, CheckCircle2, Clock, DollarSign, Filter, 
  MessageSquare, Plus, Edit, RefreshCw
} from "lucide-react";
import { updateWebsiteRequestStatus, deleteWebsiteRequest } from "@/actions/websiteRequest";
import { updateSettings } from "@/actions/settings";
import { createService, updateService, deleteService } from "@/actions/services";

interface FreelanceManagerProps {
  initialRequests: any[];
  initialServices: any[];
  initialSettings: any;
}

export function FreelanceManager({
  initialRequests,
  initialServices,
  initialSettings,
}: FreelanceManagerProps) {
  const router = useRouter();
  const [activeSubTab, setActiveSubTab] = useState<"requirements" | "services" | "settings">("requirements");

  // Requirements state
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedRequest, setSelectedRequest] = useState<any | null>(null);
  const [isDeletingReq, setIsDeletingReq] = useState<string | null>(null);

  // Settings form state
  const [requestFormConfig, setRequestFormConfig] = useState(
    initialSettings?.requestForm || {
      enabled: true,
      title: "Request a Custom Website",
      description: "Tell me about your idea, requirements, and budget to get a custom proposal within 24 hours.",
      badgeText: "Start Your Project",
      buttonText: "Request a Website",
      budgetOptions: ["₹5,000 - ₹15,000", "₹15,000 - ₹35,000", "₹35,000 - ₹75,000", "₹75,000+"],
      timelineOptions: ["Urgent (1-3 Days)", "1-2 Weeks", "3-4 Weeks", "Flexible"],
    }
  );
  const [isSavingSettings, setIsSavingSettings] = useState(false);
  const [settingsMsg, setSettingsMsg] = useState("");

  // Services Modal state
  const [isServiceDialogOpen, setIsServiceDialogOpen] = useState(false);
  const [editingService, setEditingService] = useState<any | null>(null);
  const [serviceFormData, setServiceFormData] = useState({ title: "", description: "", icon: "" });
  const [isSavingService, setIsSavingService] = useState(false);

  // Requirement Filter Logic
  const filteredRequests = initialRequests.filter((req) => {
    const matchesStatus = statusFilter === "All" || req.status === statusFilter;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !q ||
      req.name?.toLowerCase().includes(q) ||
      req.email?.toLowerCase().includes(q) ||
      req.serviceType?.toLowerCase().includes(q) ||
      req.description?.toLowerCase().includes(q) ||
      req.phone?.toLowerCase().includes(q);
    return matchesStatus && matchesSearch;
  });

  // Requirements Stats
  const totalCount = initialRequests.length;
  const newCount = initialRequests.filter((r) => r.status === "New").length;
  const inTouchCount = initialRequests.filter((r) => r.status === "In Touch").length;
  const acceptedCount = initialRequests.filter((r) => r.status === "Accepted" || r.status === "Completed").length;

  const handleStatusChange = async (id: string, newStatus: string) => {
    await updateWebsiteRequestStatus(id, newStatus);
    if (selectedRequest && selectedRequest._id === id) {
      setSelectedRequest({ ...selectedRequest, status: newStatus });
    }
    router.refresh();
  };

  const handleDeleteRequest = async (id: string) => {
    if (confirm("Are you sure you want to delete this requirement record from the database?")) {
      setIsDeletingReq(id);
      await deleteWebsiteRequest(id);
      if (selectedRequest?._id === id) setSelectedRequest(null);
      router.refresh();
      setIsDeletingReq(null);
    }
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingSettings(true);
    setSettingsMsg("");

    const res = await updateSettings({
      requestForm: requestFormConfig,
    });

    if (res.success) {
      setSettingsMsg("Requirement form settings saved successfully!");
      router.refresh();
    } else {
      setSettingsMsg("Failed to save settings.");
    }
    setIsSavingSettings(false);
  };

  const handleServiceSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingService(true);
    if (editingService) {
      await updateService(editingService._id, serviceFormData);
    } else {
      await createService(serviceFormData);
    }
    setIsServiceDialogOpen(false);
    setEditingService(null);
    setServiceFormData({ title: "", description: "", icon: "" });
    router.refresh();
    setIsSavingService(false);
  };

  const handleDeleteServiceItem = async (id: string) => {
    if (confirm("Delete this service item?")) {
      await deleteService(id);
      router.refresh();
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "New":
        return <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 font-bold">New</Badge>;
      case "In Touch":
        return <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 font-bold">In Touch</Badge>;
      case "Accepted":
        return <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30 font-bold">Accepted</Badge>;
      case "Completed":
        return <Badge className="bg-teal-500/20 text-teal-300 border-teal-500/30 font-bold">Completed</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6 max-w-6xl pb-16">
      {/* HEADER & SUB-TABS NAVIGATION */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/50 pb-5">
        <div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight flex items-center gap-3 text-foreground">
            <Briefcase className="w-7 h-7 text-emerald-400" />
            Freelance & Requirements Hub
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            View client requirements submitted to database, manage proposal requests, and configure freelance options.
          </p>
        </div>

        {/* SUB-TABS BUTTONS */}
        <div className="flex items-center gap-1.5 p-1.5 bg-muted/30 border border-border/50 rounded-xl w-fit">
          <button
            onClick={() => setActiveSubTab("requirements")}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeSubTab === "requirements"
                ? "bg-emerald-500 text-black shadow-md shadow-emerald-500/20 scale-[1.02]"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
            }`}
          >
            <FileText className="w-4 h-4" />
            Requirements ({totalCount})
          </button>
          <button
            onClick={() => setActiveSubTab("services")}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeSubTab === "services"
                ? "bg-emerald-500 text-black shadow-md shadow-emerald-500/20 scale-[1.02]"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
            }`}
          >
            <Briefcase className="w-4 h-4" />
            Services ({initialServices.length})
          </button>
          <button
            onClick={() => setActiveSubTab("settings")}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeSubTab === "settings"
                ? "bg-emerald-500 text-black shadow-md shadow-emerald-500/20 scale-[1.02]"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
            }`}
          >
            <Settings className="w-4 h-4" />
            Form Settings
          </button>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          SUB-TAB 1: CLIENT REQUIREMENTS DATA
      ───────────────────────────────────────────────────────────── */}
      {activeSubTab === "requirements" && (
        <div className="space-y-6">
          {/* STATS OVERVIEW CARDS */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            <Card className="bg-card/50 backdrop-blur-md border-border/60">
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Total Submitted</p>
                  <p className="text-2xl font-black text-foreground mt-0.5">{totalCount}</p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center">
                  <FileText className="w-5 h-5" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-md border-border/60">
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">New Requests</p>
                  <p className="text-2xl font-black text-emerald-400 mt-0.5">{newCount}</p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <Sparkles className="w-5 h-5" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-md border-border/60">
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">In Discussion</p>
                  <p className="text-2xl font-black text-blue-400 mt-0.5">{inTouchCount}</p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-blue-500/15 text-blue-400 flex items-center justify-center">
                  <Clock className="w-5 h-5" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-md border-border/60">
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Accepted / Done</p>
                  <p className="text-2xl font-black text-purple-400 mt-0.5">{acceptedCount}</p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-purple-500/15 text-purple-400 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* SEARCH & FILTER CONTROLS */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-card/40 backdrop-blur-md p-3 rounded-xl border border-border/50">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by client name, email, phone, service type, or requirements..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 h-9 text-xs sm:text-sm bg-background/50 border-border/50"
              />
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
              <Filter className="w-3.5 h-3.5 text-muted-foreground mr-1 hidden sm:inline-block" />
              {["All", "New", "In Touch", "Accepted", "Completed", "Archived"].map((st) => (
                <button
                  key={st}
                  onClick={() => setStatusFilter(st)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                    statusFilter === st
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "bg-muted/30 text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          {/* REQUIREMENTS DATA TABLE */}
          <div className="rounded-xl border border-border/60 bg-card/60 backdrop-blur-md overflow-hidden shadow-lg">
            <Table>
              <TableHeader className="bg-muted/40">
                <TableRow>
                  <TableHead className="font-bold text-xs">Client Details</TableHead>
                  <TableHead className="font-bold text-xs">Service Requested</TableHead>
                  <TableHead className="font-bold text-xs">Budget Range</TableHead>
                  <TableHead className="font-bold text-xs">Timeline</TableHead>
                  <TableHead className="font-bold text-xs">Submitted Date</TableHead>
                  <TableHead className="font-bold text-xs">Status</TableHead>
                  <TableHead className="font-bold text-xs text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRequests.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-12 text-muted-foreground space-y-2">
                      <FileText className="w-8 h-8 text-muted-foreground/40 mx-auto" />
                      <p className="font-medium text-sm">No client requirement records found.</p>
                      <p className="text-xs text-muted-foreground">
                        {searchQuery || statusFilter !== "All"
                          ? "Try adjusting your search query or status filter."
                          : "Requirements submitted via the Request a Website dialog will appear here."}
                      </p>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredRequests.map((req) => (
                    <TableRow key={req._id} className="hover:bg-muted/20 transition-colors">
                      <TableCell>
                        <div className="font-semibold text-foreground text-xs sm:text-sm">{req.name}</div>
                        <div className="text-[11px] text-muted-foreground flex items-center gap-1 mt-0.5">
                          <Mail className="w-3 h-3 text-muted-foreground" /> {req.email}
                        </div>
                        {req.phone && (
                          <div className="text-[11px] text-emerald-400/90 flex items-center gap-1 font-mono">
                            <Phone className="w-3 h-3" /> {req.phone}
                          </div>
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="border-emerald-500/30 text-emerald-300 bg-emerald-500/10 text-xs font-semibold">
                          {req.serviceType}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-xs font-bold text-emerald-400 font-mono">
                        {req.budget}
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground">
                        {req.timeline}
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground whitespace-nowrap">
                        {new Date(req.createdAt).toLocaleDateString(undefined, {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </TableCell>
                      <TableCell>{getStatusBadge(req.status)}</TableCell>
                      <TableCell className="text-right space-x-1 whitespace-nowrap">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-primary hover:text-primary hover:bg-primary/10"
                          onClick={() => setSelectedRequest(req)}
                          title="View Requirements Detail"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        {req.phone && (
                          <a
                            href={`https://wa.me/${req.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(`Hi ${req.name}, regarding your ${req.serviceType} requirement submitted on my portfolio website...`)}`}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-block"
                          >
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10" title="Chat on WhatsApp">
                              <Phone className="w-4 h-4" />
                            </Button>
                          </a>
                        )}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                          onClick={() => handleDeleteRequest(req._id)}
                          disabled={isDeletingReq === req._id}
                          title="Delete Requirement Record"
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
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          SUB-TAB 2: FREELANCE SERVICES
      ───────────────────────────────────────────────────────────── */}
      {activeSubTab === "services" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-foreground">Freelance Service Offerings</h3>
              <p className="text-xs text-muted-foreground">Manage the services displayed on your portfolio website.</p>
            </div>
            <Button
              onClick={() => {
                setEditingService(null);
                setServiceFormData({ title: "", description: "", icon: "" });
                setIsServiceDialogOpen(true);
              }}
              className="bg-emerald-500 hover:bg-emerald-400 text-black font-bold gap-2 text-xs"
            >
              <Plus className="w-4 h-4" /> Add New Service
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {initialServices.length === 0 ? (
              <Card className="col-span-2 p-8 text-center text-muted-foreground border-dashed">
                No services added yet. Click "Add New Service" to create one.
              </Card>
            ) : (
              initialServices.map((svc) => (
                <Card key={svc._id} className="bg-card/50 backdrop-blur-md border-border/60 hover:border-emerald-500/40 transition-colors">
                  <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                    <div>
                      <CardTitle className="text-base font-bold text-foreground">{svc.title}</CardTitle>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-foreground"
                        onClick={() => {
                          setEditingService(svc);
                          setServiceFormData({ title: svc.title, description: svc.description, icon: svc.icon || "" });
                          setIsServiceDialogOpen(true);
                        }}
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive hover:text-destructive"
                        onClick={() => handleDeleteServiceItem(svc._id)}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xs text-muted-foreground leading-relaxed whitespace-pre-wrap">
                      {svc.description}
                    </p>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          SUB-TAB 3: REQUIREMENT FORM SETTINGS
      ───────────────────────────────────────────────────────────── */}
      {activeSubTab === "settings" && (
        <Card className="bg-card/60 backdrop-blur-md border-border/60">
          <CardHeader>
            <CardTitle className="text-xl font-bold flex items-center gap-2">
              <Settings className="w-5 h-5 text-emerald-400" />
              Requirement Form & Modal Configuration
            </CardTitle>
            <CardDescription>
              Customize the titles, budget choices, and options shown in the visitor requirement dialog.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSaveSettings} className="space-y-6">
              {settingsMsg && (
                <div className="p-3 text-xs font-semibold rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                  {settingsMsg}
                </div>
              )}

              <div className="flex items-center justify-between p-4 border border-border/60 rounded-xl bg-muted/20">
                <div>
                  <Label className="font-bold text-foreground">Enable Requirement Dialog</Label>
                  <p className="text-xs text-muted-foreground">Allow visitors to submit project requirements via the website.</p>
                </div>
                <input
                  type="checkbox"
                  checked={requestFormConfig.enabled !== false}
                  onChange={(e) => setRequestFormConfig({ ...requestFormConfig, enabled: e.target.checked })}
                  className="w-5 h-5 accent-emerald-500 cursor-pointer"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-xs font-bold">Dialog Badge Text</Label>
                  <Input
                    value={requestFormConfig.badgeText || ""}
                    onChange={(e) => setRequestFormConfig({ ...requestFormConfig, badgeText: e.target.value })}
                    placeholder="Start Your Project"
                    className="text-xs"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs font-bold">Button Label</Label>
                  <Input
                    value={requestFormConfig.buttonText || ""}
                    onChange={(e) => setRequestFormConfig({ ...requestFormConfig, buttonText: e.target.value })}
                    placeholder="Request a Website"
                    className="text-xs"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-bold">Modal Title</Label>
                <Input
                  value={requestFormConfig.title || ""}
                  onChange={(e) => setRequestFormConfig({ ...requestFormConfig, title: e.target.value })}
                  placeholder="Request a Custom Website"
                  className="text-xs"
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-bold">Modal Description</Label>
                <Textarea
                  value={requestFormConfig.description || ""}
                  onChange={(e) => setRequestFormConfig({ ...requestFormConfig, description: e.target.value })}
                  rows={2}
                  className="text-xs"
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-bold">Budget Ranges (comma separated)</Label>
                <Input
                  value={requestFormConfig.budgetOptions?.join(", ") || ""}
                  onChange={(e) =>
                    setRequestFormConfig({
                      ...requestFormConfig,
                      budgetOptions: e.target.value.split(",").map((s) => s.trim()).filter(Boolean),
                    })
                  }
                  placeholder="₹5,000 - ₹15,000, ₹15,000 - ₹35,000, ₹35,000 - ₹75,000, ₹75,000+"
                  className="text-xs font-mono"
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-bold">Timeline Options (comma separated)</Label>
                <Input
                  value={requestFormConfig.timelineOptions?.join(", ") || ""}
                  onChange={(e) =>
                    setRequestFormConfig({
                      ...requestFormConfig,
                      timelineOptions: e.target.value.split(",").map((s) => s.trim()).filter(Boolean),
                    })
                  }
                  placeholder="Urgent (1-3 Days), 1-2 Weeks, 3-4 Weeks, Flexible"
                  className="text-xs font-mono"
                />
              </div>

              <Button
                type="submit"
                disabled={isSavingSettings}
                className="bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs px-6 gap-2"
              >
                {isSavingSettings ? "Saving..." : "Save Configuration"}
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      {/* ─────────────────────────────────────────────────────────────
          FULL REQUIREMENT DETAILS MODAL
      ───────────────────────────────────────────────────────────── */}
      {selectedRequest && (
        <Dialog open={!!selectedRequest} onOpenChange={() => setSelectedRequest(null)}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-background/95 backdrop-blur-xl border-emerald-500/30">
            <DialogHeader>
              <div className="flex items-center justify-between gap-4">
                <DialogTitle className="text-xl font-bold flex items-center gap-2">
                  <FileText className="w-5 h-5 text-emerald-400" />
                  Client Requirement Details
                </DialogTitle>
                {getStatusBadge(selectedRequest.status)}
              </div>
              <DialogDescription>
                Submitted on {new Date(selectedRequest.createdAt).toLocaleString()}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6 pt-2 text-xs sm:text-sm">
              {/* CLIENT INFO BOX */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 border border-border/60 rounded-xl bg-muted/20">
                <div>
                  <span className="text-xs font-bold text-muted-foreground block uppercase tracking-wider">Client Name</span>
                  <span className="font-bold text-foreground text-sm">{selectedRequest.name}</span>
                </div>
                <div>
                  <span className="text-xs font-bold text-muted-foreground block uppercase tracking-wider">Submission Date</span>
                  <span className="font-semibold text-foreground">
                    {new Date(selectedRequest.createdAt).toLocaleDateString(undefined, { dateStyle: "full" })}
                  </span>
                </div>
                <div>
                  <span className="text-xs font-bold text-muted-foreground block uppercase tracking-wider">Email Address</span>
                  <a href={`mailto:${selectedRequest.email}`} className="text-primary hover:underline font-semibold inline-flex items-center gap-1 mt-0.5">
                    <Mail className="w-3.5 h-3.5" /> {selectedRequest.email}
                  </a>
                </div>
                <div>
                  <span className="text-xs font-bold text-muted-foreground block uppercase tracking-wider">Phone / WhatsApp</span>
                  {selectedRequest.phone ? (
                    <a
                      href={`https://wa.me/${selectedRequest.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(`Hi ${selectedRequest.name}, regarding your ${selectedRequest.serviceType} requirement...`)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-emerald-400 hover:underline font-bold font-mono inline-flex items-center gap-1 mt-0.5"
                    >
                      <Phone className="w-3.5 h-3.5" /> {selectedRequest.phone} <ExternalLink className="w-3 h-3" />
                    </a>
                  ) : (
                    <span className="text-muted-foreground italic">Not provided</span>
                  )}
                </div>
              </div>

              {/* PROJECT SCOPE & BUDGET */}
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="p-3 border border-border/60 rounded-xl bg-card">
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">Service Type</span>
                  <span className="font-bold text-foreground text-xs mt-0.5 block">{selectedRequest.serviceType}</span>
                </div>
                <div className="p-3 border border-border/60 rounded-xl bg-card">
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">Budget Range</span>
                  <span className="font-bold text-emerald-400 text-xs mt-0.5 block font-mono">{selectedRequest.budget}</span>
                </div>
                <div className="p-3 border border-border/60 rounded-xl bg-card">
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">Timeline</span>
                  <span className="font-bold text-foreground text-xs mt-0.5 block">{selectedRequest.timeline}</span>
                </div>
              </div>

              {/* DETAILED PROJECT REQUIREMENTS TEXT */}
              <div className="space-y-2">
                <span className="font-bold text-foreground flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground">
                  <MessageSquare className="w-4 h-4 text-emerald-400" /> Full Requirements & Description
                </span>
                <div className="p-4 border border-emerald-500/20 rounded-xl bg-card/80 text-foreground whitespace-pre-wrap leading-relaxed font-sans shadow-inner">
                  {selectedRequest.description}
                </div>
              </div>

              {/* STATUS CHANGE BAR */}
              <div className="space-y-2 pt-3 border-t border-border/50">
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider block">Update Status in Database:</span>
                <div className="flex flex-wrap gap-2">
                  {["New", "In Touch", "Accepted", "Completed", "Archived"].map((st) => (
                    <Button
                      key={st}
                      variant={selectedRequest.status === st ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleStatusChange(selectedRequest._id, st)}
                      className={`text-xs font-bold ${
                        selectedRequest.status === st ? "bg-emerald-500 text-black hover:bg-emerald-400" : ""
                      }`}
                    >
                      {st}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* SERVICE ADD/EDIT MODAL */}
      {isServiceDialogOpen && (
        <Dialog open={isServiceDialogOpen} onOpenChange={setIsServiceDialogOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>{editingService ? "Edit Service" : "Add New Service"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleServiceSubmit} className="space-y-4 pt-2">
              <div className="space-y-1.5">
                <Label className="text-xs font-bold">Service Title</Label>
                <Input
                  required
                  value={serviceFormData.title}
                  onChange={(e) => setServiceFormData({ ...serviceFormData, title: e.target.value })}
                  placeholder="e.g. Custom Web Development"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-bold">Description</Label>
                <Textarea
                  required
                  rows={4}
                  value={serviceFormData.description}
                  onChange={(e) => setServiceFormData({ ...serviceFormData, description: e.target.value })}
                  placeholder="Service description and scope..."
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <Button type="button" variant="outline" onClick={() => setIsServiceDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isSavingService} className="bg-emerald-500 text-black font-bold">
                  {isSavingService ? "Saving..." : editingService ? "Update Service" : "Create Service"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
