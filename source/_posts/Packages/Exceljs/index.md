---
layout: post
title: Excel.js
tags: ['Exceljs']
---

# Exceljs

## 安装
```shell
npm install exceljs
# 下载到本地
npm install file-saver
```

## [基本概念](https://juejin.cn/post/7283311629197000739#heading-0)
### workbook
> `const workbook = new ExcelJS.Workbook()`创建工作簿(相当于一个excel文件)
```js
const workbook = new ExcelJS.Workbook()
workbook.creator = 'Me';
workbook.lastModifiedBy = 'Her';
workbook.created = new Date(1985, 8, 30);
workbook.modified = new Date();
workbook.lastPrinted = new Date(2016, 9, 27);
```
### worksheet
> 每个工作簿中的单表(sheet页)
```js
// 创建带有红色标签颜色的工作表
const sheet = workbook.addWorksheet('My Sheet', {properties:{tabColor:{argb:'FFC0000'}}});

// 创建一个隐藏了网格线的工作表
const sheet = workbook.addWorksheet('My Sheet', {views: [{showGridLines: false}]});

// 创建一个第一行和列冻结的工作表
const sheet = workbook.addWorksheet('My Sheet', {views:[{xSplit: 1, ySplit:1}]});

// 使用A4设置的页面设置设置创建新工作表 - 横向
const worksheet =  workbook.addWorksheet('My Sheet', {
  pageSetup:{paperSize: 9, orientation:'landscape'}
});

// 创建一个具有页眉页脚的工作表
const sheet = workbook.addWorksheet('My Sheet', {
  headerFooter:{firstHeader: "Hello Exceljs", firstFooter: "Hello World"}
});

// 创建一个冻结了第一行和第一列的工作表
const sheet = workbook.addWorksheet('My Sheet', {views:[{state: 'frozen', xSplit: 1, ySplit:1}]});

```
### columns 列
```js
// 添加列标题并定义列键和宽度
// 注意：这些列结构仅是构建工作簿的方便之处，除了列宽之外，它们不会完全保留。
worksheet.columns = [
  { header: 'Id', key: 'id', width: 10 },
  { header: 'Name', key: 'name', width: 32 },
  { header: 'D.O.B.', key: 'DOB', width: 10, outlineLevel: 1 }
];

// 通过键，字母和基于1的列号访问单个列
const idCol = worksheet.getColumn('id');
const nameCol = worksheet.getColumn('B');
const dobCol = worksheet.getColumn(3);

// 设置列属性

// 注意：将覆盖 C1 单元格值
dobCol.header = 'Date of Birth';

// 注意：这将覆盖 C1:C2 单元格值
dobCol.header = ['Date of Birth', 'A.K.A. D.O.B.'];

// 从现在开始，此列将以 “dob” 而不是 “DOB” 建立索引
dobCol.key = 'dob';

dobCol.width = 15;

// 如果需要，隐藏列
dobCol.hidden = true;

// 为列设置大纲级别
worksheet.getColumn(4).outlineLevel = 0;
worksheet.getColumn(5).outlineLevel = 1;

// 列支持一个只读字段，以指示基于 `OutlineLevel` 的折叠状态
expect(worksheet.getColumn(4).collapsed).to.equal(false);
expect(worksheet.getColumn(5).collapsed).to.equal(true);

// 遍历此列中的所有当前单元格
dobCol.eachCell(function(cell, rowNumber) {
  // ...
});

// 遍历此列中的所有当前单元格，包括空单元格
dobCol.eachCell({ includeEmpty: true }, function(cell, rowNumber) {
  // ...
});

// 添加一列新值
worksheet.getColumn(6).values = [1,2,3,4,5];

// 添加稀疏列值
worksheet.getColumn(7).values = [,,2,3,,5,,7,,,,11];

// 剪切一列或多列（右边的列向左移动）
// 如果定义了列属性，则会相应地对其进行切割或移动
// 已知问题：如果拼接导致任何合并的单元格移动，结果可能是不可预测的
worksheet.spliceColumns(3,2);

// 删除一列，再插入两列。
// 注意：第4列及以上的列将右移1列。
// 另外：如果工作表中的行数多于列插入项中的值，则行将仍然被插入，就好像值存在一样。
const newCol3Values = [1,2,3,4,5];
const newCol4Values = ['one', 'two', 'three', 'four', 'five'];
worksheet.spliceColumns(3, 1, newCol3Values, newCol4Values);

```
### row 行
```js
// 获取一个行对象。如果尚不存在，则将返回一个新的空对象
const row = worksheet.getRow(5);

// Get multiple row objects. If it doesn't already exist, new empty ones will be returned
const rows = worksheet.getRows(5, 2); // start, length (>0, else undefined is returned)

// 获取工作表中的最后一个可编辑行（如果没有，则为 `undefined`）
const row = worksheet.lastRow;

// 设置特定的行高
row.height = 42.5;

// 隐藏行
row.hidden = true;

// 为行设置大纲级别
worksheet.getRow(4).outlineLevel = 0;
worksheet.getRow(5).outlineLevel = 1;

// 行支持一个只读字段，以指示基于 `OutlineLevel` 的折叠状态
expect(worksheet.getRow(4).collapsed).to.equal(false);
expect(worksheet.getRow(5).collapsed).to.equal(true);


row.getCell(1).value = 5; // A5 的值设置为5
row.getCell('name').value = 'Zeb'; // B5 的值设置为 “Zeb” - 假设第2列仍按名称键入
row.getCell('C').value = new Date(); // C5 的值设置为当前时间

// 获取行并作为稀疏数组返回
// 注意：接口更改：worksheet.getRow(4) ==> worksheet.getRow(4).values
row = worksheet.getRow(4).values;
expect(row[5]).toEqual('Kyle');

// 通过连续数组分配行值（其中数组元素 0 具有值）
row.values = [1,2,3];
expect(row.getCell(1).value).toEqual(1);
expect(row.getCell(2).value).toEqual(2);
expect(row.getCell(3).value).toEqual(3);

// 通过稀疏数组分配行值（其中数组元素 0 为 `undefined`）
const values = []
values[5] = 7;
values[10] = 'Hello, World!';
row.values = values;
expect(row.getCell(1).value).toBeNull();
expect(row.getCell(5).value).toEqual(7);
expect(row.getCell(10).value).toEqual('Hello, World!');

// 使用列键按对象分配行值
row.values = {
  id: 13,
  name: 'Thing 1',
  dob: new Date()
};

// 在该行下方插入一个分页符
row.addPageBreak();

// 遍历工作表中具有值的所有行
worksheet.eachRow(function(row, rowNumber) {
  console.log('Row ' + rowNumber + ' = ' + JSON.stringify(row.values));
});

// 遍历工作表中的所有行（包括空行）
worksheet.eachRow({ includeEmpty: true }, function(row, rowNumber) {
  console.log('Row ' + rowNumber + ' = ' + JSON.stringify(row.values));
});

// 连续遍历所有非空单元格
row.eachCell(function(cell, colNumber) {
  console.log('Cell ' + colNumber + ' = ' + cell.value);
});

// 遍历一行中的所有单元格（包括空单元格）
row.eachCell({ includeEmpty: true }, function(cell, colNumber) {
  console.log('Cell ' + colNumber + ' = ' + cell.value);
});

// 提交给流一个完成的行
row.commit();

// 行尺寸
const rowSize = row.cellCount;
const numValues = row.actualCellCount;

```
添加行
```js
// Add a couple of Rows by key-value, after the last current row, using the column keys
worksheet.addRow({id: 1, name: 'John Doe', dob: new Date(1970,1,1)});
worksheet.addRow({id: 2, name: 'Jane Doe', dob: new Date(1965,1,7)});

// Add a row by contiguous Array (assign to columns A, B & C)
worksheet.addRow([3, 'Sam', new Date()]);

// Add a row by sparse Array (assign to columns A, E & I)
const rowValues = [];
rowValues[1] = 4;
rowValues[5] = 'Kyle';
rowValues[9] = new Date();
worksheet.addRow(rowValues);

// Add a row with inherited style
// This new row will have same style as last row
// And return as row object
const newRow = worksheet.addRow(rowValues, 'i');

// Add an array of rows
const rows = [
  [5,'Bob',new Date()], // row by array
  {id:6, name: 'Barbara', dob: new Date()}
];
// add new rows and return them as array of row objects
const newRows = worksheet.addRows(rows);

// Add an array of rows with inherited style
// These new rows will have same styles as last row
// and return them as array of row objects
const newRowsStyled = worksheet.addRows(rows, 'i');

```

