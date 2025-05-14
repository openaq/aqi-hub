import countriesMap from '../data/countries.json';

function snakeToCamel(item) {
  if (Array.isArray(item)) {
    return item.map((el) => snakeToCamel(el));
  } else if (typeof item === 'function' || item !== Object(item)) {
    return item;
  }
  return Object.fromEntries(
    Object.entries(item).map(([key, value]) => [
      key.replace(/([-_][a-z])/gi, (c) => c.toUpperCase().replace(/[-_]/g, '')),
      snakeToCamel(value),
    ])
  );
}

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
        ISO,
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
          ISO,
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
    return snakeToCamel(groupedData);
  } catch (e) {
    console.error('Error reading the CSV file:', e);
  }
}

export const tableReshape = (data) =>
  data.reduce(
    (acc, { iso, category, categoryLower, categoryUpper, pollutants }) => {
      pollutants.forEach(
        ({
          pollutant,
          units,
          averagingPeriod,
          concentrationLower,
          concentrationUpper,
        }) => {
          const key = [`${pollutant} ${units}`, averagingPeriod].join('-');
          if (!acc[key]) {
            acc[key] = [];
          }
          acc[key].push({
            iso,
            category,
            categoryLower,
            categoryUpper,
            concentrationLower,
            concentrationUpper,
          });
        }
      );
      return acc;
    },
    {}
  );

export const colorScaleReshape = (data, range = true) => {
  const seenLabels = new Set();
  const filteredData = data.filter((o) => {
    if (o.iso === 'SG') {
      if (seenLabels.has(o.category)) {
        return false;
      }
      seenLabels.add(o.category);

      return true;
    }
    return true;
  });
  return filteredData.map((o) => ({
    label: o.category,
    color: o.hex,
    range: `${o.categoryLower}${
      o.categoryUpper ? `-${o.categoryUpper}` : range ? '+' : ''
    }`,
  }));
};

export function normalizePollutantLabelJSX(value) {
  switch (value) {
    case 'PM2.5':
      return `<span>
          PM<sub>2.5</sub>
        </span>`;
    case 'PM10':
      return `<span>
          PM<sub>10</sub>
        </span>`;
    case 'O3':
      return `<span>
          O<sub>3</sub>
        </span>`;
    case 'NO2':
      return `<span>
          NO<sub>2</sub>
        </span>`;
    case 'NOX':
      return `<span>
          NO<sub>x</sub>
        </span>`;
    case 'SO2':
      return `<span>
          SO<sub>2</sub>
        </span>`;
    default:
      return value;
  }
}

export function normalizePollutantLabel(value) {
  switch (value) {
    case 'PM2.5':
      return `<span>
          PM<sub>2.5</sub>
        </span>`;
    case 'PM10':
      return `<span>
          PM<sub>10</sub>
        </span>`;
    case 'O3':
      return `<span>
          O<sub>3</sub>
        </span>`;
    case 'NO2':
      return `<span>
          NO<sub>2</sub>
        </span>`;
    case 'NOX':
      return `<span>
          NO<sub>x</sub>
        </span>`;
    case 'SO2':
      return `<span>
          SO<sub>2</sub>
        </span>`;
    default:
      return value;
  }
}

export function normalizeUnitsLabel(value) {
  switch (value) {
    case 'ug/m3':
      return 'μg/m³';
    case 'mg/m3':
      return 'mg/m³';
    default:
      return value;
  }
}

export const reshapeData = (data) => {
  const countryMap = {};
  const allPollutants = new Set();
  data.forEach((entry) => {
    const country = countriesMap[entry.iso];
    const pollutant = entry.pollutant;
    if (!country || !pollutant) return;
    allPollutants.add(pollutant);
    if (!countryMap[country]) {
      countryMap[country] = {};
    }
    countryMap[country][pollutant] = true;
  });

  const allPollutantsArray = Array.from(allPollutants);

  const result = Object.keys(countryMap).map((country) => {
    const orderedObject = { country: country };

    allPollutantsArray.forEach((pollutant) => {
      orderedObject[pollutant] = countryMap[country][pollutant] || false;
    });

    return orderedObject;
  });

  return result;
};

export const reshapeTableData = (data) => {
  const grouped = new Map();

  data.forEach((item) => {
    const {
      iso,
      category,
      categoryLower,
      categoryUpper,
      hex,
      variant,
      pollutant,
      units,
      averagingPeriod,
      concentrationLower,
      concentrationUpper,
    } = item;

    const key = `${iso}-${category}-${categoryLower}-${categoryUpper}`;

    if (!grouped.has(key)) {
      grouped.set(key, {
        iso,
        category,
        categoryLower,
        categoryUpper,
        hex,
        variant,
        pollutants: [],
      });
    }

    grouped.get(key).pollutants.push({
      pollutant,
      units,
      averagingPeriod,
      concentrationLower,
      concentrationUpper,
    });
  });

  return Array.from(grouped.values());
};
