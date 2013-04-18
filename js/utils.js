/*
	Draw uploaded images
*/
function draw(ev) {
	ctx = document.getElementById("canvas").getContext("2d");
	img = new Image();
	f = document.getElementById("uploadimage").files[0];
	url = window.URL || window.webkitURL;
	src = url.createObjectURL(f);

	img.src = src;
	img.onload = function() {
		ctx.clearRect(0, 0, document.getElementById("canvas").width, document.getElementById("canvas").height);
		ctx.drawImage(img, 0, 0);
		url.revokeObjectURL(src);

		imgWidth = img.width;
		imgHeight = img.height;
	}
}

/*
	Returns pixel ("rgba") at position x, y
*/
function getPixel(imgData, x, y) {
	return {
		"red":		imgData.data[((y*(imgData.width*4)) + (x*4)) + 0],
		"green":	imgData.data[((y*(imgData.width*4)) + (x*4)) + 1],
		"blue":		imgData.data[((y*(imgData.width*4)) + (x*4)) + 2],
		"alpha":	imgData.data[((y*(imgData.width*4)) + (x*4)) + 3]
	}
}
/*
	Sets data for pixel at given position
*/
function setPixel(imgData, x, y, r, g, b, a) {
	imgData.data[((imgData.width * y) + x) * 4 + 0] = r;
	imgData.data[((imgData.width * y) + x) * 4 + 1] = g;
	imgData.data[((imgData.width * y) + x) * 4 + 2] = b;
	imgData.data[((imgData.width * y) + x) * 4 + 3] = a;

	return imgData;
}

/*
	Loads image data and iterates through all pixels
*/
function transform() {
	if(imgWidth == -1 || imgHeight == -1) {
		alert("Something is wrong with your image. Abort...");
		return;
	}

	ctx2.clearRect(0, 0, document.getElementById("canvas2").width, document.getElementById("canvas2").height);

	// load image
	var imgDataIn = ctx.getImageData(0, 0, imgWidth, imgHeight);

	// create output image
	var imgDataOut = ctx.createImageData(imgDataIn.width, imgDataIn.height);

	// iterate through all pixels
	for(var x = 0; x < imgDataIn.width; x++) {
		for(var y = 0; y < imgDataIn.height; y++) {
			imgDataOut = applyMagic1(imgDataIn, imgDataOut, x, y);
		}
	}

	// draw output image
	ctx2.putImageData(imgDataOut, 0, 0);
}
