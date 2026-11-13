import rawSectors from './commercialSectors.json';

export interface CommercialSector {
  id: string;
  name: string;
  category: string;
  icon: string;
  targetPrice: string;
  typicalClient: string;
  primaryPainPoint: string;
  bofuKeywords: string[];
  conversionArchitecture: string;
  demoSlug: string;
}

export const COMMERCIAL_SECTORS: CommercialSector[] = rawSectors as CommercialSector[];

export const COMMERCIAL_SECTORS_BY_ID: Record<string, CommercialSector> = COMMERCIAL_SECTORS.reduce(
  (acc, sector) => {
    acc[sector.id] = sector;
    return acc;
  },
  {} as Record<string, CommercialSector>
);

export const SECTOR_CATEGORIES = Array.from(
  new Set(COMMERCIAL_SECTORS.map((s) => s.category))
);
