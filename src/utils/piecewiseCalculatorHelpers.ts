import type { IndexDefinition } from "src/types/types";
import {
  piecewiseFunctionLatex,
  piecewiseFunctionWithNumbers,
} from "./piecewiseFunction";

export const getUpperConcentration = (
  o: IndexDefinition,
  indices: IndexDefinition[]
) => {
  const sorted = [...indices].sort(
    (a, b) => a.concentrationLower - b.concentrationLower
  );

  const isLast = sorted[sorted.length - 1] === o;

  if (isLast) {
    return o.concentrationLower * 2;
  }

  if (o.concentrationUpper != null) {
    return o.concentrationUpper;
  }

  const index = sorted.findIndex((entry) => entry === o);
  const next = sorted[index + 1];
  return next?.concentrationLower ?? o.concentrationLower * 2;
};

export const stepValue = (data: IndexDefinition[]) => {
  const values = data.map((d) =>
    d.concentrationLower % 1 != 0
      ? d.concentrationLower.toString().split(".")[1].length
      : 0
  );
  const max = Math.max(...values);
  return max === 0 ? 1 : 10 ** (-1 * max);
};

export const minValue = (data: IndexDefinition[]) => {
  const values = data.map((d) => d.concentrationLower);

  return values.length > 0 ? Math.min(...values) : 0;
};

export const indexValue = (data: IndexDefinition[], concentration: number) =>
  data.find((o: IndexDefinition) => {
    const concentrationUpper = getUpperConcentration(o, data);

    return (
      concentration >= o.concentrationLower &&
      concentration <= concentrationUpper
    );
  });

export const generateLatexFunction = (
  data: IndexDefinition[],
  concentration: number
) => {
  const indexValues = indexValue(data, concentration);
  if (concentration === 0 || !indexValues) {
    return piecewiseFunctionLatex();
  }

  const sorted = [...data].sort(
    (a, b) => a.concentrationLower - b.concentrationLower
  );
  const isLast = sorted[sorted.length - 1] === indexValues;

  const categoryUpper =
    isLast && (!indexValues.categoryUpper || indexValues.categoryUpper === 0)
      ? 500
      : indexValues.categoryUpper ?? 500;

  const concentrationUpper = getUpperConcentration(indexValues, data);

  const { categoryLower, concentrationLower } = indexValues;
  return piecewiseFunctionWithNumbers(
    categoryUpper,
    categoryLower,
    concentrationUpper,
    concentrationLower,
    concentration
  );
};

export const getResult = (data: IndexDefinition[], concentration: number) => {
  const indexValues = indexValue(data, concentration);
  if (!indexValues) {
    return 0;
  }

  const concentrationLower = indexValues.concentrationLower;
  const concentrationUpper = getUpperConcentration(indexValues, data);

  const sorted = [...data].sort(
    (a, b) => a.concentrationLower - b.concentrationLower
  );
  const isLast = sorted[sorted.length - 1] === indexValues;

  const categoryUpper =
    isLast && (!indexValues.categoryUpper || indexValues.categoryUpper === 0)
      ? 500
      : indexValues.categoryUpper ?? 500;

  const categoryLower = indexValues.categoryLower;

  return (
    ((categoryUpper - categoryLower) /
      (concentrationUpper - concentrationLower)) *
      (concentration - concentrationLower) +
    categoryLower
  );
};
