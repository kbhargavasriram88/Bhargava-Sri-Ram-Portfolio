"use client";

import React from "react";
import { User, Mail, Phone, MessageSquare, MapPin, Building, ShieldCheck } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface StepClientInfoProps {
  formData: any;
  onChange: (field: string, value: any) => void;
  errors: Record<string, string>;
}

export function StepClientInfo({ formData, onChange, errors }: StepClientInfoProps) {
  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex items-center gap-3 pb-4 border-b border-border/70">
        <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-sm shadow-sm">
          01
        </div>
        <div>
          <h3 className="text-xl font-bold tracking-tight text-foreground">
            Client Information
          </h3>
          <p className="text-xs text-muted-foreground">
            Provide your primary contact details so I can reach out to discuss your project.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Full Name / Organization Name */}
        <div className="space-y-2">
          <Label htmlFor="client_name" className="text-sm font-medium text-foreground flex items-center gap-1.5">
            <Building className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            Full Name / Organization Name <span className="text-destructive">*</span>
          </Label>
          <Input
            id="client_name"
            name="client_name"
            type="text"
            placeholder="Enter your name or organization name"
            value={formData.client_name || ""}
            onChange={(e) => onChange("client_name", e.target.value)}
            className={`rounded-xl border-border bg-card transition-all ${
              errors.client_name ? "border-destructive focus-visible:ring-destructive" : "focus-visible:ring-emerald-500"
            }`}
            autoFocus
          />
          {errors.client_name && (
            <p className="text-xs font-medium text-destructive">{errors.client_name}</p>
          )}
        </div>

        {/* Contact Person */}
        <div className="space-y-2">
          <Label htmlFor="contact_person" className="text-sm font-medium text-foreground flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            Contact Person <span className="text-destructive">*</span>
          </Label>
          <Input
            id="contact_person"
            name="contact_person"
            type="text"
            placeholder="Enter contact person name"
            value={formData.contact_person || ""}
            onChange={(e) => onChange("contact_person", e.target.value)}
            className={`rounded-xl border-border bg-card transition-all ${
              errors.contact_person ? "border-destructive focus-visible:ring-destructive" : "focus-visible:ring-emerald-500"
            }`}
          />
          {errors.contact_person && (
            <p className="text-xs font-medium text-destructive">{errors.contact_person}</p>
          )}
        </div>

        {/* Email Address */}
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium text-foreground flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            Email Address <span className="text-destructive">*</span>
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email address"
            value={formData.email || ""}
            onChange={(e) => onChange("email", e.target.value)}
            className={`rounded-xl border-border bg-card transition-all ${
              errors.email ? "border-destructive focus-visible:ring-destructive" : "focus-visible:ring-emerald-500"
            }`}
          />
          {errors.email && (
            <p className="text-xs font-medium text-destructive">{errors.email}</p>
          )}
        </div>

        {/* Phone Number */}
        <div className="space-y-2">
          <Label htmlFor="phone" className="text-sm font-medium text-foreground flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            Phone Number <span className="text-destructive">*</span>
          </Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            placeholder="Enter your phone number (e.g., +91 8332924488)"
            value={formData.phone || ""}
            onChange={(e) => onChange("phone", e.target.value)}
            className={`rounded-xl border-border bg-card transition-all ${
              errors.phone ? "border-destructive focus-visible:ring-destructive" : "focus-visible:ring-emerald-500"
            }`}
          />
          {errors.phone && (
            <p className="text-xs font-medium text-destructive">{errors.phone}</p>
          )}
        </div>

        {/* WhatsApp Number (Optional) */}
        <div className="space-y-2">
          <Label htmlFor="whatsapp" className="text-sm font-medium text-foreground flex items-center gap-1.5">
            <MessageSquare className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            WhatsApp Number <span className="text-xs text-muted-foreground font-normal">(Optional)</span>
          </Label>
          <Input
            id="whatsapp"
            name="whatsapp"
            type="tel"
            placeholder="Enter WhatsApp number (e.g., +91 8332924488)"
            value={formData.whatsapp || ""}
            onChange={(e) => onChange("whatsapp", e.target.value)}
            className="rounded-xl border-border bg-card focus-visible:ring-emerald-500"
          />
        </div>

        {/* Address (Optional) */}
        <div className="space-y-2">
          <Label htmlFor="address" className="text-sm font-medium text-foreground flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            Location / City / Address <span className="text-xs text-muted-foreground font-normal">(Optional)</span>
          </Label>
          <Input
            id="address"
            name="address"
            type="text"
            placeholder="Enter your city or business location"
            value={formData.address || ""}
            onChange={(e) => onChange("address", e.target.value)}
            className="rounded-xl border-border bg-card focus-visible:ring-emerald-500"
          />
        </div>
      </div>
    </div>
  );
}
