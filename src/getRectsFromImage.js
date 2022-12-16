function getRectsFromImage(cv, imageElement) {
	const canvasSize = {
		width: imageElement.width,
		height: imageElement.height,
	};

	const canvas = document.createElement("canvas");
	const outputCanvas = document.createElement("canvas");

	canvas.width = canvasSize.width;
	canvas.height = canvasSize.height;

	outputCanvas.width = canvasSize.width;
	outputCanvas.height = canvasSize.height;

	document.body.appendChild(canvas);
	document.body.appendChild(outputCanvas);

	const ctx = canvas.getContext("2d");

	ctx.drawImage(imageElement, 0, 0, canvasSize.width, canvasSize.height);
	const src = cv.imread(canvas);
	const dst = cv.Mat.zeros(src.rows, src.cols, cv.CV_8UC3);

	cv.cvtColor(src, src, cv.COLOR_BGR2GRAY, 0);
	cv.threshold(src, src, 60, 255, cv.THRESH_BINARY);

	const contours = new cv.MatVector();
	const hierarchy = new cv.Mat();
	cv.findContours(
		src,
		contours,
		hierarchy,
		cv.RETR_TREE,
		cv.CHAIN_APPROX_SIMPLE,
	);

	const poly = new cv.MatVector();
	for (let i = 0; i < contours.size(); ++i) {
		const tmp = new cv.Mat();
		const cnt = contours.get(i);

		// You can try more different parameters
		cv.approxPolyDP(cnt, tmp, 0.05 * cv.arcLength(cnt, true), true);

		const area = cv.contourArea(tmp);
		if (area > 400 && tmp.rows >= 3 && tmp.rows <= 10) {
			const rect = cv.boundingRect(cnt);

			console.log({ ...rect, rows: tmp.rows });
		}

		poly.push_back(tmp);
		cnt.delete();
		tmp.delete();

		let color = new cv.Scalar(
			Math.round(Math.random() * 255),
			Math.round(Math.random() * 255),
			Math.round(Math.random() * 255),
		);
		cv.drawContours(dst, poly, i, color, 1, 8, hierarchy, 0);
	}

	const outRects = [];

	// draw contours with random Scalar
	for (let i = 0; i < contours.size(); ++i) {
		const cnt = contours.get(i);

		const rect = cv.boundingRect(cnt);

		if (cv.contourArea(cnt) > cv.arcLength(cnt, true)) {
			const area = cv.contourArea(cnt);

			if (area > 400) {
				// if(rect.width === 118) {
				//   console.log(cnt.rows + '====')
				// }

				outRects.push({ ...rect, area });
			}
			// const point1 = new cv.Point(rect.x, rect.y)
			// const point2 = new cv.Point(rect.x + rect.width, rect.y + rect.height)
			// cv.rectangle(dst, point1, point2, color, 1, cv.LINE_AA, 0)
		}

		// cnt.delete()
	}

	cv.imshow(outputCanvas, dst);

	src.delete();
	dst.delete();
	contours.delete();
	hierarchy.delete();

	outRects.sort((a, b) => b.area - a.area);

	return outRects;
}

export default getRectsFromImage;
