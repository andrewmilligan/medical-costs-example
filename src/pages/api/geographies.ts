import type { NextApiRequest, NextApiResponse } from "next";
import costs from "@/data/cost.json";

const geos = [...new Set(costs.map((cost) => cost.geo_level))];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ geographies: string[] }>,
) {
  return res.status(200).json({
    geographies: geos,
  });
}
