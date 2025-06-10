import type { NextApiRequest, NextApiResponse } from "next";
import get from "lodash/get";
import set from "lodash/set";
import labels from "@/data/labels.json";
import costs from "@/data/cost.json";
import type { CostDetail, CostData, YearData } from "@/types";

const labelsById = new Map(labels.map((label) => [
  label.id,
  label,
]));

const costsData = new Map<string, CostData<CostDetail>>();
costs.forEach((cost) => {
  const {
    id,
    geo_level: geography,
    insurance_type: insurance,
    source,
    year,
    percent25,
    percent50,
    percent75,
  } = cost;

  const label = labelsById.get(id);
  const key = `${label?.slug}--${geography}`;
  const treatmentData = costsData.get(key) || {
    id,
    geography,
    costs: {},
  };

  const yearPrices = {
    year,
    percent25,
    percent50,
    percent75,
  };
  const data = get(treatmentData.costs, [insurance, source], {
    current: yearPrices,
    years: [] as YearData[],
  });

  data.years.push(yearPrices);
  if (data.current.year < year) {
    data.current = yearPrices;
  }

  set(treatmentData.costs, [insurance, source], data);
  costsData.set(key, treatmentData);
});

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<CostData<CostDetail> | { message: string }>,
) {
  const url = new URL(`http://localhost${req.url}`);

  const treatmentSlug = url.searchParams.get("treatment");
  const geographyId = url.searchParams.get("geography");
  const key = `${treatmentSlug}--${geographyId}`;

  const cost = costsData.get(key);

  if (!cost) {
    return res.status(404).json({
      message: "Treatment/geography combination not found",
    });
  }

  const label = labelsById.get(cost.id);

  return res.status(200).json({
    id: cost.id,
    geography: cost.geography,
    label,
    costs: cost.costs,
  });
}
