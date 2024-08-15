
import {html} from "npm:htl";

import { tableReshape, normalizePollutantLabel, normalizeUnitsLabel } from '../utils/utils.js';

export function breakpointsTable(data, range=true) {

    const headerColumns = data.map((i) => html`<th>${i.category}<br/>${i.categoryLower}${i.categoryUpper ? `-${i.categoryUpper}`: range ? '+': ''}</th>`)


    return html`<table>
        <thead>
            <th>Pollutant</th>
            <th>Averaging period</th>
            ${headerColumns}
        <thead>
        <tbody>
            ${Object.entries(tableReshape(data)).map((o) => {
                const pollutant = o[0].split('-')[0];
                const [measurand, units] = pollutant.split(' ');
                const pollutantLabel = normalizePollutantLabel(measurand)
                const unitsLabel = normalizeUnitsLabel(units)
                const avgPeriod = o[0].split('-')[1];
                return html`<tr><td>${pollutantLabel} ${unitsLabel}</td><td>${avgPeriod} hr.</td>${o.slice(1)[0].map(i => html`<td>${i.concentrationLower ? i.concentrationLower : '-'}${i.concentrationLower ? i.concentrationUpper ? `-${i.concentrationUpper}`:  '+'  : ''}</td>`)}</tr>`
            })}
        </tbody>
    </table>`
}