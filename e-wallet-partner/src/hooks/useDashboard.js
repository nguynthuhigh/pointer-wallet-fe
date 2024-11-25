import { useQuery } from "react-query";
import partnerAPI from "../api/partner.api";

export const useDashboard = () => {
  const { isLoading, data, error, isError } = useQuery({
    queryFn: async () => {
      const response = await partnerAPI.getProfilePartner();
      return response.data.data;
    },
    queryKey: ["dashboard"],
    refetchOnWindowFocus: false,
    staleTime: 20000,
  });

  return { isLoading, data, error, isError };
};
