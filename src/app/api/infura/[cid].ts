import { NextApiRequest, NextApiResponse } from "next";
import { INFURA_GATEWAY } from "@/app/lib/constants";
import { Readable } from "stream";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { cid } = req.query;

  if (typeof cid !== "string" || !cid.startsWith("Qm")) {
    res.status(400).send("Invalid CID");
    return;
  }

  try {
    const response = await fetch(`${INFURA_GATEWAY}/ipfs/${cid}`);

    if (!response.ok) {
      res.status(404).send("File not found");
      return;
    }

    res.setHeader("Content-Type", response.headers.get("content-type") || "application/octet-stream");
    res.setHeader("Cache-Control", "public, max-age=31536000, immutable");

    const body = response.body;

    if (!body) {
      res.status(500).send("No body returned");
      return;
    }

    const reader = body.getReader();
    const stream = new Readable({
      async read() {
        const { done, value } = await reader.read();
        if (done) {
          this.push(null);
        } else {
          this.push(value);
        }
      },
    });

    stream.pipe(res);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
}
