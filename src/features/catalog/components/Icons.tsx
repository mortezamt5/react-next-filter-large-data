import type { ReactNode, SVGProps } from "react";

type IconName = "grid" | "package" | "chart" | "settings" | "search" | "sliders" | "refresh" | "chevron" | "spark" | "arrow";

const paths: Record<IconName, ReactNode> = {
  grid: <><rect x="3.5" y="3.5" width="7" height="7" rx="1.5" /><rect x="13.5" y="3.5" width="7" height="7" rx="1.5" /><rect x="3.5" y="13.5" width="7" height="7" rx="1.5" /><rect x="13.5" y="13.5" width="7" height="7" rx="1.5" /></>,
  package: <><path d="m12 3 8.5 4.5v9L12 21l-8.5-4.5v-9L12 3Z" /><path d="m3.8 7.7 8.2 4.5 8.2-4.5M12 12.2V21M7.7 5.2l8.6 4.6" /></>,
  chart: <><path d="M4 19V5M4 19h16" /><path d="m7 15 3.3-4 3 2 4.7-6" /></>,
  settings: <><circle cx="12" cy="12" r="3" /><path d="m19.4 15 .1.1 1 1.7-1.8 3-2-.5a7.7 7.7 0 0 1-1.7 1l-.6 1.7h-3.6l-.6-1.8a7.7 7.7 0 0 1-1.7-1l-2 .6-1.8-3 1.1-1.7a7.2 7.2 0 0 1 0-2l-1.1-1.7 1.8-3 2 .6a7.7 7.7 0 0 1 1.7-1l.6-1.8h3.6l.6 1.8a7.7 7.7 0 0 1 1.7 1l2-.6 1.8 3-1.1 1.7a7.2 7.2 0 0 1 0 2Z" transform="translate(-1 -1) scale(1.08)" /></>,
  search: <><circle cx="10.8" cy="10.8" r="6.8" /><path d="m16 16 4.5 4.5" /></>,
  sliders: <><path d="M4 7h9M17 7h3M4 17h3M11 17h9" /><circle cx="15" cy="7" r="2" /><circle cx="9" cy="17" r="2" /></>,
  refresh: <><path d="M20 7v5h-5" /><path d="M19 12a7 7 0 1 0 1.1 4" /></>,
  chevron: <path d="m8 10 4 4 4-4" />,
  spark: <><path d="m12 3 1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3Z" /><path d="m19 16 .9 2.1L22 19l-2.1.9L19 22l-.9-2.1L16 19l2.1-.9L19 16Z" /></>,
  arrow: <><path d="M7 17 17 7" /><path d="M8 7h9v9" /></>,
};

export function Icon({
  name,
  ...props
}: SVGProps<SVGSVGElement> & { name: IconName }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {paths[name]}
    </svg>
  );
}
