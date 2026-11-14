import { useState, useEffect, useMemo, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { GLOBAL_MARKETS_DATA } from '../data/globalMarketsData';

export interface GeoRegion {
  code: string;
  name: string;
  flag: string;
  currencySymbol: string;
  currencyCode: string;
  isInternational: boolean;
  pricing: {
    starter: string;
    growth: string;
    bespoke: string;
  };
  hourlyVsSprint: {
    localAgencyRate: string;
    localTimeline: string;
    uncodedHubRate: string;
    savings: string;
  };
}

export const DOMESTIC_INDIA_REGION: GeoRegion = {
  code: 'in',
  name: 'India (Domestic)',
  flag: '🇮🇳',
  currencySymbol: '₹',
  currencyCode: 'INR',
  isInternational: false,
  pricing: {
    starter: '₹35,000',
    growth: '₹55,000',
    bespoke: '₹85,000+',
  },
  hourlyVsSprint: {
    localAgencyRate: '₹1,50,000 – ₹5,00,000 + ₹15k/mo',
    localTimeline: '8 to 16 Weeks',
    uncodedHubRate: '₹35,000 – ₹85,000',
    savings: 'Save ₹1,00,000+ & Launch in 7 Days',
  },
};

export const ALL_GEO_REGIONS: GeoRegion[] = [
  DOMESTIC_INDIA_REGION,
  ...Object.values(GLOBAL_MARKETS_DATA).map((m) => ({
    code: m.slug,
    name: m.countryName,
    flag: m.flag,
    currencySymbol: m.currencySymbol,
    currencyCode: m.currencyCode,
    isInternational: true,
    pricing: {
      starter: m.pricing.foundational,
      growth: m.pricing.growth,
      bespoke: m.pricing.bespoke,
    },
    hourlyVsSprint: {
      localAgencyRate: m.localComparison.localAgencyRate,
      localTimeline: m.localComparison.localTimeline,
      uncodedHubRate: m.localComparison.uncodedHubRate,
      savings: m.localComparison.savings,
    },
  })),
];

export const GEO_REGIONS_MAP: Record<string, GeoRegion> = ALL_GEO_REGIONS.reduce(
  (acc, r) => ({ ...acc, [r.code.toLowerCase()]: r }),
  {}
);

/**
 * Detects visitor's region automatically:
 * 1. Check URL path for market slug (/markets/us/, /markets/uk/, etc.)
 * 2. Check localStorage if user previously selected a region
 * 3. Fallback to browser timezone (e.g. Asia/Kolkata -> India, America/* -> US, Europe/London -> UK)
 */
export function detectInitialRegion(pathname = ''): string {
  // 1. Explicit Route Check
  const cleanPath = pathname.toLowerCase();
  const marketMatch = cleanPath.match(/^\/(?:markets|global)\/([a-z]{2,3})/);
  if (marketMatch && GEO_REGIONS_MAP[marketMatch[1]]) {
    return marketMatch[1];
  }
  if (cleanPath.includes('/web-design/bangalore/')) {
    return 'in';
  }

  // 2. Client-side Stored Preference
  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem('uh_user_region');
      if (stored && GEO_REGIONS_MAP[stored.toLowerCase()]) {
        return stored.toLowerCase();
      }
    } catch {}
  }

  // 3. Browser Timezone Detection
  if (typeof Intl !== 'undefined' && Intl.DateTimeFormat) {
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
      if (tz.includes('Calcutta') || tz.includes('Kolkata')) return 'in';
      if (tz.startsWith('America/New_York') || tz.startsWith('America/Chicago') || tz.startsWith('America/Los_Angeles') || tz.startsWith('America/Denver') || tz.startsWith('US/')) return 'us';
      if (tz.includes('London')) return 'uk';
      if (tz.includes('Toronto') || tz.includes('Vancouver') || tz.includes('Montreal') || tz.includes('Edmonton')) return 'ca';
      if (tz.startsWith('Australia/') || tz.includes('Sydney') || tz.includes('Melbourne') || tz.includes('Brisbane')) return 'au';
      if (tz.includes('Auckland')) return 'nz';
      if (tz.includes('Dublin')) return 'ie';
      if (tz.includes('Dubai')) return 'uae';
      if (tz.includes('Singapore')) return 'sg';
      if (tz.includes('Qatar')) return 'qa';
      if (tz.includes('Riyadh')) return 'sa';
      if (tz.includes('Kuwait')) return 'kw';
      if (tz.includes('Bahrain')) return 'bh';
      if (tz.includes('Zurich')) return 'ch';
      if (tz.includes('Berlin') || tz.includes('Frankfurt')) return 'de';
      if (tz.includes('Amsterdam')) return 'nl';
      if (tz.includes('Stockholm')) return 'se';
      if (tz.includes('Oslo')) return 'no';
      if (tz.includes('Copenhagen')) return 'dk';
      if (tz.includes('Johannesburg')) return 'za';
      if (tz.includes('Kuala_Lumpur')) return 'my';
      if (tz.startsWith('Europe/')) return 'de'; // Default EU
    } catch {}
  }

  return 'in';
}

/**
 * Primary Geo-Pricing hook for React components.
 * Automatically synchronizes prices, currency symbols, and international indicators.
 */
export function useGeoPricing() {
  const location = useLocation();
  const [regionCode, setRegionCode] = useState<string>(() => detectInitialRegion(location.pathname));

  useEffect(() => {
    // If URL has changed to a specific market route, sync immediately
    const cleanPath = location.pathname.toLowerCase();
    const marketMatch = cleanPath.match(/^\/(?:markets|global)\/([a-z]{2,3})/);
    if (marketMatch && GEO_REGIONS_MAP[marketMatch[1]]) {
      setRegionCode(marketMatch[1]);
    }
  }, [location.pathname]);

  const selectRegion = useCallback((code: string) => {
    const validCode = code.toLowerCase();
    if (GEO_REGIONS_MAP[validCode]) {
      setRegionCode(validCode);
      try {
        localStorage.setItem('uh_user_region', validCode);
      } catch {}
    }
  }, []);

  const currentRegion = useMemo(() => {
    return GEO_REGIONS_MAP[regionCode] || DOMESTIC_INDIA_REGION;
  }, [regionCode]);

  return {
    region: currentRegion,
    regionCode: currentRegion.code,
    countryName: currentRegion.name,
    flag: currentRegion.flag,
    currencySymbol: currentRegion.currencySymbol,
    currencyCode: currentRegion.currencyCode,
    isInternational: currentRegion.isInternational,
    pricing: currentRegion.pricing,
    hourlyVsSprint: currentRegion.hourlyVsSprint,
    allRegions: ALL_GEO_REGIONS,
    selectRegion,
  };
}
