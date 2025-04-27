import { NextResponse } from "next/server";
import { getAllCollections } from "../../../graphql/queries/getCollections";
import { INFURA_GATEWAY } from "../lib/constants";


const locales = ["en", "es"];

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://emancipa.xyz";
  const gallery = await getAllCollections(1000, 0);
  
  const collections = gallery?.data?.collectionCreateds || [];

  const collectionsXml = collections.map((coll: any) => {
    const slug = encodeURIComponent(coll?.collectionMetadata?.title?.replace(/\s+/g, "-").toLowerCase());

    return locales.map((locale) => `
      <url>
        <loc>${baseUrl}/${locale}/collect/${slug}</loc>
        ${locales.map(
          altLocale => `
          <xhtml:link rel="alternate" hreflang="${altLocale}" href="${baseUrl}/${altLocale}/collect/${slug}" />
          `
        ).join("")}
        <xhtml:link rel="alternate" hreflang="x-default" href="${baseUrl}/en/collect/${slug}" />
        <image:image>
        <image:loc>${INFURA_GATEWAY}/ipfs/${coll?.collectionMetadata?.images?.[0]?.split("ipfs://")?.[1]}</image:loc>
        <image:title><![CDATA[${coll?.collectionMetadata?.title} | F3Manifesto | Emma-Jane MacKinnon-Lee]]></image:title>
        <image:caption><![CDATA[${coll?.collectionMetadata?.title} | F3Manifesto | Emma-Jane MacKinnon-Lee]]></image:caption>
      </image:image>
      </url>
    `).join("");
  }).join("");

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset 
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" 
  xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
>
${locales.map(locale => `
    <url>
      <loc>${baseUrl}/${locale}</loc>
      ${locales.map(
        altLocale => `
        <xhtml:link rel="alternate" hreflang="${altLocale}" href="${baseUrl}/${altLocale}" />
        `
      ).join("")}
      <xhtml:link rel="alternate" hreflang="x-default" href="${baseUrl}/en" />
    </url>
  `).join("")}
  
  ${locales.map(locale => `
    <url>
      <loc>${baseUrl}/${locale}/orders</loc>
      ${locales.map(
        altLocale => `
        <xhtml:link rel="alternate" hreflang="${altLocale}" href="${baseUrl}/${altLocale}/orders" />
        `
      ).join("")}
      <xhtml:link rel="alternate" hreflang="x-default" href="${baseUrl}/en/orders" />
    </url>
  `).join("")}

  ${collectionsXml}
</urlset>`;

  return new NextResponse(body, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
