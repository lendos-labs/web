import { useQuery } from '@tanstack/react-query';

import { queryKeysFactory } from '../queries';
import { pointServices } from '../services/points.services';
import { API } from '../utils/api';

export const useGetUsers = () => {
  return useQuery({
    queryKey: [queryKeysFactory.points, API.USER_INFO],
    queryFn: () => pointServices.getUsers(),
    select: ({ data }) => data,
  });
};

export const useGetCodes = () => {
  return useQuery({
    queryKey: [queryKeysFactory.points, API.USER_CODES],
    queryFn: () => pointServices.getCodes(),
    select: ({ data }) => data,
  });
};

export const useGetSquad = () => {
  return useQuery({
    queryKey: [queryKeysFactory.points, API.USER_SQUAD],
    queryFn: () => pointServices.getSquad(),
    select: ({ data }) => data,
  });
};

export const useGetLeaderboard = () => {
  return useQuery({
    queryKey: [queryKeysFactory.points, API.USER_LEADERBOARD],
    queryFn: () => pointServices.getLeaderboard(),
    select: ({ data }) => data.data,
  });
};
