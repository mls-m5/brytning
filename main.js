"use strict";


var canvas = document.getElementById("canvas");
var angleDiv1 = document.getElementById("angle1");
var angleDiv2 = document.getElementById("angle2");

var width = canvas.width;
var height = canvas.height;

var ctx = canvas.getContext("2d");

ctx.strokeStyle = "yellow";


function drawLine(x1, y1, x2, y2) {
	ctx.beginPath();
	ctx.moveTo(x1, y1);
	ctx.lineTo(x2, y2);
	ctx.stroke();
}


var mx = width / 2;
var my = height / 2;

ctx.lineWidth = 3;


function drawRays(angle, n1, n2) {
	ctx.fillStyle = "black";
	ctx.fillRect(0, 0, width, my);
	ctx.fillStyle = "blue";
	ctx.fillRect(0, my, width, height);


	//console.log(angle);
	let l = 300;
	let sin = Math.sin;
	let cos = Math.cos;
	let s1 = sin(angle);
	let c1 = cos(angle);

	var angle2 = Math.asin(n1 / n2 * sin(angle));

	//https://en.wikipedia.org/wiki/Fresnel_equations
	var t;
	if (n1 > n2) {
		t = Math.abs(n2 * cos(angle2) / n2 / cos(angle));	
	}
	else {
		t = Math.abs(n2 * cos(angle) / n2 / cos(angle2));
	}
	var r = 1 - t;
	//console.log(t);

	ctx.strokeStyle = "white";
	drawLine(mx, my, mx + l * sin(angle) ,my + l * cos(angle));

	ctx.strokeStyle = "rgba(255,255,255," + r + ")";
	drawLine(mx, my, mx - l * sin(angle) ,my + l * cos(angle));

	ctx.strokeStyle = "rgba(255,255,255," + t + ")";
	drawLine(mx, my, mx - l * sin(angle2) ,my + l * cos(angle2) * Math.sign(-c1));

	angleDiv1.innerText = Math.round(Math.abs(angle) / Math.PI * 180) + "°";
	angleDiv2.innerText = Math.round(Math.abs(angle2) / Math.PI * 180) + "°";
}

drawRays();


canvas.addEventListener("mousemove", function(event) {
	let x = event.clientX;
	let y = event.clientY;
	let angle = Math.atan2(x - mx, y - my);

	let n1 = 1;
	let n2 = 1.3333;
	if (y > my) {
		drawRays(angle, n2, n1);
	}
	else if (y < my) {
		drawRays(angle, n1, n2);
	}
});