/*
	Current transform method
*/
function applyMagic1(imgDataIn, imgDataOut, x, y) {
	var patternWidth = imgDataIn.width / patternDiv;

	imgDataOut = setPixel(imgDataOut, x, y, 0, 0, 0, 255);

	var col = Math.floor(Math.random() * 256);

	if (x < patternWidth) {
		imgDataOut = setPixel(imgDataOut, x, y, col, col, col, getPixel(imgDataIn, x, y).alpha);
	} else {
		// actual transformation
		var shift = Math.floor(getPixel(imgDataIn, x, y).red / patternDiv);
		var pix = getPixel(imgDataOut, x - patternWidth + shift * (document.getElementById("inverter").checked?-invert:invert), y);

		imgDataOut = setPixel(imgDataOut, x, y, pix.red, pix.green, pix.blue, pix.alpha);
	}

	return imgDataOut;
}
