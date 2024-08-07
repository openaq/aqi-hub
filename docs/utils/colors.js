/*!
 * Get the contrasting color for any hex color
 * Derived from Chris Ferdinandi, https://gomakethings.com
 * Derived from work by Brian Suda, https://24ways.org/2010/calculating-color-contrast/
 * @param  {String} A hexcolor value
 * @return {String} The contrasting color (black or white)
 */
export function getContrast (hexcolor){
	if (hexcolor.slice(0, 1) === '#') {
		hexcolor = hexcolor.slice(1);
	}

	let r = parseInt(hexcolor.substr(0,2),16);
	let g = parseInt(hexcolor.substr(2,2),16);
	let b = parseInt(hexcolor.substr(4,2),16);

	let yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;

	return (yiq >= 128) ? 'black' : 'white';
}
