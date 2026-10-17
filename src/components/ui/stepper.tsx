import React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Step {
  id: number;
  label: string;
}

interface StepperProps {
  steps: Step[];
  currentStep: number;
  className?: string;
}

export function Stepper({ steps, currentStep, className }: StepperProps) {
  return (
    <div className={cn("w-full py-4 mb-6 border-b border-line", className)}>
      <nav aria-label="Progress">
        <ol className="flex items-center justify-between">
          {steps.map((step, index) => {
            const isCompleted = step.id < currentStep;
            const isCurrent = step.id === currentStep;

            return (
              <li key={step.id} className="relative flex-1 flex flex-col items-center">
                {/* Connecting Line (before and after) */}
                {index !== 0 && (
                  <div
                    className={cn(
                      "absolute top-3.5 right-1/2 w-full h-[2px] -z-0",
                      step.id <= currentStep ? "bg-green-700" : "bg-line"
                    )}
                  />
                )}

                {/* Circle Indicator */}
                <div
                  className={cn(
                    "relative z-10 w-7 h-7 rounded-full flex items-center justify-center text-xs font-sans font-semibold transition-colors",
                    isCompleted && "bg-green-700 text-white",
                    isCurrent && "border-2 border-green-700 bg-white text-green-700",
                    !isCompleted && !isCurrent && "border border-line bg-ivory-50 text-ink-400"
                  )}
                >
                  {isCompleted ? <Check className="w-3.5 h-3.5 stroke-[2.5]" /> : step.id}
                </div>

                {/* Label */}
                <span
                  className={cn(
                    "mt-2 text-[11px] font-sans text-center transition-colors font-medium",
                    isCurrent ? "text-green-700 font-semibold" : "text-ink-500",
                    isCompleted && "text-ink-900"
                  )}
                >
                  {step.label}
                </span>
              </li>
            );
          })}
        </ol>
      </nav>
    </div>
  );
}
