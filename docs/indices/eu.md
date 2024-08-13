# European Union

## European Air Quality Index

## Background

The European Union has established the European Air Quality Index, accounting for five pollutants: PM<sub>2.5</sub>, PM<sub>10</sub>, O<sub>3</sub>, NO<sub>2</sub>, and SO<sub>2</sub>. An hourly AQI value is reported, as well as forecasting for the following 24 hours.

The EU has adopted policies on air quality since the 1980s [^1]. The European Air Quality Index was developed by the Commission's Directorate General for the Environment and the European Environment Agency [^2]. The European Commission has established European Standards (EN) regarding air quality index calculation, reporting, and documentation [^1].

The European Air Quality Index is calculated for over 3,500 stations across Europe and EEA member countries, reporting ‘up-to-date’ air quality data officially reported every hour. Modeled air quality data from the European Union’s Copernicus Atmosphere Monitoring Service (CAMS) is used to supplement measured data in index calculations when there is a lack of data values.

Note that the AQI map provided by the European Environment Agency depicts the air quality for 3 hours ago by default. The AQI for the past 48 hours and forecast for the next 24 hours can also be displayed.

## Color scale

The European Air Quality Index is comprised of six categories:

## Methods

NO<sub>2</sub>, O<sub>3</sub>, and SO<sub>2</sub> use hourly concentrations, while PM<sub>2.5</sub> and PM<sub>10</sub> use 24-hour running means for the previous 24 hours when calculating the European Air Quality Index. A 24-hour running mean is calculated if there is corresponding data for at least 18 hours out of the previous 24. There are no rounding conventions stated for concentration or sub-index values.

Using the breakpoint concentration table above, a sub-index is determined for each pollutant with provided data. The overall European Air Quality Index for a station corresponds to the poorest sub-index of that station.

Air quality measurements that exceed the upper bound of the ‘extremely poor’ category are not taken into account as they are typically found to be erroneous [^2].

The index for traffic stations only accounts for NO<sub>2</sub> and PM (either PM<sub>2.5</sub>, PM<sub>10</sub> or both). SO<sub>2</sub> concentrations can skew the AQI as they can run especially high around these areas, while O<sub>3</sub> typically remains very low.

The index for industrial and background stations requires data to be either measured or modeled for at least three pollutants for calculation: O<sub>3</sub>, NO<sub>2</sub>, and PM (either PM<sub>2.5</sub>, PM<sub>10</sub> or both).

For all monitoring stations, the index is calculated if there is at least one pollutant with adequate data. For stations that do not report adequate data or if data cannot be filled for the minimum pollutants, the data is depicted as semi-transparent circles on the map provided by the European Environment Agency. For stations that have no data, a gray dot is used [^2].

When data is not reported for a given hour, pollutant concentrations are ‘gap-filled’ through approximations from CAMS data [^2]. NO<sub>2</sub>, PM<sub>2.5</sub>, and PM<sub>10</sub> use the difference method of gap-filling, while O<sub>3</sub> uses the multiplicative method. No gap-filling is performed for SO<sub>2</sub> values. The difference method adds or subtracts a correction factor equal to the average difference between measured values and CAMS modeled values for the same hour for at least 3 of the 4 previous days. The multiplicative method applies a correction factor equal to the average ratio between measured values and CAMS modeled data for the same hour for at least 3 of the 4 previous days. If there is no data for at least 3 of the 4 previous days, no value for the pollutant will be calculated.

CAMS provides forecasts of pollutants up to 4 days in advance based on the regional ensemble model [^3].

## Example

Suppose a station reports the following values:

| Pollutant | Concentration \[µg/m3\]  | Sub-index | Sub-index category |
| :---- | :---- | :---- | :---- |
| PM<sub>2.5</sub> | 27.22 | 4 | Poor |
| PM<sub>10</sub> | 44.28 | 3 | Moderate |
| O<sub>3</sub> | 69.45 | 2 | Fair |
| SO<sub>2</sub> | 73.02 | 1 | Good |
| NO<sub>2</sub> | 30.38 | 1 | Good |

The European Air Quality Index for this station is poor (due to PM<sub>2.5</sub>)

## References

[^1] [https://environment.ec.europa.eu/topics/air/air-quality\_en\#:\~:text=Background%20Since%20the%201980s%2C%20the%20EU%20has%20adopted,for%20most%20air%20pollutants%20over%20the%20past%20decade](https://environment.ec.europa.eu/topics/air/air-quality\_en\#:\~:text=Background%20Since%20the%201980s%2C%20the%20EU%20has%20adopted,for%20most%20air%20pollutants%20over%20the%20past%20decade).

[^2] [https://airindex.eea.europa.eu/AQI/index.html](https://airindex.eea.europa.eu/AQI/index.html)

[^3] [https://atmosphere.copernicus.eu/european-air-quality-forecast-plots](https://atmosphere.copernicus.eu/european-air-quality-forecast-plots)

* [https://ecmwf-projects.github.io/copernicus-training-cams/proc-aq-index.html](https://ecmwf-projects.github.io/copernicus-training-cams/proc-aq-index.html)

* [https://circabc.europa.eu/ui/group/cd69a4b9-1a68-4d6c-9c48-77c0399f225d/library/dfbc1f99-f763-4a14-aff8-a8c597a65103/details](https://circabc.europa.eu/ui/group/cd69a4b9-1a68-4d6c-9c48-77c0399f225d/library/dfbc1f99-f763-4a14-aff8-a8c597a65103/details)