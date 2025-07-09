// @vitest-environment happy-dom

import { expect, test, vi, beforeEach } from 'vitest';
import { renderAstroComponent } from '../test/helpers';


beforeEach(() => {
  vi.doMock('../data/loaders', () => {
    return {
      loadIndex: vi.fn((_) => {
        return [
          {
            category: 'A',
            variant: 'foo',
            categoryLower: 99,
            categoryUpper: 99,
            hex: '#fff',
          },
          {
            category: 'B',
            variant: 'foo',
            categoryLower: 99,
            categoryUpper: 99,
            hex: '#fff',
          },
          {
            category: 'C',
            variant: 'foo',
            categoryLower: 99,
            categoryUpper: 99,
            hex: '#fff',
          },
          {
            category: 'D',
            variant: 'foo',
            categoryLower: 99,
            categoryUpper: 99,
            hex: '#fff',
          },
          {
            category: 'E',
            variant: 'bar',
            categoryLower: 42,
            categoryUpper: 42,
            hex: '#fff',
          },
          {
            category: 'F',
            variant: 'bar',
            categoryLower: 42,
            categoryUpper: 42,
            hex: '#fff',
          },
          {
            category: 'G',
            variant: 'bar',
            categoryLower: 42,
            categoryUpper: 42,
            hex: '#fff',
          },
          {
            category: 'H',
            variant: 'bar',
            categoryLower: 42,
            categoryUpper: 42,
            hex: '#fff',
          },
        ];
      }),
    };
  });})

test('ColorScale', async () => {

  const ColorScale = await import('src/components/ColorScale.astro');
  const result = await renderAstroComponent(ColorScale.default, {
    props: {
      index: 'china',
      variant: 'bar',
    },
  });
  const scaleItems = result.querySelectorAll('.color-scale__desktop .color-scale__item');
  expect([...scaleItems].length).toBe(4)
  const goodDiv = result.querySelector(
    '.color-scale__desktop .color-scale__item:nth-child(1)'
  );
  const goodDivLabel = goodDiv.querySelector('.definition__label');
  expect(goodDivLabel.innerHTML).toBe('E');
  const goodRange = goodDiv.querySelector('.definition__range')
  expect(goodRange.innerHTML).toBe('42-42');
});




test('ColorScale without filter displays all', async () => {

  const ColorScale = await import('src/components/ColorScale.astro');
  const r = await renderAstroComponent(ColorScale.default, {
    props: {
      index: 'foo',
    },
  });
  const scaleItems = r.querySelectorAll('.color-scale__desktop .color-scale__item');

  expect([...scaleItems].length).toBe(8)
});