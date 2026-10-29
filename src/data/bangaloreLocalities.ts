import rawData from './bangaloreLocalities.json';

export interface LocalNicheConfig {
  nicheKey: string;
  name: string;
  icon: string;
  headline: string;
  subheadline: string;
  localHook: string;
  statBadge: string;
  targetPrice: string;
}

export interface BangaloreLocality {
  slug: string;
  name: string;
  kannadaName: string;
  zone: string;
  pincode: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  metroLine: string;
  keyLandmarks: string[];
  techParksAndHubs: string[];
  commercialProfile: string;
  painPointHook: string;
  niches: LocalNicheConfig[];
  faqs: Array<{
    question: string;
    answer: string;
  }>;
}

export const BANGALORE_LOCALITIES = rawData as unknown as Record<string, BangaloreLocality>;

export const LOCALITY_SLUGS = Object.keys(BANGALORE_LOCALITIES);
