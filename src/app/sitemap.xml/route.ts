import { NextResponse } from "next/server";
import { getAllCollections } from "../../../graphql/queries/getCollections";
import { INFURA_GATEWAY_INTERNAL } from "../lib/constants";

const locales = ["en", "es", "ar", "ym", "pt"];

function toSlug(value: string) {
  return encodeURIComponent(value.replace(/\s+/g, "-"));
}

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

function resolveMediaUrl(media?: string) {
  if (!media) return "";
  if (media.startsWith("ipfs://")) {
    return `${INFURA_GATEWAY_INTERNAL}${media.split("ipfs://")[1]}`;
  }
  return media;
}

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://f3manifesto.xyz";
  const gallery = await getAllCollections(1000, 0);

  const collections = gallery?.data?.collectionCreateds || [];

  const collectionsXml = collections
    .map((coll: any) => {
      const rawTitle = coll?.metadata?.title ?? "";
      if (!rawTitle) return "";
      const safeSlug = toSlug(rawTitle);
      const title = escapeXml(rawTitle.replace(/-/g, " "));
      const imageUrls = (coll?.metadata?.images || [])
        .map((item: string) => resolveMediaUrl(item))
        .filter(Boolean);
      const videoUrls = [
        resolveMediaUrl(coll?.metadata?.video),
        resolveMediaUrl(coll?.metadata?.animation_url),
      ].filter(Boolean);
      const thumbnailUrl = imageUrls[0];

      const videoXml =
        thumbnailUrl && videoUrls.length
          ? videoUrls
              .map(
                (videoUrl) => `
        <video:video>
          <video:thumbnail_loc>${thumbnailUrl}</video:thumbnail_loc>
          <video:title><![CDATA[${title} | F3Manifesto | Emma-Jane MacKinnon-Lee]]></video:title>
          <video:description><![CDATA[${title} by Emma-Jane MacKinnon-Lee | F3Manifesto Web3 Fashion]]></video:description>
          <video:content_loc>${videoUrl}</video:content_loc>
          <video:player_loc allow_embed="yes">${baseUrl}/collect/${safeSlug}/</video:player_loc>
          <video:family_friendly>yes</video:family_friendly>
        </video:video>`
              )
              .join("")
          : "";

      const imagesXml = imageUrls.length
        ? imageUrls
            .map(
              (imageUrl: string) => `
        <image:image>
          <image:loc>${imageUrl}</image:loc>
          <image:title><![CDATA[${title} | F3Manifesto | Emma-Jane MacKinnon-Lee]]></image:title>
          <image:caption><![CDATA[${title} | F3Manifesto | Emma-Jane MacKinnon-Lee]]></image:caption>
        </image:image>`
            )
            .join("")
        : "";

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
        ${imagesXml}
        ${videoXml}
      </url>
    `;
    })
    .filter(Boolean)
    .join("");

  const body = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset 
      xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" 
      xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
      xmlns:video="http://www.google.com/schemas/sitemap-video/"
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
      </url>


           <url>
        <loc>${baseUrl}/orders/</loc>
        ${locales
          .map(
            (locale) => `
          <xhtml:link rel="alternate" hreflang="${locale}" href="${baseUrl}/${locale}/orders/" />
          `
          )
          .join("")}
        <xhtml:link rel="alternate" hreflang="x-default" href="${baseUrl}/orders/" />
      </url>
    
      ${collectionsXml}
    </urlset>`;

  return new NextResponse(body, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
