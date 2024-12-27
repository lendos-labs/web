export interface Vote {
  category: string;
  description: string;
  details: string;
  link: string;
  link_text: string;
  icon: string;
  proposal_id: number;
  protocol_name: string;
  network: string;
  status: 'active' | 'completed';
  votes_count: number;
  is_voting: boolean;
}
