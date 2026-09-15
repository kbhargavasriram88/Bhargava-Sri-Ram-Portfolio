"use client";

import React, { useState, useTransition } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Award, Eye, EyeOff, Loader2, Sparkles, CheckCircle2 } from "lucide-react";
import { toggleCertificatesVisibility } from "@/actions/settings";
import { useRouter } from "next/navigation";

interface CertificatesVisibilityToggleProps {
  initialEnabled?: boolean;
}

export function CertificatesVisibilityToggle({ initialEnabled = true }: CertificatesVisibilityToggleProps) {
  const router = useRouter();
  const [enabled, setEnabled] = useState<boolean>(initialEnabled);
  const [isPending, startTransition] = useTransition();
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleToggle = (checked: boolean) => {
    setEnabled(checked);
    startTransition(async () => {
      const res = await toggleCertificatesVisibility(checked);
      if (res.success) {
        setToastMessage(checked ? "Certifications section is now visible on the website!" : "Certifications section is now hidden from the website.");
        router.refresh();
        setTimeout(() => setToastMessage(null), 3500);
      } else {
        // Revert on error
        setEnabled(!checked);
        setToastMessage("Failed to update status. Please try again.");
        setTimeout(() => setToastMessage(null), 3500);
      }
    });
  };

  return (
    <Card className="border-emerald-500/30 bg-card/60 backdrop-blur-xl shadow-lg shadow-emerald-500/5 transition-all">
      <CardContent className="p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          {/* Left: Icon & Description */}
          <div className="flex items-start gap-4">
            <div className={`p-3 rounded-2xl border transition-colors ${
              enabled 
                ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/30 shadow-sm shadow-emerald-500/20" 
                : "bg-muted text-muted-foreground border-border"
            }`}>
              <Award className="w-6 h-6" />
            </div>
            
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2.5">
                <h3 className="text-base sm:text-lg font-bold text-foreground flex items-center gap-2">
                  Certificates Page & Section Visibility
                </h3>
                {enabled ? (
                  <Badge className="bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border-emerald-500/30 font-bold text-xs gap-1 py-0.5">
                    <Eye className="w-3 h-3" /> Visible on Website
                  </Badge>
                ) : (
                  <Badge variant="secondary" className="bg-amber-500/20 text-amber-600 dark:text-amber-400 border-amber-500/30 font-bold text-xs gap-1 py-0.5">
                    <EyeOff className="w-3 h-3" /> Hidden from Website
                  </Badge>
                )}
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground max-w-2xl leading-relaxed">
                Toggle whether the Certifications section appears on the homepage and in the navigation bar menu.
              </p>
            </div>
          </div>

          {/* Right: Switch Control */}
          <div className="flex items-center gap-3 sm:self-center border-t sm:border-t-0 pt-3 sm:pt-0 border-border/50">
            {isPending && <Loader2 className="w-4 h-4 text-emerald-500 animate-spin" />}
            <div className="flex items-center gap-2.5">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden sm:inline">
                {enabled ? "Active" : "Disabled"}
              </span>
              <Switch
                checked={enabled}
                onCheckedChange={handleToggle}
                disabled={isPending}
                className="data-[state=checked]:bg-emerald-500"
                aria-label="Toggle certificates visibility"
              />
            </div>
          </div>
        </div>

        {/* Live Feedback alert */}
        {toastMessage && (
          <div className="mt-3.5 px-3 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-medium flex items-center gap-2 animate-in fade-in slide-in-from-top-1 duration-200">
            <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" />
            <span>{toastMessage}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
