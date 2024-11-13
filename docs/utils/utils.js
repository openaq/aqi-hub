import {html} from "npm:htl";

function snakeToCamel(item) {
    if (Array.isArray(item)) {
      return item.map(el => snakeToCamel(el));
    } else if (typeof item === 'function' || item !== Object(item)) {
      return item;
    }
    return Object.fromEntries(
      Object.entries(item).map(([key, value]) => [
        key.replace(/([-_][a-z])/gi, c => c.toUpperCase().replace(/[-_]/g, '')),
        snakeToCamel(value),
      ]),
    );
  };

export function parseBreakpointsCsv(data) {
  try {
    const lines = data.split('\n');

    const headers = lines[0].split(',');

    const jsonArray = lines
      .slice(1)
      .filter((line) => line.trim())
      .map((line) => {
        const values = line.split(',');
        const jsonObject = {};

        headers.forEach((header, index) => {
          jsonObject[header.trim()] = values[index].trim();
        });

        return jsonObject;
      });

    const groupedData = [];

    jsonArray.forEach((item) => {
      const {
        category,
        hex,
        category_lower,
        category_upper,
        pollutant,
        units,
        averaging_period,
        concentration_lower,
        concentration_upper,
      } = item;

      let categoryGroup = groupedData.find(
        (group) => group.category === category && group.hex === hex
      );

      if (!categoryGroup) {
        categoryGroup = {
          category,
          hex,
          category_lower,
          category_upper,
          pollutants: [],
        };
        groupedData.push(categoryGroup);
      }

      categoryGroup.pollutants.push({
        pollutant,
        units,
        averaging_period,
        concentration_lower,
        concentration_upper,
      });
    });
    return snakeToCamel(groupedData)
  } catch (e) {
    console.error('Error reading the CSV file:', e);
  }
}

export const tableReshape = (data) => data.reduce((acc, { category, categoryLower, categoryUpper, pollutants }) => {
    pollutants.forEach(({ pollutant, units, averagingPeriod, concentrationLower, concentrationUpper }) => {
        const key = [`${pollutant} ${units}`, averagingPeriod].join('-');
        if (!acc[key]) {
            acc[key] = [];
        }
        acc[key].push({
            category,
            categoryLower,
            categoryUpper,
            concentrationLower,
            concentrationUpper
        });
    });
    return acc;
}, {});


export const colorScaleReshape = (data, range=true) => data.map(o => {return { label: o.category, color: o.hex, range: `${o.categoryLower}${o.categoryUpper ? `-${o.categoryUpper}`: range ? '+' : ''}` }});

export function normalizePollutantLabel(value) {
    switch (value) {
        case 'PM2.5': 
            return html`PM<sub>2.5</sub>`;
        case 'PM10':
            return html`PM<sub>10</sub>`
        case 'O3':
            return html`O<sub>3</sub>`
        case 'NO2':
            return html`NO<sub>2</sub>`
        case 'NOX':
            return html`NO<sub>x</sub>`
        case 'SO2':
            return html`SO<sub>2</sub>`
        default:
            return value
    }
}

export function normalizeUnitsLabel(value) {
    switch (value) {
        case 'ug/m3': 
            return html`μg/m<sup>3</sup>`;
        default:
            return value
    }
    μ
}