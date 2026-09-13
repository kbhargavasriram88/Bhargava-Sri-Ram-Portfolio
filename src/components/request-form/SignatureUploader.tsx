"use client";

import React, { useState, useRef } from "react";
import { UploadCloud, CheckCircle2, Trash2, RefreshCw, PenTool, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SignatureUploaderProps {
  clientName: string;
  signatureValue: string;
  onSignatureChange: (val: string) => void;
}

export function SignatureUploader({
  clientName,
  signatureValue,
  onSignatureChange,
}: SignatureUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string>("");

  const isDigitalFallback =
    signatureValue.startsWith("Digitally Authorized") ||
    (!signatureValue.startsWith("data:image/") && signatureValue.length > 0);

  const isImageSignature =
    signatureValue.startsWith("data:image/") ||
    signatureValue.startsWith("http://") ||
    signatureValue.startsWith("https://");

  const handleFileProcess = (file: File) => {
    setErrorMsg("");
    if (!file) return;

    // Validate mime type
    const validTypes = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
    if (!validTypes.includes(file.type)) {
      setErrorMsg("Please upload a valid image file (PNG, JPG, or WebP).");
      return;
    }

    // Validate size (max 3MB)
    if (file.size > 3 * 1024 * 1024) {
      setErrorMsg("File size exceeds 3MB. Please upload a smaller image.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const base64 = e.target?.result as string;
      setFileName(file.name);
      onSignatureChange(base64);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileProcess(e.dataTransfer.files[0]);
    }
  };

  const handleApplyDigitalSignature = () => {
    const today = new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
    const fallbackText = `Digitally Authorized by ${clientName.trim() || "Client"} on ${today}`;
    setFileName("");
    setErrorMsg("");
    onSignatureChange(fallbackText);
  };

  const handleClearSignature = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setFileName("");
    setErrorMsg("");
    onSignatureChange("");
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label htmlFor="sigFileInput" className="text-sm font-medium text-foreground flex items-center gap-2">
          <PenTool className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          Client Signature <span className="text-xs text-muted-foreground font-normal">(Upload Image or Apply Digital Timestamp)</span>
        </label>
        {signatureValue && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleClearSignature}
            className="text-xs text-destructive hover:bg-destructive/10 h-7 px-2"
          >
            <Trash2 className="w-3.5 h-3.5 mr-1" /> Remove
          </Button>
        )}
      </div>

      <input
        ref={fileInputRef}
        id="sigFileInput"
        name="client_signature_file"
        type="file"
        accept="image/png, image/jpeg, image/webp"
        className="sr-only"
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            handleFileProcess(e.target.files[0]);
          }
        }}
      />

      {/* Image Preview State */}
      {isImageSignature ? (
        <div className="relative rounded-2xl border-2 border-dashed border-emerald-500/50 bg-emerald-500/5 dark:bg-emerald-950/20 p-5 flex flex-col items-center justify-center gap-3">
          <div className="bg-white dark:bg-black/40 rounded-xl p-3 shadow-sm border border-border flex items-center justify-center max-w-[280px] max-h-[120px] overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={signatureValue}
              alt="Client Signature Preview"
              className="max-h-[100px] object-contain"
            />
          </div>
          <div className="flex items-center gap-2 text-xs font-medium text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 className="w-4 h-4" />
            <span>{fileName || "Signature file attached"}</span>
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
            className="rounded-full text-xs h-8 border-emerald-500/30 hover:bg-emerald-500/10"
          >
            <RefreshCw className="w-3.5 h-3.5 mr-1.5" /> Replace Signature
          </Button>
        </div>
      ) : isDigitalFallback ? (
        /* Digital Timestamp State */
        <div className="rounded-2xl border border-emerald-500/40 bg-emerald-500/10 dark:bg-emerald-950/30 p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400 flex-shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-semibold text-emerald-700 dark:text-emerald-300 uppercase tracking-wider">
                Digital Authorization Active
              </div>
              <div className="text-sm font-medium text-foreground">
                {signatureValue}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
              className="rounded-full text-xs h-8"
            >
              <UploadCloud className="w-3.5 h-3.5 mr-1.5" /> Upload File Instead
            </Button>
          </div>
        </div>
      ) : (
        /* Empty Upload Zone */
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`cursor-pointer rounded-2xl border-2 border-dashed transition-all p-6 flex flex-col items-center justify-center text-center gap-2.5 ${
            isDragging
              ? "border-emerald-500 bg-emerald-500/10 scale-[0.99]"
              : "border-border/80 hover:border-emerald-500/50 bg-background/50 hover:bg-emerald-500/5"
          }`}
        >
          <div className="w-11 h-11 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shadow-sm">
            <UploadCloud className="w-5 h-5" />
          </div>
          <div>
            <span className="text-sm font-medium text-foreground">
              Click to upload signature
            </span>{" "}
            <span className="text-sm text-muted-foreground">or drag and drop</span>
            <p className="text-xs text-muted-foreground mt-0.5">
              PNG, JPG or WebP (Max 3MB)
            </p>
          </div>
          <div className="pt-2 flex items-center gap-3">
            <span className="text-xs text-muted-foreground">— or —</span>
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                handleApplyDigitalSignature();
              }}
              className="rounded-full text-xs h-7 px-3 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20"
            >
              <PenTool className="w-3 h-3 mr-1" /> Apply Digital Timestamp
            </Button>
          </div>
        </div>
      )}

      {errorMsg && (
        <p className="text-xs font-medium text-destructive mt-1">{errorMsg}</p>
      )}
    </div>
  );
}
