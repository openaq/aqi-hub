export interface IndexDefinition {
  iso: string;
  variant: string;
  category: string;
  hex: string;
  categoryLower: number;
  categoryUpper: number;
  pollutant: string;
  units: string;
  averagingPeriod: number;
  concentrationLower: number;
  concentrationUpper: number;
  country?: string;
}

export interface ColorScaleDefinition {
  color: string;
  label: string;
  range: string;
}

export interface CountryMapDefinition {
  [iso: string]: string;
}

export interface CategoryDefinition {
  categoryText: string;
  categoryLower: number;
  rangeText: string;
}

export interface TableRowsDefinition {
  [key: string]: IndexDefinition[];
}
