import cv from '@u4/opencv4nodejs';

async function preprocessImage(sourceImg) {
  const outImg = sourceImg.resize(sourceImg.rows, sourceImg.cols);

  // const hsv = outImg.cvtColor(cv.COLOR_BGR2HSV);

  const colorLower = new cv.Vec3(80, 80, 80);
  const colorUpper = new cv.Vec3(255, 255, 255);

  const rangeMask = outImg.inRange(colorLower, colorUpper);

  // const gray = outImg.cvtColor(cv.COLOR_BGR2HSV);

  // const size = new cv.Size(5, 5);
  // const blurred = rangeMask.gaussianBlur(size, 0);

  const thresh = rangeMask.threshold(150, 255, cv.THRESH_BINARY);

  return thresh;
}


async function getContour(sourceImg) {

  const contours = await getContours(sourceImg)

  if (contours.length) {
    return contours[0]
  }
  throw new Error('没有解析到合适的图像')
}

async function getContours(sourceImg) {
  const thresh = await preprocessImage(sourceImg);

  const contours = thresh.findContours(cv.RETR_LIST, cv.CHAIN_APPROX_SIMPLE);

  const outContours = [];

  contours.forEach((cnt) => {
    const rect = cnt.boundingRect();

    const minX = thresh.cols * 0.2;
    const maxX = thresh.cols - minX;

    const minY = thresh.rows * 0.16;
    const maxY = thresh.rows - minY;

    const tmp = cnt.approxPolyDPContour(5, true);

    const rows = tmp.getPoints().length;

    if (
      cnt.area > 3000 &&
      cnt.area < 10000 &&
      rect.x > minX &&
      rect.x < maxX &&
      rect.y > minY &&
      rect.y < maxY &&
      rows >= 3 &&
      rows <= 10
    ) {
      outContours.push(tmp);
    }
  });

  return outContours;
}

async function getPercentageX(imgPath) {
  const sourceImg = await cv.imreadAsync(imgPath);
  const theContour = await getContour(sourceImg);

  return theContour.boundingRect().x / sourceImg.cols;
}

export { getContour, getContours, getPercentageX };
