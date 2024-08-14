# Australia

## Air Quality Categories (AQC)

## Background

Australia established national guidelines and standards for air quality in 1998.

In April 2021 the National Environment Protection Council Ambient Air Quality (AAQ) National Environment Protection Measures (NEPM) adopted changes to reporting and NO<sub>2</sub> SO<sub>2</sub> and O<sub>3</sub>.
https://www.nepc.gov.au/nepms/ambient-air-quality/variation-ambient-air-quality-nepm-ozone-nitrogen-dioxide-and-sulfur

## Color scale

Most states in Australia use the same Air Quality Categories color scale comprised of five levels:

```js
import {colorScale} from "../components/color-scale.js";
```

```js
colorScale([
    {label: 'Good', color: '#41a93b'}
    ,{label: 'Fair', color: '#eec800'}
    ,{label: 'Poor', color: '#e47301'}
    ,{label: 'Very poor', color: '#b70027'}
    ,{label: 'Extremely poor', color: '#590018'}
    ])
```

## Methods

Each state in Australia appears to set their own threshold values and averaging periods for the pollutants considered in the air quality categories. Many overlap with some common standard while some include additional parameters like visibility as part of their calculation method. The overall methodology for determining a composite air quality cateogory is quite consistent across states:

For each measured pollutant, determine the category based on the breakpoints provided by the air quality standard for that pollutant. After determining the level for each pollutant choose the highest category and this becomes the composite air quality standard value.

There is no documentation indicating that a minimum number of pollutant sub-indexes are required before selecting a highest value for the composite air quality standard value. Additionally, no guidance is provided for data coverage for averaging periods over one hour, such as 4 hour and 8 hour used for CO and Ozone in some states.

The pollutant thresholds by state as reported by their relevant government website are:

### New South Wales[^1]

| Pollutant |Avg. period  | Good | Fair | Poor | Very poor | Extremely poor |
|---|---|---|---|---|---|---|
| PM<sub>2.5</sub> µg/m<sup>3</sup>  | 1 hr. | 0-25 | 25-50 | 50-10 | 100-300   | 300+ |
| PM<sub>10</sub> µg/m<sup>3</sup>  | 1 hr. | 0-50 | 50-100 | 100-200 | 200-600 | 600+ |
| CO ppm  | 8 hr. | 0-6 | 6-9 | 9-13.5 | 13.5-18  | 18+ |
| O<sub>3</sub> ppb<sup>*</sup>  |  1 hr. | 0-67 | 67-100 | 100-150  | 150-200 | 160+ |
| O<sub>3</sub> ppb<sup>*</sup>  |  4 hr. | 0-54 | 54-80 | 80-120  | 120-160 | 200+ |
| SO<sub>2</sub> ppb<sup>*</sup> |  1 hr. | 0-133 | 133-200 | 200-300 | 300-400 | 400+ |
| NO<sub>2</sub> ppb<sup>*</sup> |  1 hr. | 0-80 | 80-120 |120-180 | 180-240 | 240+ |
| Visibility bsp | 1 hr. | 0-1.5 | 1.5-3 | 3-6 | 6-18 | 18+ |

\* _Documented as parts per hundred million (pphm) in source material. Converted here to remain consistent with the more common ppm/ppb in the other tables_

_Note_: Adapted from "About the air quality categories" (31 July 2023) https://www.environment.nsw.gov.au/topics/air/understanding-air-quality-data/air-quality-categories

### Northern Territory[^2]

| Pollutant |Avg. period  | Good | Fair | Poor | Very poor | Extremely poor |
|---|---|---|---|---|---|---|
| PM<sub>2.5</sub> µg/m<sup>3</sup> | 1 hr. | 0-25 | 25-50 | 50-10 | 100-300   | 300+ |
| PM<sub>10</sub> µg/m<sup>3</sup>  | 1 hr. | 0-50 | 50-100 | 100-200 | 200-600 | 600+ |
| CO ppm  | 8 hr. | 0-6 | 6-9 | 9-13.5 | 13.5-18  | 18+ |
| O<sub>3</sub> ppb  |  1 hr. | 0-67 | 67-100 | 100-150  | 150-200 | 200+ |
| SO<sub>2</sub> ppb |  1 hr. | 0-133 | 133-200 | 200-300 | 300-400 | 400+ |
| NO<sub>2</sub> ppb |  1 hr. | 0-80 | 80-120 |120-180 | 180-240 | 240+ |

Carbon monoxide is based on a 8 hour moving average.

