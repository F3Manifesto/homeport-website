import { NextResponse } from "next/server";
import { getAllCollections } from "../../../graphql/queries/getCollections";
import {
  BOARD_IMAGES,
  INFURA_GATEWAY_INTERNAL,
  MARQUEE_IMAGES,
  TITLES,
} from "../lib/constants";

const locales = ["en", "es", "ar", "ym"];

const STATIC_IMAGES = [
  "QmeNFvYW5eWDBwFgCkpiU6PY18oabkBuj56iDcr1ZU9AY9",
  "QmQdKuK1f2VmEBoXr7nWr9dEjZo4B2WSRoUs65WxJ5KEzL",
  "QmcM8caaAM6Pu7bdiwM6QMkwYJa2hhqsAmJFi8zvZzEQQD",
  "QmTVMXcjyMNmkMiyUFKxx3iqqdCTMuSpnLCgUS6usLX9Bu",
  "QmcJm2mBZ1SErHEDYro3yJYyyv8aqnjVCt5s7NbqkkcYpC",
  ...MARQUEE_IMAGES,
  ...BOARD_IMAGES,
].map((marquee, i) => ({
  image: marquee,
  title: TITLES[i],
}));

function escapeXml(unsafe: string) {
  if (!unsafe) return "";
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case "&":
        return "&amp;";
      case "'":
        return "&apos;";
      case '"':
        return "&quot;";
      default:
        return c;
    }
  });
}

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://f3manifesto.xyz";
  const gallery = await getAllCollections(1000, 0);

  const collections = gallery?.data?.collectionCreateds || [];

  const collectionsXml = collections
    .map((coll: any) => {
      const rawTitle = coll?.metadata?.title ?? "";
      const safeSlug = encodeURIComponent(rawTitle.replace(/\s+/g, "-"));
      const title = escapeXml(rawTitle.replace(/-/g, " "));
      const image = coll?.metadata?.images?.[0]?.split("ipfs://")?.[1];

      return `
      <url>
        <loc>${baseUrl}/collect/${safeSlug}/</loc>
        ${locales
          .map(
            (altLocale) => `
          <xhtml:link rel="alternate" hreflang="${altLocale}" href="${baseUrl}/${altLocale}/collect/${safeSlug}/" />
          `
          )
          .join("")}
        <xhtml:link rel="alternate" hreflang="x-default" href="${baseUrl}/collect/${safeSlug}/" />
        <image:image>
          <image:loc>${INFURA_GATEWAY_INTERNAL}${image}</image:loc>
          <image:title><![CDATA[${title} | F3Manifesto | Emma-Jane MacKinnon-Lee]]></image:title>
          <image:caption><![CDATA[${title} | F3Manifesto | Emma-Jane MacKinnon-Lee]]></image:caption>
        </image:image>
      </url>
    `;
    })
    .join("");

  const homeImagesXml = STATIC_IMAGES.map((cid) => {
    const url = `${INFURA_GATEWAY_INTERNAL}${cid?.image}/`;
    return `
      <image:image>
        <image:loc>${url}</image:loc>
        <image:title><![CDATA[Emma-Jane MacKinnon-Lee visual ${cid?.title} | F3Manifesto]]></image:title>
        <image:caption><![CDATA[Emma-Jane MacKinnon-Lee ${cid?.title} | F3Manifesto]]></image:caption>
      </image:image>
    `;
  }).join("");

  const body = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset 
      xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" 
      xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
      xmlns:xhtml="http://www.w3.org/1999/xhtml"
    >
      <url>
        <loc>${baseUrl}/</loc>
        ${locales
          .map(
            (locale) => `
          <xhtml:link rel="alternate" hreflang="${locale}" href="${baseUrl}/${locale}/" />
          `
          )
          .join("")}
        <xhtml:link rel="alternate" hreflang="x-default" href="${baseUrl}/" />
        ${homeImagesXml}
      </url>
    
      ${collectionsXml}
    </urlset>`;

  return new NextResponse(body, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
