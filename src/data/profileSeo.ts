import { profile } from "./profile";
import type { SeoFields } from "../types/content";

export const profileSeo: SeoFields = {
  title: `${profile.company} | ${profile.role}`,
  description: profile.summary,
  canonical: "/",
  ogType: "website",
};
