import type { NextApiRequest, NextApiResponse } from "next";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:5117";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { slug = [] } = req.query;

  // Build backend path
  const path = (slug as string[]).join("/");

  const url = `${BACKEND_URL}/${path}`;

  console.log("Proxy →", url);

  try {
    const response = await fetch(url, {
      method: req.method,
      headers: {
        "Content-Type": "application/json",
      },
      body:
        req.method === "GET" || req.method === "HEAD"
          ? undefined
          : JSON.stringify(req.body),
    });

    const data = await response.text();

    res.status(response.status).send(data);

  } catch (error) {
    console.error("Gateway proxy error:", error);
    res.status(500).json({ error: "Gateway proxy failed" });
  }
}