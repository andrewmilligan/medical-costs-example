import { useQuery } from "@tanstack/react-query";

export default function useGeographies() {
  return useQuery<{ geographies: string[] }>({
    queryKey: ['geographies'],
    queryFn: async () => {
      const rsp = await fetch(`/api/geographies`);
      return rsp.json();
    },
  });
}
