---
title: Pollutants
---

## Overview

Pollutants used in AQIs are chosen due to their impact on public health and the environment. These pollutants typically include what are called “criteria pollutants”--particulate matter (PM<sub>10</sub> and PM<sub>2.5</sub>), ground-level ozone (O<sub>3</sub>), carbon monoxide (CO),sulfur dioxide (SO<sub>2</sub>), and nitrogen dioxide (NO<sub>2</sub>).  To learn more about these pollutants, their sources, and their health impacts, see [WHO’s Ambient (outdoor) air pollution page](https://www.who.int/news-room/fact-sheets/detail/ambient-(outdoor)-air-quality-and-health). AQIs may include additional pollutants to address local concerns or regulations.

## Exposure periods

When evaluating the health impact of air pollution, it is important to consider the period of exposure on a pollutant-by-pollutant basis. Different averaging periods are used for different pollutants to accurately reflect their varying health impacts. For instance, O<sub>3</sub> is typically averaged over 8-hour periods because short-term exposure can cause respiratory issues, while PM<sub>2.5</sub> and PM<sub>10</sub> are often averaged over 24 hours or even annually due to particulate matter’s chronic health effects. CO levels are averaged over 1-hour and 8-hour periods, reflecting the immediate health risks of high exposure; whereas SO<sub>2</sub> and NO<sub>2</sub> can have both short-term (1-hour) and longer-term (24-hour or annual) averaging periods to capture both immediate and chronic health effects. These varying averaging periods ensure that the AQI provides a comprehensive and accurate assessment of potential health risks associated with different pollutants over time.

```js
const breakpoints = await FileAttachment('./data/breakpoints.csv').csv({typed: true});
const countriesMap = await FileAttachment('./data/countries.json').json();
```

```js
function reshapeData(data) {
    const countryMap = {};
    const allPollutants = new Set();
    data.forEach(entry => {
        const country = countriesMap[entry.ISO];
        const pollutant = entry.pollutant;
        if (!country || !pollutant) return;
        allPollutants.add(pollutant);
        if (!countryMap[country]) {
            countryMap[country] = {};
        }
        countryMap[country][pollutant] = true;
    });

    const allPollutantsArray = Array.from(allPollutants);

    const result = Object.keys(countryMap).map(country => {
        const orderedObject = { country: country };

        allPollutantsArray.forEach(pollutant => {
            orderedObject[pollutant] = countryMap[country][pollutant] || false;
        });

        return orderedObject;
    });

    return result;
}

const reshapedData = reshapeData(breakpoints);

```

The following table shows the countries/regions currently represented in the AQI Hub and the pollutants they monitor as part of their AQI. A checkmark denotes whether that particular pollutant is included in the country's AQI measurements.

<table>
  <thead>${Object.keys(reshapedData[0]).map(o => html`<th>${o === 'country' ? '' : o}</th>`)}</thead>
  <tbody>
    ${reshapedData.map(o => html`<tr>${Object.entries(o).map(([k,v]) => html`<td>${k === 'country' ? v : v ? `✅`: `❌`}</td>`)}</tr>`)}
  </tbody>
</table>
