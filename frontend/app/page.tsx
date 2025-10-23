'use client';

import { useState, useEffect } from 'react';
import { CriminalProfile, Statistics } from '@/types/criminal-profile';
import { criminalProfilesApi } from '@/lib/api';

export default function Home() {
  const [profiles, setProfiles] = useState<CriminalProfile[]>([]);
  const [allProfiles, setAllProfiles] = useState<CriminalProfile[]>([]);
  const [statistics, setStatistics] = useState<Statistics | null>(null);
  const [selectedProfile, setSelectedProfile] = useState<CriminalProfile | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [threatLevelFilter, setThreatLevelFilter] = useState<string>('ALL');
  const [sortBy, setSortBy] = useState<string>('name');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load initial data
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [profilesData, statsData] = await Promise.all([
        criminalProfilesApi.getAll(100),
        criminalProfilesApi.getStatistics(),
      ]);

      setAllProfiles(profilesData);
      setProfiles(profilesData);
      setStatistics(statsData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  // Apply filters and sorting
  useEffect(() => {
    let filtered = [...allProfiles];

    // Filter by threat level
    if (threatLevelFilter !== 'ALL') {
      filtered = filtered.filter(
        (p) => p.threat_level?.toUpperCase() === threatLevelFilter
      );
    }

    // Sort profiles
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return (a.name || '').localeCompare(b.name || '');
        case 'threat-desc':
          const threatOrder = { CRITICAL: 0, EXTREME: 1, HIGH: 2, MEDIUM: 3, LOW: 4 };
          return (
            (threatOrder[a.threat_level?.toUpperCase() as keyof typeof threatOrder] ?? 99) -
            (threatOrder[b.threat_level?.toUpperCase() as keyof typeof threatOrder] ?? 99)
          );
        case 'date':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        default:
          return 0;
      }
    });

    setProfiles(filtered);
  }, [allProfiles, threatLevelFilter, sortBy]);

  // Export functionality
  const handleExport = () => {
    const dataStr = JSON.stringify(profiles, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `criminal-profiles-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      loadData();
      return;
    }

    try {
      setLoading(true);
      const results = await criminalProfilesApi.search(searchQuery);
      setProfiles(results);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Search failed');
    } finally {
      setLoading(false);
    }
  };

  const getThreatLevelColor = (level: string) => {
    switch (level?.toUpperCase()) {
      case 'CRITICAL':
      case 'EXTREME':
        return 'bg-red-100 text-red-800 border-red-300';
      case 'HIGH':
        return 'bg-orange-100 text-orange-800 border-orange-300';
      case 'MEDIUM':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  if (loading && !profiles.length) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading criminal profiles...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 border-b border-red-500 p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-red-500 mb-2">
            🔒 Private Criminal Investigation System
          </h1>
          <p className="text-gray-400">
            Secure Database Access - Authorized Personnel Only
          </p>
        </div>
      </header>

      {/* Statistics Dashboard */}
      {statistics && (
        <div className="bg-gray-800 border-b border-gray-700 p-6">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-700 p-4 rounded-lg border border-gray-600">
              <h3 className="text-sm text-gray-400 mb-1">Total Profiles</h3>
              <p className="text-3xl font-bold text-white">{statistics.total}</p>
            </div>
            <div className="bg-gray-700 p-4 rounded-lg border border-gray-600">
              <h3 className="text-sm text-gray-400 mb-1">Critical Threats</h3>
              <p className="text-3xl font-bold text-red-500">
                {(statistics.by_threat_level.CRITICAL || 0) +
                  (statistics.by_threat_level.EXTREME || 0)}
              </p>
            </div>
            <div className="bg-gray-700 p-4 rounded-lg border border-gray-600">
              <h3 className="text-sm text-gray-400 mb-1">Active Cases</h3>
              <p className="text-3xl font-bold text-orange-500">
                {profiles.filter((p) => p.active_period?.status === 'ACTIVE').length}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto p-6">
        {/* Search and Controls */}
        <div className="mb-6 space-y-4">
          {/* Search Bar */}
          <div className="flex gap-2">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="Search by name or alias..."
              className="flex-1 px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-red-500"
            />
            <button
              onClick={handleSearch}
              className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-semibold transition"
            >
              Search
            </button>
            <button
              onClick={loadData}
              className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg font-semibold transition"
            >
              Clear
            </button>
          </div>

          {/* Filters and Controls */}
          <div className="flex flex-wrap gap-4 items-center justify-between">
            {/* Threat Level Filters */}
            <div className="flex gap-2 items-center">
              <span className="text-sm text-gray-400">Threat Level:</span>
              {['ALL', 'CRITICAL', 'HIGH', 'MEDIUM', 'LOW'].map((level) => (
                <button
                  key={level}
                  onClick={() => setThreatLevelFilter(level)}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
                    threatLevelFilter === level
                      ? 'bg-red-600 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>

            {/* Sort and Export */}
            <div className="flex gap-3 items-center">
              <span className="text-sm text-gray-400">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:border-red-500"
              >
                <option value="name">Name (A-Z)</option>
                <option value="threat-desc">Threat Level (High → Low)</option>
                <option value="date">Date Added (Recent)</option>
              </select>

              <button
                onClick={handleExport}
                className="px-6 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-sm font-semibold transition flex items-center gap-2"
              >
                📥 Export ({profiles.length})
              </button>
            </div>
          </div>

          {/* Results Count */}
          <div className="text-sm text-gray-400">
            Showing <span className="text-white font-semibold">{profiles.length}</span> of{' '}
            <span className="text-white font-semibold">{allProfiles.length}</span> profiles
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-900 border border-red-700 rounded-lg text-red-200">
            {error}
          </div>
        )}

        {/* Profiles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {profiles.map((profile) => (
            <div
              key={profile._id}
              onClick={() => setSelectedProfile(profile)}
              className="bg-gray-800 border border-gray-700 rounded-lg p-5 cursor-pointer hover:border-red-500 transition"
            >
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-xl font-bold text-white">{profile.name}</h3>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold border ${getThreatLevelColor(
                    profile.threat_level
                  )}`}
                >
                  {profile.threat_level}
                </span>
              </div>

              {profile.aliases?.length > 0 && (
                <p className="text-sm text-gray-400 mb-2">
                  Aliases: {profile.aliases.slice(0, 2).join(', ')}
                </p>
              )}

              {profile.origin?.country && (
                <p className="text-sm text-gray-400 mb-2">
                  Origin: {profile.origin.country}
                </p>
              )}

              <div className="flex flex-wrap gap-1 mt-3">
                {profile.categories?.slice(0, 3).map((cat, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 bg-gray-700 text-gray-300 rounded text-xs"
                  >
                    {cat}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {profiles.length === 0 && !loading && (
          <div className="text-center py-12 text-gray-500">
            No profiles found. Try a different search query.
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {selectedProfile && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedProfile(null)}
        >
          <div
            className="bg-gray-800 border border-red-500 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-3xl font-bold text-red-500">
                {selectedProfile.name}
              </h2>
              <button
                onClick={() => setSelectedProfile(null)}
                className="text-gray-400 hover:text-white text-2xl font-bold"
              >
                ×
              </button>
            </div>

            <div className="space-y-6">
              {/* Basic Info */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  Basic Information
                </h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-400">Actor ID:</span>
                    <span className="ml-2 text-white">{selectedProfile.actor_id}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Threat Level:</span>
                    <span
                      className={`ml-2 px-2 py-1 rounded ${getThreatLevelColor(
                        selectedProfile.threat_level
                      )}`}
                    >
                      {selectedProfile.threat_level}
                    </span>
                  </div>
                </div>
              </div>

              {/* Perpetrators */}
              {selectedProfile.profile?.perpetrators && (
                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">
                    Perpetrator Profiles
                  </h3>
                  {selectedProfile.profile.perpetrators.map((perp, idx) => (
                    <div
                      key={idx}
                      className="bg-gray-700 border border-gray-600 rounded-lg p-4 mb-3"
                    >
                      <h4 className="font-semibold text-white mb-2">{perp.name}</h4>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        {perp.born && (
                          <div>
                            <span className="text-gray-400">Born:</span>
                            <span className="ml-2 text-white">{perp.born}</span>
                          </div>
                        )}
                        {perp.died && (
                          <div>
                            <span className="text-gray-400">Died:</span>
                            <span className="ml-2 text-white">{perp.died}</span>
                          </div>
                        )}
                        {perp.iq && (
                          <div>
                            <span className="text-gray-400">IQ:</span>
                            <span className="ml-2 text-white">{perp.iq}</span>
                          </div>
                        )}
                        {perp.role && (
                          <div>
                            <span className="text-gray-400">Role:</span>
                            <span className="ml-2 text-white">{perp.role}</span>
                          </div>
                        )}
                      </div>
                      {perp.psychology && (
                        <div className="mt-2">
                          <span className="text-gray-400">Psychology:</span>
                          <p className="text-white mt-1">{perp.psychology}</p>
                        </div>
                      )}
                      {perp.sentence && (
                        <div className="mt-2">
                          <span className="text-gray-400">Sentence:</span>
                          <p className="text-white mt-1">{perp.sentence}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Threat Intelligence */}
              {selectedProfile.threat_intelligence_lessons && (
                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">
                    Threat Intelligence Lessons
                  </h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
                    {selectedProfile.threat_intelligence_lessons.map((lesson, idx) => (
                      <li key={idx}>{lesson}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Categories */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-3">Categories</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedProfile.categories?.map((cat, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm"
                    >
                      {cat}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
