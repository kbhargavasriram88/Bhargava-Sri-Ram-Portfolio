"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ShieldCheck, FileText, CheckCircle2, Lock } from "lucide-react";

interface TermsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function TermsModal({ open, onOpenChange }: TermsModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto bg-card border-border shadow-2xl p-6 sm:p-8">
        <DialogHeader className="space-y-2 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-semibold w-fit">
            <FileText className="w-3.5 h-3.5" /> Client Engagement Policy
          </div>
          <DialogTitle className="text-2xl font-bold tracking-tight text-foreground">
            Terms of Service &amp; Project Guidelines
          </DialogTitle>
          <DialogDescription className="text-muted-foreground text-sm">
            Please review the standard project engagement terms for Bhargava Sri Ram freelance development services.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 text-sm text-foreground/90 my-4 divide-y divide-border/60">
          <div className="space-y-2 pt-2">
            <h4 className="font-semibold text-base flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="w-4 h-4" /> 1. Project Inception &amp; Mutual Non-Binding Inquiry
            </h4>
            <p className="text-muted-foreground leading-relaxed">
              Submission of this Website Request Form initiates a preliminary discovery dialogue and requirements assessment. It does not constitute a binding financial obligation or service contract until a formal Statement of Work (SOW) or proposal is mutually accepted.
            </p>
          </div>

          <div className="space-y-2 pt-4">
            <h4 className="font-semibold text-base flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
              <Lock className="w-4 h-4" /> 2. Confidentiality &amp; Non-Disclosure (NDA)
            </h4>
            <p className="text-muted-foreground leading-relaxed">
              All client project concepts, proprietary workflows, trade secrets, design mockups, and client contacts shared via this form are held under strict commercial confidentiality and will never be shared, sold, or distributed to third parties.
            </p>
          </div>

          <div className="space-y-2 pt-4">
            <h4 className="font-semibold text-base flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
              <ShieldCheck className="w-4 h-4" /> 3. Milestones, Scope Revisions &amp; Intellectual Property
            </h4>
            <p className="text-muted-foreground leading-relaxed">
              Upon engagement, project milestones, payment schedules, and deliverable reviews will be documented in writing. Final code ownership, repositories, production assets, and licenses transfer in full to the client upon final milestone clearance.
            </p>
          </div>

          <div className="space-y-2 pt-4">
            <h4 className="font-semibold text-base flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="w-4 h-4" /> 4. Response &amp; Communication Window
            </h4>
            <p className="text-muted-foreground leading-relaxed">
              After submitting your requirements, you will receive a response within 24 hours via email or WhatsApp to schedule a brief discovery call or review a tailored proposal.
            </p>
          </div>
        </div>

        <DialogFooter className="sm:justify-end gap-2 pt-2 border-t border-border/60">
          <Button
            type="button"
            className="rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-6"
            onClick={() => onOpenChange(false)}
          >
            I Understand &amp; Agree
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
