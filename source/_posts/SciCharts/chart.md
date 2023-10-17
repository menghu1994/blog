---
layout: post
title: SciCharts
tags: Library
---

# SciCharts

## SciCharts Type
- 线性图
[FastLineRenderableSeries](https://www.scichart.com/documentation/js/current/The%20Line%20Series%20Type.html)
- 柱状图
[FastColumnsRenderableSeries](https://www.scichart.com/documentation/js/current/webframe.html#The%20Column%20Series%20Type.html)
- 烛台
[FastCandlestickRenderableSeries](https://www.scichart.com/documentation/js/current/webframe.html#The%20Candlestick%20Series%20type.html)
- 山区图
[FastMountainRenderableSeries](https://www.scichart.com/documentation/js/current/webframe.html#The%20Mountain%20(Area)%20Series%20Type.html)
- 热度图
[FastUniformHeatmapRenderableSeries](https://www.scichart.com/documentation/js/current/webframe.html#The-Uniform-Heatmap-Chart-Type.html)
### How to use
```js
    // 根据ID创建SciChart实例
    const { sciChartSurface, wasmContext } = await SciChartSurface.create("scichart-root");
    // 创建X,Y轴
    const xAxis = new NumericAxis(wasmContext);
    const yAxis = new NumericAxis(wasmContext);
    sciChartSurface.xAxes.add(xAxis);
    sciChartSurface.yAxes.add(yAxis);
    const renderableSeries = new FastLineRenderableSeries(wasmContext);
    sciChartSurface.renderableSeries.add(renderableSeries);
```

## 修改器
- 拖动缩放
[RubberBandXyZoomModifier](https://www.scichart.com/documentation/js/current/webframe.html#RubberBandXyZoomModifier.html)
- 平移
[ZoomPanModifier](https://www.scichart.com/documentation/js/current/webframe.html#ZoomPanModifier.html)
- （双击）缩放
[ZoomExtentsModifier](https://www.scichart.com/documentation/js/current/webframe.html#ZoomExtentsModifier.html)
- 滚轮缩放
[MouseWheelZoomModifier](https://www.scichart.com/documentation/js/current/webframe.html#MouseWheelZoomModifier.html)

### How to use
```js
import {MouseWheelZoomModifier} from "scichart/Charting/ChartModifiers/MouseWheelZoomModifier";

const mouseWheelZoomModifier = new MouseWheelZoomModifier();
sciChartSurface.chartModifiers.add(mouseWheelZoomModifier);

// 禁用修改器
mouseWheelZoomModifier.isEnabled = false;
```

## 配置x,y轴名称
```js
// 声明SciChart类型,配置线名称和厚度
const lineSeries = new FastLineRenderableSeries(wasmContext, { stroke: "#4083B7", strokeThickness: 2 });
// 声明数据
const lineData = new XyDataSeries(wasmContext, { dataSeriesName: "X轴名称" });
// 定义数据
lineData = [1,2,3,4,5];
// 初始化
lineSeries.dataSeries = lineData
```

## Realtime updates
> RenderableSeries呈现数据，而DataSeries保存X、Y数据并管理更新
```js
 let phase = 0.0;    
    
 const updateDataFunc = () => {
     for(let i = 0; i < 1000; i++) {
         lineData.update(i, Math.sin(i * 0.1 + phase));
     }
     phase += 0.01;
     // Repeat at 60Hz
     setTimeout(updateDataFunc, 1/60);
 };
 updateDataFunc();
```


