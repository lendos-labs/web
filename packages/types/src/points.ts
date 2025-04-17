export interface IPointsUser {
  balance: {
    borrowing_balance: number | '< 1';
    deposit_balance: number;
    health_factor: number;
    health_factor_update_at: string;
    total_balance: number;
    user_id: number;
  };
  borrowing_points: number | '< 1';
  deposit_points: number;
  discord_name: string;
  discord_points: number | '< 1';
  id: number;
  is_discord_rewarded: boolean;
  is_neon_discord_subscribed: boolean;
  is_neon_twitter_subscribed: boolean;
  is_rewarded_points: boolean;
  is_twitter_rewarded: boolean;
  name: string;
  november_borrow_points: number;
  picture: string;
  points_boost: number;
  rank: number;
  referral_points: number | '< 1';
  total_points: number | '< 1';
  twitter_id: number;
  user_id: number;
  wallet: string;
}

export interface IPointsUserCodes {
  created_at: string;
  is_activate: boolean;
  referral_code: string;
}

export interface IPointsUserSquad {
  data: [];
  goals: {
    balance: number;
  };
  total_borrowing: number;
  total_deposited: number;
  total_users_count: number;
}

export interface ILeaderboard {
  borrowing_points: number;
  deposit_points: number;
  rank: number;
  referral_points: number;
  total_points: number;
  user_id: number;
  wallet: string;
}

export interface ILeaderboardRes {
  data: ILeaderboard[];
}
