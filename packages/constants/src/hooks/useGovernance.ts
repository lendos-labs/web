import { useMutation, useQuery } from '@tanstack/react-query';
import { governanceServices } from '../services/governance.services';
import { queryClient } from '../queryClient';
import { queryKeys } from '../queries';

export const useVoting = ({ networkQuery }: { networkQuery: string }) => {
  return useQuery({
    queryKey: [queryKeys.voting, networkQuery],
    queryFn: () => governanceServices.getVoting({ networkQuery }),
    select: ({ data }) => data.data,
  });
};

export const useCreateEmployee = () => {
  return useMutation({
    mutationKey: queryKeys.createEmployee,
    mutationFn: governanceServices.createEmployee,
    onSuccess: async () => {
      try {
        await queryClient.invalidateQueries({
          queryKey: queryKeys.voting,
        });
      } catch (error) {
        console.error('Error invalidating queries:', error);
      }
    },
  });
};
