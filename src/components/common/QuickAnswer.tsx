import React from "react";
import { HelpCircle } from "lucide-react";

interface QuickAnswerProps {
  question: string;
  answer: string;
  badge?: string;
  className?: string;
}

export function QuickAnswer({
  question,
  answer,
  badge = "Quick Answer",
  className = "",
}: QuickAnswerProps) {
  return (
    <div
      className={`rounded-xl border border-[#22344C] border-l-[3px] border-l-[#5B7CFF] bg-[#0D1A2B] p-5 sm:p-6 text-[#F5F8FC] shadow-card ${className}`}
    >
      <div className="flex items-center gap-2 mb-2 text-[#5B7CFF]">
        <HelpCircle size={16} className="shrink-0" />
        <span className="text-xs font-bold uppercase tracking-wider text-[#9FB0FF]">{badge}</span>
      </div>
      <h3 className="text-base font-bold text-[#F5F8FC] mb-2">{question}</h3>
      <p className="text-sm leading-relaxed text-[#C7D3E3]">{answer}</p>
    </div>
  );
}
