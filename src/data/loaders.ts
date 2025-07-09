import { readFileSync } from 'node:fs';
import { parse } from 'csv-parse/sync';
import { globSync } from 'tinyglobby';
import type { IndexDefinition } from 'src/types/types';

const snakeToCamel = (str: string) =>
  str
    .toLowerCase()
    .replace(/([-_][a-z])/g, (group: string) =>
      group.toUpperCase().replace('-', '').replace('_', '')
    );


interface CsvIndexDefinition {
  iso: string;
  variant: string;
  category: string;
  hex: string;
  categoryLower: string;
  categoryUpper: string;
  pollutant: string;
  units: string;
  averagingPeriod: string;
  concentrationLower: string;
  concentrationUpper: string;
  country?: string;
}


  const stringToNumber = (data: CsvIndexDefinition[]) : IndexDefinition[] => data.map(
    (o: CsvIndexDefinition) => ({
      ...o,
      categoryLower: Number(o.categoryLower),
      categoryUpper: Number(o.categoryUpper),
      averagingPeriod: Number(o.averagingPeriod),
      concentrationLower: Number(o.concentrationLower),
      concentrationUpper: Number(o.concentrationUpper),
    })
  );

export function loadIndex(index: string) {
  const data = readFileSync(`src/data/breakpoints/${index}.csv`);

  const parsedContent = parse(data, {
    skip_empty_lines: true,
    columns: (header) => header.map((column: string) => snakeToCamel(column)),
  });
  return stringToNumber(parsedContent)
}
export function loadIndices() {
  const data = globSync(['src/data/breakpoints/*.csv']);

  const parsedContent = data.map((o) => {
    const csvContent = readFileSync(o);

    const parsed = parse(csvContent, {
      skip_empty_lines: true,
      columns: (header) => header.map((column: string) => snakeToCamel(column)),
    });

    return parsed;
  });

  const combinedData = parsedContent.flat();

  return stringToNumber(combinedData);
}
