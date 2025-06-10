import type { CostDetail, CostData } from "@/types";
import { useQuery } from "@tanstack/react-query";

export default function useTreatmentData(opts: {
  treatment: string;
  geography: string;
}) {
  return useQuery<CostData<CostDetail>>({
    queryKey: ['treatment', opts.treatment, opts.geography],
    queryFn: async () => {
      const q = new URLSearchParams({
        treatment: opts.treatment,
        geography: opts.geography,
      });
      const rsp = await fetch(`/api/treatment-cost?${q}`);
      return rsp.json();
    },
  });
}
