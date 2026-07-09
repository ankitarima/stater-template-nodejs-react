import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getBorderClass = (index: number) => {
  switch (index) {
    case 5:
      return "border-l-primary";
    case 2:
      return "border-l-destructive";
    case 4:
      return "border-l-[#EB9707]";
    default:
      return "border-l-white";
  }
};
