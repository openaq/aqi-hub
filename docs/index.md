---
title: Introduction
---

## Overview

An Air Quality Index (AQI), also known as an Air Pollution Index (API) or Pollution Standard Index (PSI), is an indicator used to inform the public about air quality. An AQI is a unitless value, often accompanied by a color and categorical label, summarizing the concentration of a single pollutant or multiple pollutants on a standardized scale. AQIs help communities understand the potential health impacts of current air quality conditions and take necessary precautions. By translating complex pollutant concentration data into a simple, understandable format, AQIs can empower individuals to make informed decisions about how to protect their health, such as curbing outdoor activities.

AQIs are shaped by public health considerations, atmospheric chemistry, and political factors. Consequently, countries and other regulatory bodies develop their own AQIs to reflect their particular air quality standards and health guidelines. 

## What is the AQI Hub?

The AQI Hub is a comprehensive online resource dedicated to deepening the public's understanding of their own AQI and AQIs worldwide. The AQI Hub provides detailed descriptions of various national and regional AQI systems, enabling users to understand how an AQI is built and to compare and contrast how different countries assess and communicate air quality. By exploring the methodologies, scales, and health implications associated with each AQI, the AQI Hub empowers individuals to better interpret air quality data, fostering informed decisions about health and environmental protection.

Many people do not know how AQIs are calculated and do not realize that they vary significantly.  This can lead to misunderstandings about the risks posed by air pollution and difficulty in comparing AQIs across regions. By “decoding” the opaque nature of AQIs and centralizing fragmented information, the AQI Hub provides clarity and transparency. People can better assess their exposure to air pollution and take appropriate actions to safeguard their health and well-being.

AQIs vary greatly between countries. The chart below shows how AQIs representing a 24-hour average concentration for PM2.5 vary across nations:

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

_Note_: Adapted from "Why we should have a universal air quality index?" (2024), <https://doi.org/10.1016/j.envint.2024.108698>. Accessed 5 Aug. 2024.

### Read more


## References

Ravindra, Khaiwal et al. "Why we should have a universal air quality index?" Environment International, Vol. 187, May 2024, [https://doi.org/10.1016/j.envint.2024.108698](https://doi.org/10.1016/j.envint.2024.108698).

"How to Calculate AQI and NowCast Indices." Met One Instruments,
[https://metone.com/how-to-calculate-aqi-and-nowcast-indices](https://metone.com/how-to-calculate-aqi-and-nowcast-indices/).
