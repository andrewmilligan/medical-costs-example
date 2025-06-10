import { useEffect, useState } from "react";
import useTreatmentData from "@/hooks/useTreatmentData";

export default function useDataSelection(opts: {
  treatment: string;
  geography: string;
}) {
  const [selections, setSelections] = useState<{ insurance: string, source: string }>();

  const {
    isPending,
    data: treatmentData,
  } = useTreatmentData({
    treatment: opts.treatment,
    geography: opts.geography,
  });

  useEffect(() => {
    if (!treatmentData) return;
    const insurance = Object.keys(treatmentData.costs)[0];
    const source = Object.keys(treatmentData.costs[insurance])[0];
    setSelections({ insurance, source });
  }, [treatmentData]);

  if (!treatmentData || !selections) {
    return {
      isPending,
      treatmentData,
      data: undefined,
      insurance: {
        options: [],
      },
      source: {
        options: [],
      },
    };
  }

  const insuranceOptions = Object.keys(treatmentData.costs);
  const sourceOptions = Object.keys(treatmentData.costs[selections.insurance]);

  const data = treatmentData.costs[selections.insurance][selections.source];

  return {
    isPending,
    treatmentData,
    data,
    insurance: {
      value: selections.insurance,
      options: insuranceOptions,
      onChange: (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelections({
          insurance: e.target.value,
          source: Object.keys(
            treatmentData.costs[e.target.value],
          )[0],
        });
      },
    },
    source: {
      value: selections.source,
      options: sourceOptions,
      onChange: (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelections((old) => ({
          insurance: old?.insurance || insuranceOptions[0],
          source: e.target.value,
        }));
      },
    },
  };
}
