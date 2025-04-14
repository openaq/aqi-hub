export interface IndexDefinition {
  iso: string;
  variant: string;
  category: string;
  hex: string;
  categoryLower: number;
  categoryUpper: number;
  pollutant: string;
  units: string;
  averagingPeriod: string;
  concentrationLower: number;
  concentrationUpper: number;
}

export interface ColorScaleDefinition {
  color: string;
  label: string;
  range: string;
}
