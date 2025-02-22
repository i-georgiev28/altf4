import { useQuery } from '@tanstack/react-query';

export interface NominatimResult {
  boundingbox: Array<string>;
  category?: string;
  display_name: string;
  importance: number;
  lat: string;
  licence: string;
  lon: string;
  osm_id: number;
  osm_type: string;
  place_id: string;
  place_rank: number;
  type: string;
}

function useNominatim(
    query: string,
    countryCodes: string[],
  ): [boolean, boolean, Partial<NominatimResult[]> | undefined, () => Promise<NominatimResult[] | undefined>] {
    const { isLoading, isFetching, isError, data, refetch } = useQuery({
      queryKey: ['OpenStreetMapNominatim', query],
      queryFn: () => {
        if (!query) {
          return [];
        }
  
        const url = `https://nominatim.openstreetmap.org/search?format=jsonv2&q=${query}&countrycodes=${countryCodes.join(
          ',',
        )}`;
        return fetch(url)
          .then((x) => x.json())
          .then((x) => x as NominatimResult[]);
      },
      enabled: true,
      refetchOnWindowFocus: false,
    });
  
    const fetchFn = () => refetch().then((x) => x.data);
  
    return [isLoading || isFetching, isError, data, fetchFn];
  }
  
  export default useNominatim;