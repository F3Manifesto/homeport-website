import { NextResponse } from "next/server";
// import FormData from 'form-data';

const projectId = process.env.INFURA_PROJECT_ID;
const projectSecret = process.env.INFURA_SECRET_KEY;

const auth =
  "Basic " + Buffer.from(projectId + ":" + projectSecret).toString("base64");

export async function POST(req: Request) {
  try {
    const contentType = req.headers.get("content-type") || "";
    let body;

    if (contentType.includes("application/json")) {
      const blob = new Blob([JSON.stringify(await req.json())], {
        type: "application/json",
      });

      body = new FormData();
      body.append("file", blob, "file.json");
    } else {
      body = new FormData();
      body.append("file", await req.blob(), "file.png");
    }
    const response = await fetch("https://ipfs.infura.io:5001/api/v0/add", {
      method: "POST",
      headers: {
        authorization: auth,
      },
      body,
    });
    if (!response.ok) {
      const errorText = await response.text();
      console.error("Error from IPFS:", errorText);
      throw new Error("Failed to upload to IPFS");
    }
    const data = await response.json();
    const cid = data?.Hash;

    const res = NextResponse.json({ cid });
    return res;
  } catch (err: any) {
    console.error(err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