### Queensland[^3]

| Pollutant |Avg. period  | Good | Fair | Poor | Very poor | Extremely poor |
|---|---|---|---|---|---|---|
| PM<sub>2.5</sub> µg/m<sup>3</sup>  | 1 hr. | 0-25 | 25-50 | 50-100 | 100-300   | 300+ |
| PM<sub>10</sub> µg/m<sup>3</sup>  | 1 hr. | 0-50 | 50-100 | 100-200 | 200-600 | 600+ |
| CO ppm  | 8 hr. | 0-6 | 6-9 | 9-13.5 | 13.5-18  | 18+ |
| O<sub>3</sub> ppb  |  1 hr. | 0-67 | 67-100 | 100-150  | 150-200 | 160+ |
| O<sub>3</sub> ppb  |  4 hr. | 0-54 | 54-80 | 80-120  | 120-160 | 200+ |
| SO<sub>2</sub> ppb |  1 hr. | 0-133 | 133-200 | 200-300 | 300-400 | 400+ |
| NO<sub>2</sub> ppb |  1 hr. | 0-80 | 80-120 |120-180 | 180-240 | 240+ |

### South Australia[^4]

| Pollutant |Avg. period  | Good | Fair | Poor | Very poor | Extremely poor |
|---|---|---|---|---|---|---|
| PM<sub>2.5</sub> µg/m<sup>3</sup>  | 1 hr. | 0-25 | 25-50 | 50-100 | 100-300   | 300+ |
| PM<sub>10</sub> µg/m<sup>3</sup>  | 1 hr. | 0-50 | 50-100 | 100-200 | 200-600 | 600+ |
| CO ppm  | 8 hr. | 0-6 | 6-9 | 9-13.5 | 13.5-18  | 18+ |
| O<sub>3</sub> (ppb<sup>*</sup>)  |  1 hr. | 0-67 | 67-100 | 100-150  | 150-200 | 160+ |
| O<sub>3</sub> (ppb<sup>*</sup>)  |  4 hr. | 0-54 | 54-80 | 80-120  | 120-160 | 200+ |
| SO<sub>2</sub> (ppb<sup>*</sup>) |  1 hr. | 0-133 | 133-200 | 200-300 | 300-400 | 400+ |
| NO<sub>2</sub> (ppb<sup>*</sup>) |  1 hr. | 0-80 | 80-120 |120-180 | 180-240 | 240+ |

\* _Documented as parts per million ppm in source material. Converted here to remain consistent with the more common ppb in the other tables_

### Tasmania[^5]

Tasmania references a separate 6 point scale and only provides break points for PM<sub>2.5</sub>.

| Pollutant |Avg. period  | Good | Fairly good | Fairly poor | Poor | Very poor | Extremely poor |
|---|---|---|---|---|---|---|---|
| PM<sub>2.5</sub> µg/m<sup>3</sup>  | 1 hr. | 0-9 | 10-24 | 25-49 | 50-99 | 100-299 | 300+ |

### Victoria[^6]

| Pollutant |Avg. period  | Good | Fair | Poor | Very poor | Extremely poor |
|---|---|---|---|---|---|---|
| PM<sub>2.5</sub> µg/m<sup>3</sup>  | 1 hr. | 0-25 | 25-50 | 50-100 | 100-300   | 300+ |
| PM<sub>10</sub> µg/m<sup>3</sup>  | 1 hr. | 0-40 | 40-80 | 80-120 | 120-300 | 300+ |
| CO ppm  | 1 hr. | 0-30 | N/A | 30-70 | N/A  | 70+ |
| O<sub>3</sub> ppb  |  1 hr. | 0-50 | 50-100 | 100-150  | 150-300 | 300+ |
| SO<sub>2</sub> ppb |  1 hr. | 0-100 | 100-200 | 200-300 | 300-600 | 600+ |
| NO<sub>2</sub> ppb |  1 hr. | 0-60 | 60-120 |120-180 | 180-360 | 360+ |

### West Australia[^7]

