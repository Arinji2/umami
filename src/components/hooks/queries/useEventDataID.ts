import { UseQueryOptions } from '@tanstack/react-query';
import { useApi } from '../useApi';
import { useFilterParams } from '../useFilterParams';

export function useEventDataID(
  websiteId: string,
  id: string,
  options?: Omit<UseQueryOptions, 'queryKey' | 'queryFn'>,
) {
  const { get, useQuery } = useApi();
  const params = useFilterParams(websiteId);
  return useQuery({
    queryKey: ['websites:event-data:id', { websiteId, id, ...params }],
    queryFn: () => get(`/websites/${websiteId}/event-data/id`, { id, ...params }),
    enabled: !!websiteId,
    ...options,
  });
}

export default useEventDataID;
