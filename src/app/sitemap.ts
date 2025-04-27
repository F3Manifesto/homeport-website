import { MetadataRoute } from "next";
import { LOCALES } from "./lib/constants";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return LOCALES.map((lang) => ({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/${lang}`,
  }));
}
