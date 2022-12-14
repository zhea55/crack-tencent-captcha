## 本项目旨在破解[腾讯的滑动验证码](https://007.qq.com/online.html)，使用了[OpenCV.js](https://docs.opencv.org/3.4/index.html)进行图像处理和解析

## 项目初衷是因为我经常看美剧，以前好用的[subfinder](https://github.com/ausaki/subfinder)现在用不了了，搜索不到字幕。所以我决定自己写一个搜索[subhd](https://subhd.tv/)字幕的命令行工具，这个网站下载字幕需要通过腾讯的滑动验证码


## 破解验证码的思路（两张图片，背景图和滑块图）
1. 对背景图进行图像处理（便于程序迭代每个像素点）
2. 使用opencv.js找出所有封闭轮廓的矩形集合
3. 使用opencv.js找出滑块图的矩形框，滑块图按理来说只能找出一个矩形
4. 把滑块图的矩形拿到所有封闭轮廓的矩形集合中，通过对比宽高比，和宽高之和的绝对值，找出与滑块图最相似的轮廓矩形
5. 计算鼠标需要移动的距离 = 最相似的轮廓矩形.x - 滑块图.x
6. 模拟鼠标拖拽动作


<img src="./demo/demo.png" alt="demo" />



[![GPLv3 license](https://img.shields.io/badge/License-GPLv3-blue.svg)](http://perso.crans.org/besson/LICENSE.html)