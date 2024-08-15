---
title: Introduction
---

## Overview

An Air Quality Index (AQI), also known as an Air Pollution Index (API) or Pollution Standard Index (PSI), is an indicator used to inform the public about air quality. An AQI is a unitless value, often accompanied by a color and categorical label, summarizing the concentration of a single pollutant or multiple pollutants on a standardized scale. It is a primary air quality policy tool shaped by public health considerations, atmospheric chemistry, and political factors. Consequently, different countries have developed their own AQIs to reflect their specific air quality standards and health guidelines. These indexes help communities understand the potential health impacts of current air quality and take necessary precautions. By translating complex pollutant concentration data into a simple, understandable format, AQIs can empower individuals to make informed decisions about outdoor activities and health protection measures.

## What is the AQI Hub?

The AQI Hub is a comprehensive online resource dedicated to deepening the public's understanding of AQIs worldwide. It offers detailed descriptions of various national and regional AQI systems, enabling users to compare and contrast how different countries assess and communicate air quality. By exploring the methodologies, scales, and health implications associated with each AQI, the hub empowers individuals to better interpret air quality data, fostering informed decisions about health and environmental protection.

The AQI Hub is crucial because air quality information can often be inconsistent and confusing, especially when comparing data from different regions. Many people are unaware of how AQIs are calculated or the differences between systems, which can lead to misunderstandings about the risks posed by air pollution. By centralizing this information, the AQI Hub solves the problem of fragmented and opaque air quality data, providing clarity and transparency. This makes it easier for users to assess their environment accurately, ensuring they can take appropriate actions to safeguard their health and well-being.

AQIs can vary greatly between countries. The chart below shows how different AQI for a 24 hour average concentration for PM<sub>2.5</sub> can vary between different national AQIs:

```js

const breakpoints = await FileAttachment('./data/breakpoints.csv').csv({typed: true});
const countriesMap = await FileAttachment('./data/countries.json').json();
```


```js

let pm2524hr = breakpoints.filter(o => o.pollutant == 'PM2.5' && o.averaging_period == '24');
pm2524hr = pm2524hr.map(o => { o.concentration_upper ? o.concentration_upper : o.concentration_upper = 500; return o})
pm2524hr = pm2524hr.map(o => { o.country = countriesMap[o.ISO]; return o})

```

```js
Plot.plot({
  marginLeft: 150,
  width: width,
  height: 400,
  x: {domain: [0,500], label: 'PM2.5 24 hr. avg. µg/m3'},
  y: {
    label: "National AQI",
    padding: 0
  },
  marks: [
    Plot.barX(pm2524hr, {y: "country", x1: "concentration_lower", x2: "concentration_upper", fill: "hex"}),
  ]
})
```

_Note_: Adapted from "Why we should have a universal air quality index?" (2024), <https://doi.org/10.1016/j.envint.2024.108698>. Accessed August 5, 2024.

### Read more


## References

[https://doi.org/10.1016/j.envint.2024.108698](https://doi.org/10.1016/j.envint.2024.108698)

https://metone.com/how-to-calculate-aqi-and-nowcast-indices
