// used in applyMagic1
var patternDiv = 8;
var invert = -1;

// general declarations
var ctx = null;
var ctx2 = null;
var imgWidth = -1;
var imgHeight = -1;

window.onload = function() {
	document.getElementById("uploadimage").addEventListener("change", draw, false);
	ctx = document.getElementById("canvas").getContext("2d");
	ctx2 = document.getElementById("canvas2").getContext("2d");
}
