var patternDiv = 8;
var invert = -1;

var ctx = null;
var imgWidth = -1;
var imgHeight = -1;

window.onload = function() {
	document.getElementById("uploadimage").addEventListener("change", draw, false)
	ctx = document.getElementById("canvas").getContext("2d")
	ctx2 = document.getElementById("canvas2").getContext("2d")
}

function draw(ev) {
	ctx = document.getElementById("canvas").getContext("2d");
	img = new Image();
	f = document.getElementById("uploadimage").files[0];
	url = window.URL || window.webkitURL;
	src = url.createObjectURL(f);

	img.src = src;
	img.onload = function() {
		ctx.drawImage(img, 0, 0);
		url.revokeObjectURL(src);

		imgWidth = img.width;
		imgHeight = img.height;
	}
}

function getPixel(imgData, x, y) {
	return [
		imgData.data[((y*(imgData.width*4)) + (x*4)) + 0],
		imgData.data[((y*(imgData.width*4)) + (x*4)) + 1],
		imgData.data[((y*(imgData.width*4)) + (x*4)) + 2],
		imgData.data[((y*(imgData.width*4)) + (x*4)) + 3]
	]
}

function transform() {
	if(imgWidth == -1 || imgHeight == -1) {
		alert("Something is wrong with your image. Abort...");
		return;
	}

	var imgDataIn = ctx.getImageData(0, 0, imgWidth, imgHeight);
	var sourceHeight = imgDataIn.height;
	var sourceWidth = imgDataIn.width;

	var imgDataOut = ctx.createImageData(imgDataIn.width, imgDataIn.height);

	var patternWidth = imgDataIn.width / patternDiv;

	// iterate through all pixels
	for(var x = 0; x < sourceWidth; x++) {
		for(var y = 0; y < sourceHeight; y++) {
			var redCoord = ((sourceWidth * y) + x) * 4;
			var greenCoord = ((sourceWidth * y) + x) * 4 + 1;
			var blueCoord = ((sourceWidth * y) + x) * 4 + 2;
			var alphaCoord = ((sourceWidth * y) + x) * 4 + 3;

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
		}
	}

	ctx2.putImageData(imgDataOut, 0, 0);
}
