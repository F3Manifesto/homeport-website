export const dynamic = "force-dynamic";

import { NextRequest } from "next/server";
import { INFURA_GATEWAY } from "@/app/lib/constants";

export async function GET(
  request: NextRequest,
  context: { params: { cid: string } }
) {
  const { cid } = context.params;

  if (!cid || !cid.match(/^Qm[1-9A-HJ-NP-Za-km-z]{44}$/)) {
    return new Response("CID inválido", { status: 400 });
  }

  try {
    const response = await fetch(`${INFURA_GATEWAY}/ipfs/${cid}`);

    if (!response.ok) {
      return new Response("Arquivo não encontrado", { status: 404 });
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
    console.error("Erro no proxy IPFS:", err);
    return new Response("Erro interno", { status: 500 });
  }
}
