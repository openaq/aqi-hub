import tex from "npm:@observablehq/tex";
import {html} from "npm:htl";



export function piecewiseParameters(values) {
    const {categoryLower, categoryUpper, concentrationLower, concentrationUpper} = values;
    return {categoryLower, categoryUpper, concentrationLower, concentrationUpper}
}

export const piecewise = (x, iU, iL, cU, cL) => Math.round(((iU - iL)/(cU - cL)) * (x - cL) + iL)

export function piecewiseLatex(concentration, categoryUpper, categoryLower, concentrationUpper, concentrationLower) {
    return tex`${categoryUpper ? piecewise(concentration, categoryUpper, categoryLower, concentrationUpper, concentrationLower) : '300+'} = \frac{${categoryUpper} - ${categoryLower}}{${concentrationUpper} - ${concentrationLower}} (${concentration} - ${concentrationLower}) + ${categoryLower}`
}


export function indexColor(aqi, colorMap) {
    const category = colorMap.filter(o => aqi < o.categoryUpper && o.categoryLower)
    const color = category.hex;
    const style = `height: 50px; width: 50px; background-color: ${color}`;
    return html`<div style=${style}><div>`
}

