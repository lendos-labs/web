import {
  ILeaderboardRes,
  IPointsUser,
  IPointsUserCodes,
  IPointsUserSquad,
} from '@lendos/types/points';

import { API, apiAuth } from '../utils/api';

export const pointServices = {
  getUsers: async () => await apiAuth.get<IPointsUser>(API.USER_INFO),
  getCodes: async () => await apiAuth.get<IPointsUserCodes>(API.USER_CODES),
  getSquad: async () => await apiAuth.get<IPointsUserSquad>(API.USER_SQUAD),
  getLeaderboard: async () => await apiAuth.get<ILeaderboardRes>(API.USER_LEADERBOARD),
};
