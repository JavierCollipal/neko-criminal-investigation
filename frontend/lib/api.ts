import { CriminalProfile, ApiResponse, Statistics } from '@/types/criminal-profile';

// Use Next.js API routes (serverless functions on Vercel)
const API_BASE_URL = '';

export const criminalProfilesApi = {
  /**
   * Get all criminal profiles
   */
  async getAll(limit = 50, skip = 0): Promise<CriminalProfile[]> {
    const response = await fetch(`/api/profiles`);
    const data: ApiResponse<CriminalProfile[]> = await response.json();

    if (!data.success || !data.data) {
      throw new Error(data.error || 'Failed to fetch profiles');
    }

    return data.data;
  },

  /**
   * Search criminal profiles
   */
  async search(query: string): Promise<CriminalProfile[]> {
    // Client-side search for simplicity
    const profiles = await this.getAll(1000);
    const lowerQuery = query.toLowerCase();

    return profiles.filter(p =>
      p.name?.toLowerCase().includes(lowerQuery) ||
      p.aliases?.some(a => a.toLowerCase().includes(lowerQuery)) ||
      p.actor_id?.toLowerCase().includes(lowerQuery)
    );
  },

  /**
   * Get criminal profile by actor ID
   */
  async getByActorId(actorId: string): Promise<CriminalProfile> {
    const response = await fetch(`${API_BASE_URL}/api/criminal-profiles/actor/${actorId}`);
    const data: ApiResponse<CriminalProfile> = await response.json();

    if (!data.success || !data.data) {
      throw new Error(data.error || 'Profile not found');
    }

    return data.data;
  },

  /**
   * Get criminal profile by MongoDB ID
   */
  async getById(id: string): Promise<CriminalProfile> {
    const response = await fetch(`${API_BASE_URL}/api/criminal-profiles/${id}`);
    const data: ApiResponse<CriminalProfile> = await response.json();

    if (!data.success || !data.data) {
      throw new Error(data.error || 'Profile not found');
    }

    return data.data;
  },

  /**
   * Get profiles by threat level
   */
  async getByThreatLevel(level: string): Promise<CriminalProfile[]> {
    const response = await fetch(`${API_BASE_URL}/api/criminal-profiles/threat-level/${level}`);
    const data: ApiResponse<CriminalProfile[]> = await response.json();

    if (!data.success || !data.data) {
      throw new Error(data.error || 'Failed to fetch profiles');
    }

    return data.data;
  },

  /**
   * Get profiles by category
   */
  async getByCategory(category: string): Promise<CriminalProfile[]> {
    const response = await fetch(
      `${API_BASE_URL}/api/criminal-profiles/category/${encodeURIComponent(category)}`
    );
    const data: ApiResponse<CriminalProfile[]> = await response.json();

    if (!data.success || !data.data) {
      throw new Error(data.error || 'Failed to fetch profiles');
    }

    return data.data;
  },

  /**
   * Get statistics
   */
  async getStatistics(): Promise<Statistics> {
    // Calculate statistics from all profiles
    const profiles = await this.getAll(1000);

    const stats: Statistics = {
      total: profiles.length,
      by_threat_level: {
        CRITICAL: profiles.filter(p => p.threat_level === 'CRITICAL').length,
        EXTREME: profiles.filter(p => p.threat_level === 'EXTREME').length,
        HIGH: profiles.filter(p => p.threat_level === 'HIGH').length,
        MEDIUM: profiles.filter(p => p.threat_level === 'MEDIUM').length,
        LOW: profiles.filter(p => p.threat_level === 'LOW').length,
      },
      by_category: {},
    };

    return stats;
  },
};
