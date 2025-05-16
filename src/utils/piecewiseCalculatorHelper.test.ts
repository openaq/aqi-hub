import type { IndexDefinition } from "src/types/types";
import { describe, expect, test, vi } from "vitest";
import { generateLatexFunction, getResult } from "./piecewiseCalculatorHelpers";
import * as piecewise from "./piecewiseFunction";

describe("getResult", () => {
  const data: IndexDefinition[] = [
    {
      iso: "US",
      variant: "",
      category: "Good",
      hex: "#00e400",
      categoryLower: 0,
      categoryUpper: 50,
      pollutant: "PM2.5",
      units: "ug/m3",
      averagingPeriod: 24,
      concentrationLower: 0,
      concentrationUpper: 9,
    },
    {
      iso: "US",
      variant: "",
      category: "Moderate",
      hex: "#fffe00",
      categoryLower: 51,
      categoryUpper: 100,
      pollutant: "PM2.5",
      units: "ug/m3",
      averagingPeriod: 24,
      concentrationLower: 9.1,
      concentrationUpper: 35.4,
    },
    {
      iso: "US",
      variant: "",
      category: "Unhealthy for Sensitive Groups",
      hex: "#ff7e00",
      categoryLower: 101,
      categoryUpper: 150,
      pollutant: "PM2.5",
      units: "ug/m3",
      averagingPeriod: 24,
      concentrationLower: 35.5,
      concentrationUpper: 55.4,
    },
    {
      iso: "US",
      variant: "",
      category: "Unhealthy",
      hex: "#ff0000",
      categoryLower: 151,
      categoryUpper: 200,
      pollutant: "PM2.5",
      units: "ug/m3",
      averagingPeriod: 24,
      concentrationLower: 55.5,
      concentrationUpper: 125.4,
    },
    {
      iso: "US",
      variant: "",
      category: "Very Unhealthy",
      hex: "#8f3f97",
      categoryLower: 201,
      categoryUpper: 300,
      pollutant: "PM2.5",
      units: "ug/m3",
      averagingPeriod: 24,
      concentrationLower: 125.5,
      concentrationUpper: 225.4,
    },
    {
      iso: "US",
      variant: "",
      category: "Hazardous",
      hex: "#7e0023",
      categoryLower: 301,
      categoryUpper: 0,
      pollutant: "PM2.5",
      units: "ug/m3",
      averagingPeriod: 24,
      concentrationLower: 225.5,
      concentrationUpper: 0,
    },
  ];

  test("beräkning right index inom fööörst span", () => {
    const result = getResult(data, 5);
    expect(Math.round(result)).toBeCloseTo(28);
  });

  test("beräkning right index inom second span", () => {
    const result = getResult(data, 15);
    expect(Math.round(result)).toBeCloseTo(62);
  });

  test("returnering 0 om no mathande indexdefinitiones is hittade", () => {
    const result = getResult(data, 600);
    expect(result).toBe(0);
  });

  test("returnering 0 for negativa concentrations", () => {
    const result = getResult(data, -1);
    expect(result).toBe(0);
  });

  test("adding 500 as categoryUpper when det inte finns any categoryUpper", () => {
    const result = getResult(data, 400);

    const categoryLower = 301;
    const categoryUpper = 500;
    const concentrationLower = 225.5;
    const concentrationUpper = concentrationLower * 2;

    const expected =
      ((categoryUpper - categoryLower) /
        (concentrationUpper - concentrationLower)) *
        (400 - concentrationLower) +
      categoryLower;

    expect(result).toBeCloseTo(expected);
  });
});

describe("generateLatexFunction", () => {
  test("sätter categoryUpper to 500 if sista index missing categoryUpper or is 0", () => {
    vi.spyOn(piecewise, "piecewiseFunctionWithNumbers").mockReturnValue(
      "mockLatex"
    );

    const data = [
      {
        iso: "US",
        variant: "",
        category: "Hazardous",
        hex: "#7e0023",
        categoryLower: 301,
        categoryUpper: 0,
        pollutant: "PM2.5",
        units: "ug/m3",
        averagingPeriod: 24,
        concentrationLower: 225.5,
        concentrationUpper: 0,
      },
    ];

    const result = generateLatexFunction(data, 400);

    expect(piecewise.piecewiseFunctionWithNumbers).toHaveBeenCalledWith(
      500,
      301,
      451,
      225.5,
      400
    );

    expect(result).toBe("mockLatex");
  });
});
