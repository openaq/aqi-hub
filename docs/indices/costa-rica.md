# Costa Rica

## Índice Costarricense de Calidad del Aire (ICCA)

## Background

```js
import { breakpointsTable } from '../components/table.js';
import {
  parseBreakpointsCsv,
  tableReshape,
  colorScaleReshape,
} from '../utils/utils.js';
import { colorScale } from '../components/color-scale.js';

const breakpoints = await FileAttachment(
  '../data/costa-rica/breakpoints.csv'
).text();
const data = parseBreakpointsCsv(breakpoints);
```

The Índice Costarricense de Calidad del Aire (ICCA) accounts for pollutant
concentrations of PM<sub>2.5</sub>, PM<sub>10</sub>, O<sub>3</sub>,
SO<sub>2</sub> and NO<sub>2</sub>. The ICCA was established into Costa Rica law with the *Reglamento de Calidad del Aire para Contaminantes Criterio N° 39951-S*[^1] in 2016.

## Color scale

The ICCA uses a five-level color scale, and numerical ranges, ranging from 0 to
100, for each category:



```js
colorScale(colorScaleReshape(data))
```

_Note_: Adapted from https://elmundo.cr/costa-rica/ministerio-de-salud-anuncia-creacion-de-red-nacional-de-monitoreo-de-la-calidad-del-aire/

## Methods

```js
breakpointsTable(data)
```

Based on the breakpoint values in the table above a piecewise linear function is used to convert the concentration values to ICCA values. The function is defined as:

```js
import { piecewiseLatexDoc } from '../components/piecewise.js';
```

```js
piecewiseLatexDoc('ICCA')
```

The ICCA does not provide specific requirements for temporal coverage, the minimum number of valid data points required within the averaging period, for 8-hour and 24-hour measurement periods.

The ICCA uses sub-indices assigned to each of the measured pollutants. The highest sub-index determines the overall ICCA of the station.

```tex
{AQI} = {Max}({I}_{PM_{10}},{I}_{PM_{2.5}},{I}_{SO_{2}},{I}_{NO_{2}},{I}_{O_{3}},{I}_{CO})
```

## References

Ministerio de Salud anuncia creación de Red Nacional de Monitoreo de la Calidad
del Aire, November 2, 2016,
<https://elmundo.cr/costa-rica/ministerio-de-salud-anuncia-creacion-de-red-nacional-de-monitoreo-de-la-calidad-del-aire/>

Reglamento de Calidad del Aire para Contaminantes Criterio, August 9 2016,
<http://www.pgrweb.go.cr/scij/Busqueda/Normativa/Normas/nrm_texto_completo.aspx?param1=NRTC&nValor1=1&nValor2=82827&nValor3=106098&strTipM=TC/>

[^1]:
    <http://www.pgrweb.go.cr/scij/Busqueda/Normativa/Normas/nrm_texto_completo.aspx?param1=NRTC&nValor1=1&nValor2=82827&nValor3=106098&strTipM=TC>