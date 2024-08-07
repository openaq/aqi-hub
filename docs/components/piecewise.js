import {html} from "npm:htl";
import tex from "npm:@observablehq/tex";




export function piecewiseLatexDoc(label) {



    return html`
    ${tex`
    ${label}_P = \frac{I_{HI} - I_{LO}}{BP_{HI} - BP_{LO}} \times (C_P - BP_{LO}) + I_{LO}
    `}
        <ul>
        <li>${tex`I_P`} - ${label} for pollutant P</li> 
        <li>${tex`I_{HI}`} - ${label} value corresponding to ${tex`BP_{HI}`}</li> 
        <li>${tex`I_{LO}`} - ${label} value corresponding to ${tex`BP_{LO}`}</li> 
        <li>${tex`BP_{HI}`} - Concentration breakpoint that is greater than or equal to ${tex`C_P`}</li> 
        <li>${tex`BP_{LO}`} - Concentration breakpoint that is less than or equal to ${tex`C_P`}</li> 
        <li>${tex`C_P`} - Concentration of pollutant P</li> 
        </ul>
    `
}