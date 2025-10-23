export interface CriminalProfile {
  _id: string;
  actor_id: string;
  name: string;
  aliases: string[];
  threat_level: string;
  origin: {
    country?: string;
    region?: string;
    city?: string;
  };
  active_period: {
    start?: string;
    end?: string;
    status?: string;
  };
  categories: string[];
  profile: {
    perpetrators?: Array<{
      name?: string;
      born?: number;
      died?: number;
      iq?: number;
      role?: string;
      psychology?: string;
      sentence?: string;
    }>;
    victim_count?: number;
    victim_demographics?: string;
    modus_operandi?: {
      vehicle?: string;
      location?: string;
      method?: string;
      tools?: string[];
      evidence?: string;
    };
    capture?: {
      date?: string;
      method?: string;
      key_evidence?: string;
    };
  };
  criminological_significance?: string[];
  threat_intelligence_lessons?: string[];
  research_purpose?: string;
  tags?: string[];
  created_by?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  count?: number;
  error?: string;
}

export interface Statistics {
  total: number;
  by_threat_level: Record<string, number>;
  by_category: Record<string, number>;
}
