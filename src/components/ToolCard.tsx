import Link from "next/link";
import {
  ArrowRight,
  HelpCircle,
  Type,
  FileText,
  Sparkles,
  Compass,
  Code2,
  Bot,
  Globe,
  ShieldAlert,
  Eye,
  Share2,
  Link2,
  BarChart3,
  FileCode,
  Network
} from "lucide-react";
import { ToolDefinition } from "@/config/tools";

const iconMap = {
  HelpCircle,
  Type,
  FileText,
  Sparkles,
  Compass,
  Code2,
  Bot,
  Globe,
  ShieldAlert,
  Eye,
  Share2,
  Link2,
  BarChart3,
  FileCode,
  Network
};

export function ToolCard({ tool }: { tool: ToolDefinition }) {
  const Icon = iconMap[tool.iconName] || FileText;

  return (
    <Link
      href={`/${tool.slug}/`}
      className="group relative flex flex-col justify-between rounded-[16px] border border-[#22344C] bg-[#0D1A2B] p-[24px] shadow-card transition-all duration-150 hover:-translate-y-[2px] hover:border-[#3A5272] hover:shadow-card-hover"
    >
      <div>
        <div className="flex items-center justify-between gap-2">
          <span
            className="grid h-10 w-10 place-items-center rounded-lg border border-[rgba(91,124,255,0.20)] bg-[rgba(91,124,255,0.10)] text-[#7893FF]"
          >
            <Icon size={18} />
          </span>
          <span
            className="rounded-full px-2.5 py-0.5 text-[11px] font-semibold bg-[#111F32] border border-[#22344C] text-[#B5C1D1]"
          >
            {tool.category}
          </span>
        </div>

        <h3 className="mt-4 text-[16px] font-bold text-[#F5F8FC] group-hover:text-[#5B7CFF] transition-colors">
          {tool.name}
        </h3>
        <p className="mt-2 text-[13.5px] leading-relaxed text-[#B5C1D1] line-clamp-2">
          {tool.description}
        </p>
      </div>

      <div className="mt-5 flex items-center gap-1.5 border-t border-[#22344C]/60 pt-4 text-xs font-semibold text-[#5B7CFF] group-hover:text-[#7893FF]">
        <span>Open Tool</span>
        <ArrowRight size={13} className="transition-transform duration-150 group-hover:translate-x-1" />
      </div>
    </Link>
  );
}
