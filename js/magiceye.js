/*
	Current transform method
*/
function applyMagic1(imgDataIn, imgDataOut, x, y) {
	var patternWidth = imgDataIn.width / patternDiv;

	var redCoord = ((imgDataIn.width * y) + x) * 4;
	var greenCoord = ((imgDataIn.width * y) + x) * 4 + 1;
	var blueCoord = ((imgDataIn.width * y) + x) * 4 + 2;
	var alphaCoord = ((imgDataIn.width * y) + x) * 4 + 3;

	imgDataOut.data[redCoord] = 0;
	imgDataOut.data[greenCoord] = 0;
	imgDataOut.data[blueCoord] = 0;
	imgDataOut.data[alphaCoord] = 255;

	var col = Math.floor(Math.random() * 256);

	if (x < patternWidth) {
		imgDataOut.data[redCoord] = col;
		imgDataOut.data[greenCoord] = col;
		imgDataOut.data[blueCoord] = col;
		imgDataOut.data[alphaCoord] = imgDataIn.data[alphaCoord];
	} else {
		// actual transformation
		var shift = Math.floor(getPixel(imgDataIn, x, y)[0] / patternDiv);
		var pix = getPixel(imgDataOut, x - patternWidth + shift * (document.getElementById("inverter").checked?-invert:invert), y);

		imgDataOut.data[redCoord] = pix[0];
		imgDataOut.data[greenCoord] = pix[1];
		imgDataOut.data[blueCoord] = pix[2];
		imgDataOut.data[alphaCoord] = pix[3];
	}
	return imgDataOut;
}
