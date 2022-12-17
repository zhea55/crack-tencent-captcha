import cv from '@u4/opencv4nodejs';
import { getContour, getPercentageX } from './index.js';
import { parse, extname, join } from 'path';

function getOutputFileName(imagePath, outputDir, imageType) {
  const sampleFileName = parse(imagePath).name;
  const sampleFileExt = extname(imagePath);
  return `${join(outputDir)}${sampleFileName}-${imageType}${sampleFileExt}`;
}

async function main() {
  try {
    const SAMPLE_IMG_PATH = 'images/sample/sample7.png';
    const OUTPUT_DIR = 'images/results/';

    const sourceImg = await cv.imreadAsync(SAMPLE_IMG_PATH);
    
    const theContour = await getContour(sourceImg);

    const color = new cv.Vec3(
      Math.round(Math.random() * 255),
      Math.round(Math.random() * 255),
      Math.round(Math.random() * 255)
    );

    const tmp = theContour.approxPolyDP(5, true);

    const edgeContoursImg = new cv.Mat(
      sourceImg.rows,
      sourceImg.cols,
      cv.CV_8UC3
    );
    edgeContoursImg.drawContours([tmp], -1, color, {
      thickness: 1,
      maxLevel: 0
    });

    await cv.imwriteAsync(
      getOutputFileName(SAMPLE_IMG_PATH, OUTPUT_DIR, 'edge-contour'),
      edgeContoursImg
    );

    console.log(await getPercentageX(SAMPLE_IMG_PATH));
  } catch (error) {
    console.error(error);
  }
}

main();