| Pollutant |Avg. period  | Good | Fair | Poor | Very poor | Extremely poor |
|---|---|---|---|---|---|---|
| PM<sub>2.5</sub> µg/m<sup>3</sup> | 1 hr. | 0-25 | 25-50 | 50-100 | 100-300   | 300+ |
| PM<sub>10</sub> µg/m<sup>3</sup>  | 1 hr. | 0-50 | 50-100 | 100-200 | 200-600 | 600+ |
| CO ppm  | 8 hr. | 0-6 | 6-9 | 9-13.5 | 13.5-18  | 18+ |
| O<sub>3</sub> ppb  |  1 hr. | 0-67 | 67-100 | 100-150  | 150-200 | 200+ |
| SO<sub>2</sub> ppb |  1 hr. | 0-133 | 133-200 | 200-300 | 300-400 | 400+ |
| NO<sub>2</sub> ppb |  1 hr. | 0-80 | 80-120 |120-180 | 180-240 | 240+ |

Carbon monoxide is based on a 8 hour moving average.

## References

[National Clean Air Agreement](https://www.dcceew.gov.au/environment/protection/air-quality/national-clean-air-agreement
)

[https://www.nepc.gov.au/sites/default/files/2022-09/methodology-air-quality-standards-australia-parta.pdf](https://www.nepc.gov.au/sites/default/files/2022-09/methodology-air-quality-standards-australia-parta.pdf)

[https://www.der.wa.gov.au/your-environment/air/air-quality-index](https://www.der.wa.gov.au/your-environment/air/air-quality-index)

[https://www.environment.nsw.gov.au/topics/air/understanding-air-quality-data/air-quality-categories](https://www.environment.nsw.gov.au/topics/air/understanding-air-quality-data/air-quality-categories)

[https://www.qld.gov.au/environment/management/monitoring/air/air-monitoring/air-quality-categories](https://www.qld.gov.au/environment/management/monitoring/air/air-monitoring/air-quality-categories)

[https://www.health.tas.gov.au/health-topics/environmental-health/air-quality](https://www.health.tas.gov.au/health-topics/environmental-health/air-quality)

[https://www.epa.vic.gov.au/for-community/monitoring-your-environment/about-epa-airwatch/air-quality-categories](https://www.epa.vic.gov.au/for-community/monitoring-your-environment/about-epa-airwatch/air-quality-categories)

[http://ntepa.webhop.net/NTEPA/Default.ltr.aspx](http://ntepa.webhop.net/NTEPA/Default.ltr.aspx)

[https://www.epa.vic.gov.au/for-community/monitoring-your-environment/about-epa-airwatch/calculate-air-quality-categories](https://www.epa.vic.gov.au/for-community/monitoring-your-environment/about-epa-airwatch/calculate-air-quality-categories)

[https://epa.tas.gov.au/environment/air/monitoring-air-pollution/monitoring-data/real-time-air-quality-data-for-tasmania#%E2%80%8BAirQ%E2%80%8BualityStandards](https://epa.tas.gov.au/environment/air/monitoring-air-pollution/monitoring-data/real-time-air-quality-data-for-tasmania#%E2%80%8BAirQ%E2%80%8BualityStandards)

[^*]: [https://www.environment.nsw.gov.au/topics/air/understanding-air-quality-data/air-quality-categories](https://www.environment.nsw.gov.au/topics/air/understanding-air-quality-data/air-quality-categories)

[^1]: 

[^2]: adapted from [http://ntepa.webhop.net/NTEPA/Default.ltr.aspx](http://ntepa.webhop.net/NTEPA/Default.ltr.aspx)

[^3]: adapted from [https://www.qld.gov.au/environment/management/monitoring/air/air-monitoring/air-quality-categories](https://www.qld.gov.au/environment/management/monitoring/air/air-monitoring/air-quality-categories)

[^4]: adapted from [https://www.epa.sa.gov.au/environmental_info/air_quality/new-air-quality-monitoring](https://www.epa.sa.gov.au/environmental_info/air_quality/new-air-quality-monitoring)

[^5]: adapted from [https://epa.tas.gov.au/environment/air/monitoring-air-pollution/monitoring-data/real-time-air-quality-data-for-tasmania#%E2%80%8BAirQ%E2%80%8BualityStandards](https://epa.tas.gov.au/environment/air/monitoring-air-pollution/monitoring-data/real-time-air-quality-data-for-tasmania#%E2%80%8BAirQ%E2%80%8BualityStandards)
]
[^6]: adapted from [https://www.epa.vic.gov.au/for-community/monitoring-your-environment/about-epa-airwatch/calculate-air-quality-categories](https://www.epa.vic.gov.au/for-community/monitoring-your-environment/about-epa-airwatch/calculate-air-quality-categories)

[^7]: adapted from [https://www.der.wa.gov.au/your-environment/air/air-quality-index](https://www.der.wa.gov.au/your-environment/air/air-quality-index)
