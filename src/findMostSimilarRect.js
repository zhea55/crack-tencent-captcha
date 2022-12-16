import getRectsFromImage from "./getRectsFromImage.js";

function drawRect(cv, rect, width, height) {
	const color = new cv.Scalar(
		Math.round(Math.random() * 255),
		Math.round(0),
		Math.round(0),
	);

	const canvas = document.createElement("canvas");
	canvas.width = width;
	canvas.height = height;

	const src = cv.imread(canvas);
	const dst = cv.Mat.zeros(src.rows, src.cols, cv.CV_8UC3);

	const point1 = new cv.Point(rect.x, rect.y);
	const point2 = new cv.Point(rect.x + rect.width, rect.y + rect.height);
	cv.rectangle(dst, point1, point2, color, 1, cv.LINE_AA, 0);

	cv.imshow(canvas, dst);

	dst.delete();

	document.body.appendChild(canvas);
}

function findMostSimilarRect(cv, sourceImg, inputImg) {
	const bgRects = getRectsFromImage(cv, sourceImg);
	const sliderRects = getRectsFromImage(cv, inputImg);

	const sliderRect = sliderRects[0];

	// console.log(bgRects)

	const mostSimilarRect = bgRects.find(
		(rect, i) =>
			Math.abs(
				rect.width + rect.height - (sliderRect.width + sliderRect.height),
			) < 30,
	);

	// console.log(mostSimilarRect, sliderRect)

	if (mostSimilarRect) {
		drawRect(cv, mostSimilarRect, sourceImg.width, sourceImg.height);

		return mostSimilarRect;
	}
	return null;
}

window.findMostSimilarRect = findMostSimilarRect;

export default findMostSimilarRect;
