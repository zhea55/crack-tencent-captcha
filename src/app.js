import { cv } from './opencv.js'
import getRectsFromImage from './getRectsFromImage.js'


const bgImg = document.getElementById('bgImg')
const sliderImg = document.getElementById('sliderImg')

function drawRect(rect, canvas, outputCanvas) {
  const color = new cv.Scalar(
    Math.round(Math.random() * 255),
    Math.round(Math.random() * 255),
    Math.round(Math.random() * 255)

  )

  const src = cv.imread(canvas)
  const dst = cv.Mat.zeros(src.rows, src.cols, cv.CV_8UC3)

  const point1 = new cv.Point(rect.x, rect.y)
  const point2 = new cv.Point(rect.x + rect.width, rect.y + rect.height)
  cv.rectangle(dst, point1, point2, color, 1, cv.LINE_AA, 0)

  cv.imshow(outputCanvas, dst)

  dst.delete()
}

const rect = findMostSimilarRect(bgImg, sliderImg)

function findMostSimilarRect(sourceImg, inputImg) {
  const bgRects = getRectsFromImage(sourceImg)
  const sliderRects = getRectsFromImage(inputImg)

  const sliderRect = sliderRects[0]

  // drawRect(sliderRect, sliderCanvas, sliderOutputCanvas)

  let theRect = null
  const sliderRatio = sliderRect.width / sliderRect.height

  const similarRects = []

  const sliderWidthAndHeight = sliderRect.width + sliderRect.height

  let mostSimilarRectIndex = -1
  let minAbs = Infinity
  bgRects.forEach((rect, i) => {
    const absValue = Math.abs(rect.width + rect.height - sliderWidthAndHeight)
    if (
      Math.abs(rect.width / rect.height - sliderRatio) < 0.1 &&
      absValue < minAbs
    ) {
      minAbs = absValue
      mostSimilarRectIndex = i
    }
  })

  if (mostSimilarRectIndex !== -1) {
    const mostSimilarRect = bgRects[mostSimilarRectIndex]
    // drawRect(mostSimilarRect, bgCanvas, bgOutputCanvas)

    return mostSimilarRect
  }
  return null
}


window.findMostSimilarRect = findMostSimilarRect