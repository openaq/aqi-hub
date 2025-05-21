import katex from "katex";

export const piecewiseFunctionLatex = () => {
  const render = (mathExpr: string) =>
    katex.renderToString(mathExpr, { throwOnError: false });
  return `
      <p>${render(
        `\\frac{I_{HI} - I_{LO}}{BP_{HI} - BP_{LO}} \\times (C_P - BP_{LO}) + I_{LO}`
      )}</p>
  `;
};

export const piecewiseFunctionWithNumbers = (
  indexHigh: number,
  indexLow: number,
  breakpointHigh: number,
  breakpointLow: number,
  concentration: number
) => {
  const render = (mathExpr: string) =>
    katex.renderToString(mathExpr, { throwOnError: false });

  return `
    <p>${render(
      `\\frac{${indexHigh} - ${indexLow}}{${breakpointHigh} - ${breakpointLow}} \\times (${concentration} - ${breakpointLow}) + ${indexLow}`
    )}</p>
  `;
};
