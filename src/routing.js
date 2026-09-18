import { defineRouting } from "next-intl/routing";

export const locales = ["en", "de"];
export const defaultLocale = "de";

// Internal path -> external path per locale
export const pathnames = {
  "/dashboard/about": {
    en: "/dashboard/about",
    de: "/dashboard/uber-uns",
  },
};

export const routing = defineRouting({
  locales,
  defaultLocale,
  pathnames,
});
