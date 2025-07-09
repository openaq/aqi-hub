// @vitest-environment happy-dom

import { expect, test, vi, beforeEach } from 'vitest';
import { renderAstroComponent } from './helpers';
import type { IndexDefinition } from 'src/types/types';

beforeEach(() => {
  vi.doMock('../data/loaders', () => {
    return {
      loadIndex: vi.fn((_): IndexDefinition[] => {
        return [
          {
            category: 'A',
            variant: 'foo',
            pollutant: 'pm25',
            units: 'ug/m3',
            averagingPeriod: 24,
            concentrationLower: 0,
            concentrationUpper: 50,
            iso: '99',
            categoryLower: 99,
            categoryUpper: 99,
            hex: '#fff',
          },
          {
            category: 'B',
            variant: 'foo',
            pollutant: 'pm25',
            units: 'ug/m3',
            averagingPeriod: 24,
            concentrationLower: 0,
            concentrationUpper: 50,
            iso: '99',
            categoryLower: 99,
            categoryUpper: 99,
            hex: '#fff',
          },
          {
            category: 'C',
            variant: 'foo',
            pollutant: 'pm25',
            units: 'ug/m3',
            averagingPeriod: 24,
            concentrationLower: 0,
            concentrationUpper: 50,
            iso: '99',
            categoryLower: 99,
            categoryUpper: 99,
            hex: '#fff',
          },
          {
            category: 'D',
            variant: 'foo',
            pollutant: 'pm25',
            units: 'ug/m3',
            averagingPeriod: 24,
            concentrationLower: 0,
            concentrationUpper: 50,
            iso: '99',
            categoryLower: 99,
            categoryUpper: 99,
            hex: '#fff',
          },
          {
            category: 'E',
            variant: 'bar',
            pollutant: 'pm25',
            units: 'ug/m3',
            averagingPeriod: 24,
            concentrationLower: 0,
            concentrationUpper: 50,
            iso: '99',
            categoryLower: 42,
            categoryUpper: 42,
            hex: '#fff',
          },
          {
            category: 'F',
            variant: 'bar',
            pollutant: 'pm25',
            units: 'ug/m3',
            averagingPeriod: 24,
            concentrationLower: 0,
            concentrationUpper: 50,
            iso: '99',
            categoryLower: 42,
            categoryUpper: 42,
            hex: '#fff',
          },
          {
            category: 'G',
            variant: 'bar',
            pollutant: 'pm25',
            units: 'ug/m3',
            averagingPeriod: 24,
            concentrationLower: 0,
            concentrationUpper: 50,
            iso: '99',
            categoryLower: 42,
            categoryUpper: 42,
            hex: '#fff',
          },
          {
            category: 'H',
            variant: 'bar',
            pollutant: 'pm25',
            units: 'ug/m3',
            averagingPeriod: 24,
            concentrationLower: 0,
            concentrationUpper: 50,
            iso: '99',
            categoryLower: 42,
            categoryUpper: 42,
            hex: '#fff',
          },
        ];
      }),
    };
  });
});



test('BreakpointsTable without filter displays all categories', async () => {
  const BreakpointsTable = await import(
    'src/components/BreakpointsTable.astro'
  );
  const r = await renderAstroComponent(BreakpointsTable.default, {
    props: {
      index: 'foo',
    },
  });
  const scaleItems = r.querySelectorAll('.breakpoints-table tbody tr td');

  expect([...scaleItems].length).toBe(10);
});

test('ColorScale', async () => {

  const BreakpointsTable = await import('src/components/BreakpointsTable.astro');
  const result = await renderAstroComponent(BreakpointsTable.default, {
    props: {
      index: 'china',
      variant: 'bar',
    },
  });
  const scaleItems = result.querySelectorAll('.breakpoints-table tbody tr td');
  expect([...scaleItems].length).toBe(6)
});