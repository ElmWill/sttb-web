import type { NextApiRequest, NextApiResponse } from "next";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:5117";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { mediaId } = req.query;
  if (!mediaId || Array.isArray(mediaId)) {
    return res.status(400).json({ error: "Invalid mediaId" });
  }

  try {
    const headers: Record<string, string> = {};
    if (req.headers["authorization"]) {
      headers["Authorization"] = req.headers["authorization"] as string;
    }

    const response = await fetch(`${BACKEND_URL}/api/Media/${mediaId}/file`, { headers });

    if (!response.ok) {
      return res.status(response.status).json({ error: "File not found" });
    }

    // Forward the content type from backend so browsers can display images
    const contentType = response.headers.get("content-type") || "application/octet-stream";
    const cacheControl = response.headers.get("cache-control") || "public, max-age=86400";

    res.setHeader("Content-Type", contentType);
    res.setHeader("Cache-Control", cacheControl);

    // Use arrayBuffer to correctly handle binary data
    const buffer = await response.arrayBuffer();
    res.status(200).send(Buffer.from(buffer));
  } catch (error) {
    console.error("Media file proxy error:", error);
    res.status(500).json({ error: "Failed to serve file" });
  }
}
