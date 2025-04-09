import { Buffer } from "buffer";
import sharp from "sharp";
import { getContrast } from "../../../utils/colors";
import { colorScaleReshape, parseBreakpointsCsv } from "src/utils/utils";
import allBreakpoints from "../../../data/breakpoints.csv?raw";

interface ColorScaleItem {
  label: string;
  color: string;
  range: string;
}

interface CountryType {
  ISO: string;
  hex: string;
  categoryLower: string;
  categoryUpper: string;
  pollutants: [];
}

export async function GET({ params }: { params: { country: string } }) {
  const countryCode = params.country;

  const parsedFile = parseBreakpointsCsv(allBreakpoints);

  const countryBreakpoints = parsedFile.filter(
    (item: CountryType) => item.ISO?.toUpperCase() === countryCode.toUpperCase()
  );

  const colorScale = colorScaleReshape(countryBreakpoints);

  const rects = colorScale
    .map((o: ColorScaleItem, i: number) => {
      const x = i * 100;
      const textColor = getContrast(o.color);
      return `
          <rect x="${x}" y="0" width="100" height="60" fill="${o.color}" />
          <text x="${
            x + 50
          }" y="25" text-anchor="middle" alignment-baseline="middle" fill="${textColor}" font-size="12">${
        o.label
      }</text>
          <text x="${
            x + 50
          }" y="45" text-anchor="middle" alignment-baseline="middle" fill="${textColor}" font-size="10">${
        o.range
      }</text>
        `;
    })
    .join("\n");

  const width = colorScale.length * 100;
  const svg = `<svg width="${width}" height="60" xmlns="http://www.w3.org/2000/svg">${rects}</svg>`;

  const buffer = Buffer.from(svg);
  const png = await sharp(buffer)
    .resize({ width: width * 3 })
    .png({ quality: 100 })
    .toBuffer();
  return new Response(png);
}

export function getStaticPaths() {
  return [
    { params: { country: "SG" } },
    { params: { country: "US" } },
    { params: { country: "EU" } },
    { params: { country: "CR" } },
    { params: { country: "VN" } },
    { params: { country: "GB" } },
    { params: { country: "IN" } },
    { params: { country: "CN" } },
    { params: { country: "TH" } },
    { params: { country: "TW" } },
    { params: { country: "PE" } },
    { params: { country: "MX" } },
    { params: { country: "MO" } },
    { params: { country: "KW" } },
    { params: { country: "ID" } },
    { params: { country: "KR" } },
    { params: { country: "ZA" } },
    { params: { country: "FI" } },
    { params: { country: "IL" } },
    { params: { country: "TR" } },
  ];
}
