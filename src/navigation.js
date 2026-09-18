import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

export { locales, defaultLocale, pathnames } from "./routing";

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
