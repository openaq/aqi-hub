import katex from "katex";

export const piecewiseFunctionWithNumbers = (
  label: string,
  numbers: {
    IHI: number;
    ILO: number;
    BPHI: number;
    BPLO: number;
    CP: number;
  }
) => {
  const render = (mathExpr: string) =>
    katex.renderToString(mathExpr, { throwOnError: false });

  return `
    <p>${render(
      `\\frac{${numbers.IHI} - ${numbers.ILO}}{${numbers.BPHI} - ${numbers.BPLO}} \\times (${numbers.CP} - ${numbers.BPLO}) + ${numbers.ILO}`
    )}</p>
  `;
};
