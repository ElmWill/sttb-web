import type { NextApiRequest, NextApiResponse } from "next";

// Disable Next.js body parsing so we can forward the raw multipart stream
export const config = {
  api: {
    bodyParser: false,
  },
};

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:5117";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Buffer the raw multipart body
  const chunks: Buffer[] = [];
  for await (const chunk of req) {
    chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
  }
  const body = Buffer.concat(chunks);

  try {
    const headers: Record<string, string> = {
      // Forward content-type as-is (includes the multipart boundary)
      "Content-Type": req.headers["content-type"] ?? "",
    };
    if (req.headers["authorization"]) {
      headers["Authorization"] = req.headers["authorization"] as string;
    }

    const response = await fetch(`${BACKEND_URL}/api/Media/upload`, {
      method: "POST",
      headers,
      body,
    });

    const data = await response.text();
    res.status(response.status).send(data);
  } catch (error) {
    console.error("Media upload proxy error:", error);
    res.status(500).json({ error: "Upload proxy failed" });
  }
}
