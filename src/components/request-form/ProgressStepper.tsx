"use client";

import React from "react";
import { Check } from "lucide-react";

export interface StepItem {
  number: string;
  stepIndex: number;
  title: string;
  subtitle: string;
}

export const FORM_STEPS: StepItem[] = [
  { number: "01", stepIndex: 1, title: "Client Info", subtitle: "Contact Details" },
  { number: "02", stepIndex: 2, title: "Business & Specs", subtitle: "Project Scope" },
  { number: "03", stepIndex: 3, title: "Features & Scope", subtitle: "Design & Tech" },
  { number: "04", stepIndex: 4, title: "Timeline & Budget", subtitle: "Domain & Terms" },
  { number: "05", stepIndex: 5, title: "Authorization", subtitle: "Sign & Submit" },
];

interface ProgressStepperProps {
  currentStep: number;
  completedSteps: number[];
  onStepClick: (step: number) => void;
}

export function ProgressStepper({
  currentStep,
  completedSteps,
  onStepClick,
}: ProgressStepperProps) {
  // Compute overall percentage
  const percentage = Math.round((currentStep / FORM_STEPS.length) * 100);

  return (
    <div className="w-full bg-card/60 backdrop-blur-xl border border-border/80 rounded-3xl p-4 sm:p-6 shadow-sm mb-8">
      {/* Top Header with Percentage */}
      <div className="flex items-center justify-between mb-4 sm:mb-6 px-1">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Progress Tracking
          </span>
        </div>
        <div className="flex items-center gap-1.5 font-mono text-xs">
          <span className="text-muted-foreground">Step {currentStep} of {FORM_STEPS.length}</span>
          <span className="text-border">•</span>
          <span className="font-bold text-emerald-600 dark:text-emerald-400">{percentage}%</span>
        </div>
      </div>

      {/* Progress Bar Line */}
      <div className="w-full h-1.5 bg-muted/60 dark:bg-muted/30 rounded-full overflow-hidden mb-6">
        <div
          className="h-full bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-400 transition-all duration-500 ease-out rounded-full shadow-[0_0_12px_rgba(16,185,129,0.4)]"
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={percentage}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>

      {/* Stepper Nodes */}
      <div className="grid grid-cols-5 gap-1 sm:gap-2 relative">
        {FORM_STEPS.map((step) => {
          const isActive = currentStep === step.stepIndex;
          const isCompleted = completedSteps.includes(step.stepIndex);
          const isClickable = isCompleted || step.stepIndex <= currentStep;

          return (
            <button
              key={step.number}
              type="button"
              disabled={!isClickable}
              onClick={() => isClickable && onStepClick(step.stepIndex)}
              className={`flex flex-col items-center text-center group transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-xl p-1 sm:p-2 ${
                isClickable ? "cursor-pointer" : "cursor-not-allowed opacity-60"
              }`}
              aria-current={isActive ? "step" : undefined}
            >
              {/* Badge Icon */}
              <div
                className={`w-9 h-9 sm:w-11 sm:h-11 rounded-2xl flex items-center justify-center font-bold text-xs sm:text-sm transition-all duration-300 ${
                  isActive
                    ? "bg-emerald-600 text-white shadow-lg shadow-emerald-500/30 scale-105 ring-4 ring-emerald-500/20"
                    : isCompleted
                    ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 group-hover:bg-emerald-500/25"
                    : "bg-muted/60 text-muted-foreground border border-border"
                }`}
              >
                {isCompleted ? (
                  <Check className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
                ) : (
                  step.number
                )}
              </div>

              {/* Title & Subtitle */}
              <div className="mt-2 hidden md:flex flex-col items-center">
                <span
                  className={`text-xs font-semibold leading-tight transition-colors ${
                    isActive
                      ? "text-emerald-600 dark:text-emerald-400"
                      : isCompleted
                      ? "text-foreground"
                      : "text-muted-foreground"
                  }`}
                >
                  {step.title}
                </span>
                <span className="text-[10px] text-muted-foreground font-normal leading-tight mt-0.5">
                  {step.subtitle}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
