import { CriminalProfile, ApiResponse, Statistics } from '@/types/criminal-profile';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export const criminalProfilesApi = {
  /**
   * Get all criminal profiles
   */
  async getAll(limit = 50, skip = 0): Promise<CriminalProfile[]> {
    const response = await fetch(
      `${API_BASE_URL}/api/criminal-profiles?limit=${limit}&skip=${skip}`
    );
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
    const response = await fetch(
      `${API_BASE_URL}/api/criminal-profiles/search?q=${encodeURIComponent(query)}`
    );
    const data: ApiResponse<CriminalProfile[]> = await response.json();

    if (!data.success || !data.data) {
      throw new Error(data.error || 'Search failed');
    }

    return data.data;
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
    const response = await fetch(`${API_BASE_URL}/api/criminal-profiles/statistics`);
    const data: ApiResponse<Statistics> = await response.json();

    if (!data.success || !data.data) {
      throw new Error(data.error || 'Failed to fetch statistics');
    }

    return data.data;
  },
};
