
function getRectsFromImage(imageElement) {
  const canvasSize = {
    width: imageElement.naturalWidth,
    height: imageElement.naturalHeight,
  }

  const canvas =  document.createElement('canvas');
  const outputCanvas =  document.createElement('canvas');

  canvas.width = canvasSize.width
  canvas.height = canvasSize.height

  outputCanvas.width = canvasSize.width
  outputCanvas.height = canvasSize.height

  document.body.appendChild(canvas)
  document.body.appendChild(outputCanvas)

  const ctx = canvas.getContext('2d')

  

  ctx.drawImage(imageElement, 0, 0, canvasSize.width, canvasSize.height)
  const src = cv.imread(canvas)
  const dst = cv.Mat.zeros(src.rows, src.cols, cv.CV_8UC3)

  cv.cvtColor(src, src, cv.COLOR_BGR2GRAY, 0)
  cv.threshold(src, src, 60, 255, cv.THRESH_BINARY)

  const contours = new cv.MatVector()
  const hierarchy = new cv.Mat()
  cv.findContours(
    src,
    contours,
    hierarchy,
    cv.RETR_CCOMP,
    cv.CHAIN_APPROX_SIMPLE
  )

  const poly = new cv.MatVector()
  for (let i = 0; i < contours.size(); ++i) {
    const tmp = new cv.Mat()
    const cnt = contours.get(i)

    // You can try more different parameters
    cv.approxPolyDP(cnt, tmp, 3, true)
    poly.push_back(tmp)
    cnt.delete()
    tmp.delete()
  }

  const outRects = []

  // draw contours with random Scalar
  for (let i = 0; i < contours.size(); ++i) {
    const cnt = contours.get(i)
    let color = new cv.Scalar(
      Math.round(Math.random() * 255),
      Math.round(Math.random() * 255),
      Math.round(Math.random() * 255)
    )

    const rect = cv.boundingRect(cnt)

    if (cv.contourArea(cnt) > cv.arcLength(cnt, true)) {
      const point1 = new cv.Point(rect.x, rect.y)
      const point2 = new cv.Point(rect.x + rect.width, rect.y + rect.height)
      cv.rectangle(dst, point1, point2, color, 1, cv.LINE_AA, 0)

      outRects.push(rect)
    }

    cnt.delete()
  }

  cv.imshow(outputCanvas, dst)

  src.delete()
  dst.delete()
  contours.delete()
  hierarchy.delete()

  return outRects
}

export default getRectsFromImage