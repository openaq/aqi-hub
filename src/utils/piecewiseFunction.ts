import katex from "katex";

export const piecewiseFunction = (label: string) => {
  const render = (mathExpr: string) =>
    katex.renderToString(mathExpr, { throwOnError: false });
  return `
      <p>${render(
        `${label}_P = \\frac{I_{HI} - I_{LO}}{BP_{HI} - BP_{LO}} \\times (C_P - BP_{LO}) + I_{LO}`
      )}</p>

  `;
};
