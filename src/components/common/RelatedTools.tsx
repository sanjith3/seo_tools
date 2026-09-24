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

export function RelatedTools({ tools }: { tools: ToolDefinition[] }) {
  if (!tools || tools.length === 0) return null;

  return (
    <section className="mt-16 border-t border-[#22344C] pt-12">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[.18em] text-[#5B7CFF]">Related Utilities</p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-[#F5F8FC]">
            Continue your workflow
          </h2>
        </div>
        <Link
          href="/tools/"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#5B7CFF] hover:text-[#7893FF] transition-colors"
        >
          View all tools <ArrowRight size={15} />
        </Link>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool) => {
          const Icon = iconMap[tool.iconName] || FileText;
          return (
            <Link
              key={tool.slug}
              href={`/${tool.slug}/`}
              className="group relative flex flex-col justify-between rounded-2xl border border-[#22344C] bg-[#0D1A2B] p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-[#3A5272] hover:shadow-card-hover"
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span
                    className="grid h-10 w-10 place-items-center rounded-xl border border-[rgba(91,124,255,0.20)] bg-[rgba(91,124,255,0.10)] text-[#7893FF]"
                  >
                    <Icon size={18} />
                  </span>
                  <span
                    className="rounded-full px-2.5 py-0.5 text-xs font-semibold bg-[#111F32] border border-[#22344C] text-[#B5C1D1]"
                  >
                    {tool.category}
                  </span>
                </div>
                <h3 className="mt-4 text-base font-bold text-[#F5F8FC] group-hover:text-[#5B7CFF] transition-colors">
                  {tool.name}
                </h3>
                <p className="mt-2 text-xs leading-5 text-[#B5C1D1] line-clamp-2">
                  {tool.description}
                </p>
              </div>

              <div className="mt-5 flex items-center gap-1 text-xs font-semibold text-[#B5C1D1] group-hover:text-[#5B7CFF]">
                <span>Open tool</span>
                <ArrowRight
                  size={13}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
