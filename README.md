## 本项目旨在破解[腾讯的滑动验证码](https://007.qq.com/online.html)，使用了[opencv](https://docs.opencv.org/3.4/index.html)进行图像处理和解析

## 破解验证码的思路（两张图片，背景图和滑块图）
1. 对背景图进行图像处理（便于程序迭代每个像素点）
2. 使用opencv找出所有封闭轮廓的矩形集合
3. 通过轮廓的线条数量和区域面积过滤出最符合的轮廓
4. 计算鼠标需要移动的距离 = 最相似的轮廓矩形.x - 滑块图.x
5. 模拟鼠标拖拽动作





输入图片：
<img src="./images/sample1.png" alt="sample1" />

结果：
<img src="./images/sample1-edge-contour.png" alt="sample1-edge-contour" />


[![GPLv3 license](https://img.shields.io/badge/License-GPLv3-blue.svg)](http://perso.crans.org/besson/LICENSE.html)
