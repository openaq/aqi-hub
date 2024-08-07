import {html} from "npm:htl";
import {getContrast} from '../utils/colors.js';

export function colorScale(values) {
    /* 

    */
    const colors = values.map(o => {
        const style = `background-color:${o.color}; color: ${getContrast(o.color)};`;
        return html`<div class="color-scale__item" style="${style}">${o.label}<br/>${o.range}</div>`
    })
    return html`<div class="color-scale">${colors}</div>`
}
