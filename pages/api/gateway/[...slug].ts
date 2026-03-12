import type { NextApiRequest, NextApiResponse } from "next";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:5117";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { slug = [], ...restQuery } = req.query;

  // Build backend path from slug segments
  const path = (slug as string[]).join("/");

  // Forward all remaining query string params (e.g. pageNumber, searchTerm, etc.)
  const backendParams = new URLSearchParams();
  Object.entries(restQuery).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((v) => backendParams.append(key, v));
    } else if (value !== undefined) {
      backendParams.append(key, value as string);
    }
  });
  const qs = backendParams.toString();
  const url = `${BACKEND_URL}/${path}${qs ? `?${qs}` : ""}`;

  console.log("Proxy →", url);

  try {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };
    // Forward Authorization header so protected write endpoints work
    if (req.headers["authorization"]) {
      headers["Authorization"] = req.headers["authorization"] as string;
    }

    const response = await fetch(url, {
      method: req.method,
      headers,
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