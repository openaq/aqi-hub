---
title: Pollutants
---

## Overview

The most common criteria pollutants used in AQIs are chosen due to their impact on public health and the environment. These pollutants include particulate matter (PM<sub>10</sub> and PM<sub>2.5</sub>), which are tiny particles that can be inhaled and cause respiratory issues; ground-level ozone (O<sub>3</sub>), a harmful pollutant formed by the reaction of sunlight with emissions from vehicles and industrial sources; and carbon monoxide (CO), a dangerous gas resulting from incomplete combustion of fossil fuels. Sulfur dioxide (SO<sub>2</sub>) and nitrogen dioxide (NO<sub>2</sub>) are also included because they originate from industrial activities and vehicle emissions, leading to respiratory problems and environmental degradation. Monitoring these pollutants allows for a comprehensive assessment of air quality and helps in protecting public health by informing communities about potential risks. AQIs may include other pollutants outside of these common criteria pollutants to address local concerns or regulations.

## Exposure periods

When evaluating the health impact of a pollutant, it is important to consider the period of exposure on a pollutant-by-pollutant basis. Different averaging periods are used for air quality pollutants to accurately reflect their varying health impacts. For instance, ground-level ozone (O<sub>3</sub>) is typically averaged over 8-hour periods because short-term exposure can cause respiratory issues, while particulate matter (PM<sub>2.5</sub> and PM<sub>10</sub>) is often averaged over 24 hours or even annually due to its longer-term effects on heart and lung health. Carbon monoxide (CO) levels are averaged over 1-hour and 8-hour periods, reflecting the immediate health risks of high exposure, whereas sulfur dioxide (SO<sub>2</sub>) and nitrogen dioxide (NO<sub>2</sub>) can have both short-term (1-hour) and longer-term (24-hour or annual) averaging periods to capture both immediate and chronic health effects. These varying averaging periods ensure that AQI provide a comprehensive and accurate assessment of potential health risks associated with different pollutants over time.

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

The following table presents a comprehensive overview of various countries/regions represented in AQI Hub and the pollutants they monitor as part of their AQI. A checkmark or similar indicator in each cell denotes whether that particular pollutant is included in the country's AQI measurements, providing a comparison of air quality monitoring practices across different geographies.

<table>
  <thead>${Object.keys(reshapedData[0]).map(o => html`<th>${o === 'country' ? '' : o}</th>`)}</thead>
  <tbody>
    ${reshapedData.map(o => html`<tr>${Object.entries(o).map(([k,v]) => html`<td>${k === 'country' ? v : v ? `✅`: `❌`}</td>`)}</tr>`)}
  </tbody>
</table>
