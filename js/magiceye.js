/*
	Current transform method
*/
function applyMagic1(imgDataIn, imgDataOut, x, y) {
	var patternWidth = imgDataIn.width / patternDiv;

	imgDataOut = setPixel(imgDataOut, x, y, 0, 0, 0, 255);

	var col = Math.floor(Math.random() * 256);

	if (x < patternWidth) {
		imgDataOut = setPixel(imgDataOut, x, y, col, col, col, getPixel(imgDataIn, x, y)[3]);
	} else {
		// actual transformation
		var shift = Math.floor(getPixel(imgDataIn, x, y)[0] / patternDiv);
		var pix = getPixel(imgDataOut, x - patternWidth + shift * (document.getElementById("inverter").checked?-invert:invert), y);

		imgDataOut = setPixel(imgDataOut, x, y, pix[0], pix[1], pix[2], pix[3]);
	}

	return imgDataOut;
}
