import { Vote } from '@lendos/types/governance';

import { API, apiAuth } from '../utils/api';

export const governanceServices = {
  getVoting: async ({ networkQuery }: { networkQuery: string }) =>
    await apiAuth.get<{ data: Vote[] }>(`${API.VOTING}${networkQuery}`),

  createEmployee: async (protocolName: number) =>
    await apiAuth.post(`${API.VOTING}?proposal_id=${protocolName}`),
};
