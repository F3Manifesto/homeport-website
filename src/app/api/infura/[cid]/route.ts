export const dynamic = "force-dynamic";

import { INFURA_GATEWAY } from "@/app/lib/constants";
import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ cid: string }> } | { params: { cid: string } }
) {
  const params = await context.params;
  const cid = params.cid;

  if (!cid || !cid.match(/^Qm[1-9A-HJ-NP-Za-km-z]{44}$/)) {
    return new Response("CID inválido", { status: 400 });
  }

  try {
    const response = await fetch(`${INFURA_GATEWAY}/ipfs/${cid}`);

    if (!response.ok) {
      return new Response("Archivo no encontrado", { status: 404 });
    }

    const contentType =
      response.headers.get("content-type") || "application/octet-stream";

    return new Response(response.body, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (err) {
    console.error("Error en el proxy IPFS:", err);
    return new Response("Error interno", { status: 500 });
  }
}
