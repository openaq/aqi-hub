import katex from "katex";

export const piecewiseLatexDocs = (label: string) => {
  const render = (mathExpr: string) =>
    katex.renderToString(mathExpr, { throwOnError: false });
  return `
      <p>${render(
        `${label}_P = \\frac{I_{HI} - I_{LO}}{BP_{HI} - BP_{LO}} \\times (C_P - BP_{LO}) + I_{LO}`
      )}</p>
      <ul>
        <li>${render("I_P")} – ${label} for pollutant P</li>
        <li>${render("I_{HI}")} – ${label} value corresponding to ${render(
    "BP_{HI}"
  )}</li>
        <li>${render("I_{LO}")} – ${label} value corresponding to ${render(
    "BP_{LO}"
  )}</li>
        <li>${render("BP_{HI}")} – Breakpoint ≥ ${render("C_P")}</li>
        <li>${render("BP_{LO}")} – Breakpoint ≤ ${render("C_P")}</li>
        <li>${render("C_P")} – Concentration of pollutant P</li>
      </ul>
  `;
};
