export type YearData = {
  year: number;
  percent25: number;
  percent50: number;
  percent75: number;
};

export type CostDetail = {
  current: YearData;
  years: YearData[];
};

export type CostData<T> = {
  id: string;
  geography: string;
  label?: {
    id: string;
    label: string;
    label_detailed: string;
    slug: string;
  };
  costs: Record<
    string, // insurance
    Record<
      string, // source
      T
    >
  >;
};