## 导出
```js
import { saveAs } from 'file-saver';
import { Workbook } from 'exceljs';

onExportBasicExcel(){
    const workbook = new ExcelJs.Workbook();
    // 添加sheet
    const worksheet = workbook.addWorksheet('demo sheet');
    // 设置 sheet 的默认行高
    worksheet.properties.defaultRowHeight = 20;
    // 设置列
    worksheet.columns = [
      { header: 'Id', key: 'id', width: 10 },
      { header: 'Name', key: 'name', width: 32 },
      { header: 'D.O.B.', key: 'DOB', width: 10, outlineLevel: 1 }
    ];

    // 添加行
    let list = [
    {id:1,name:'test1',DOB:'11'},
    {id:2,name:'test2',DOB:'22'},
    {id:3,name:'test3',DOB:'33'}
    ]
    
    worksheet.addRows(list);
    // 导出excel
    saveWorkbook(workbook, 'simple-demo.xlsx');
}


// `saveWorkbook()`是自己封装的方法，接收 workbook 和文件名来下载 excel 到本地。
// 下载是使用 `file-saver`库。
saveWorkbook(workbook, fileName) {
  // 导出文件
  workbook.xlsx.writeBuffer().then(data => {
    const blob = new Blob([data], { type: '' });
    saveAs(blob, fileName);
  });
}

// ^4.4
saveWorkbook2(workbook, fileName) {
	workbook.xlsx.writeFile(fileName)
	.then(function () {
		console.log('已保存。');
	})
	.catch(function (error) {
	console.log('保存文件时出错: ', error);
	});
}
```