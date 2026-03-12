---
layout: post
title: 大文件上传
index_txt: Gist
tags: ['Gist']
---

# 上传组件
## 主要功能
 - ⼤⽂件⽀持切⽚上传
 - ⽀持断点续传
 - ⽀持上传/切⽚进度和暂停上传
 - ⽀持秒传
 - ⽀持上传失败重试
 - ⽀持进度和上传速度的展示（速度待定）
 - 请求数控制

## ⽂件拆分
 - ⽀持断点续传
 - 提升上传速度

```js
function createFileChunks(file, piece = 5 * 1024 * 1024) {
  // ⽂件总⼤⼩
  const totalSize = file.size

  // 开始字节
  let start = 0

  // 结束字节
  let end = start + piece

  const chunks = []

  while (start < totalSize) {
    // 对⽂件进⾏切⽚
    let blob = file.slice(start, end)

    chunks.push(blob)
    start = end
    end = start + piece
  }

  return chunks
}
```

## 服务端-合并分⽚
+ 何时合并
 - 服务端⽅案：每个切⽚上传时，携带最⼤分⽚数，服务端根据这个信息，判断是否合并
 - 前端⽅案：额外发送请求，通知服务端进⾏切⽚合并
+ 如何合并
 - node 通过 readStream / writeStream

## 请求⽅法封装

```js
function request({url, method = 'post', data, headers = {}, onProgress = e => e}) {
  return new Promise((resolve) => {
    const xhr = new XMLHttpRequest()

    xhr.upload.onprogress = onProgress
    xhr.open(method, url)

    // 处理请求参数
    Object.keys(headers).forEach(key => {
      xhr.setRequestHeader(key, headers[key])
    })

    xhr.send(data)

    xhr.onload = (e) => {
      resolve({
        data: e.target.response
      })
    }
  })
}
```

上传切⽚
```js
function uploadFileChunks(fileChunks = []) {
  const requestList = fileChunks.map(({chunk, hash, index}) => {
    const fd = new FormData()

    fd.append('chunk', chunk)
    fd.append('hash', hash)
    fd.append('fileName', file.name)

    return request({
      url: 'http://localhost:8080/upload', data: fd, onProgress:
        createProgressHandler(chunk)
    })
  })

  // 并发请求切⽚
  await Promise.all(requestList)
}

function mergeToFile() {
  return request({
    url: 'http://localhost:8080/merge',
    headers: {
      'content-type': 'application/json',
    },
    data: JSON.stringify({
      fileName: file.name,
      size: 5 * 1024 * 1024
    })
  })
}

const fileChunks = createFileChunks(file).map((chunk, index) => {
  return {
    chunk,
    hash: file.fileName + '_' + index
  }
})
// 上传⽂件分⽚
await uploadFileChunks(fileChunks)
// 分⽚完成后，合并成⽂件
await mergeToFile()
```

## 上传进度
```js
// 创建⽂件分⽚进度函数
function createProgressHandler(chunk) {
  return e => {
    chunk.percentage = parseInt(String(e.loaded / e.total * 100))
  }
}
// 更新⽂件上传进度
function updateFilePercentage(file, fileChunks){
  const loaded = fileChunks.map(({ chunk }) => chunk.size & chunk.percentage).reduce(acc, cur) => (acc + cur)
  return parseInt((loaded / file.size).toFixed(2))
}

```

## 断点续传
+ 原理：记录已上传的分⽚
+ ⽅案
 - 前端⽅案：前端在 localStorage 中保存已上传记录，缺点：⽤户更换浏览器，已上传记录会丢失
 - 服务端⽅案：每次上传前，调⽤后端接⼝获取已上传记录
+ 通过⽂件/切⽚ hash 来记录上传记录
 - ⽣成 hash，利⽤ spark-md5 库
 - 针对⼤⽂件，hash 的计算，⾮常耗时间，容易阻塞 UI 线程，导致⻚⾯卡顿，⽅案：在 web-worker 线程中⽣成

## 实现
```js
// ⼦线程 getFileMd5.js
self.importScripts('./spark-md5.min.js')
// ⽣成⽂件 md5
self.onmessage = (e) => {
  const {fileChunks} = e.data
  const spark = new self.SparkMD5.ArrayBuffer()
  let percentage = 0
  let count = 0

  const loadNext = index => {
    const reader = new FileReader()
    reader.readAsArrayBuffer(fileChunks[index].chunk)
    reader.onload = e => {
      count++
      spark.append(e.target.result)

      // 所有的分⽚⽂件都读取完成
      if (count === fileChunks.length) {
        self.postMessage({
          s
          percentage: 100,
          hash: spark.end()
        })
        self.close()
      } else {
        percentage += 100 / fileChunks.length

        // 通过 postMessage 通知主线程更新 hash 计算进度
        self.postMessage({
          percentage
        })

        // 递归计算下⼀个分⽚
        loadNext(count)
      }
    }
  }

  loadNext(0)
}

// 主线程
function calcFileMd5(fileChunks) {
  return new Promise(resovle => {
    this.worker = new Worker('./getFileMd5.js')
    this.worker.postMessage({fileChunks})
    this.worker.onmessage = e => {
      const {percentage, hash} = e.data

      this.hashPercentage = percentage

      if (hash) {
        resolve(hash)
      }
    }
  })
}

async function uploadFileChunks(fileChunks = []) {
  const fileHash = await calcFileMd5(fileChunks)

  const requestList = fileChunks.map(({chunk, index}) => {
    const fd = new FormData()

    fd.append('fileHash', fileHash)
    fd.append('chunk', chunk)
    fd.append('hash', fileHash + '_' + index)
    fd.append('fileName', file.name)

    return request({
      url: 'http://localhost:8080/upload', data: fd, onProgress:
        createProgressHandler(chunk)
    })
  })

  // 并发请求切⽚
  await Promise.all(requestList)
}
```


## ⽂件秒传
 + 原理：通过⽂件 md5 判断⽂件是否已存在，如果存在，直接把上传状态改成已上传
 + 实现：

```js
async function fileExist(filename, fileHash) {
  const {data} = await this.request({
    url: 'http://localhost:8080/fileExist',
    headers: {
      'content-type': 'appliation/json'
    },
    data: JSON.stringify({
      filename,
      fileHash
    })
  })
  // { isFileExist }
  return JSON.parse(data)
}

async function uploadFileChunks(fileChunks = []) {
  const fileHash = await calcFileMd5(fileChunks)
  const {isFileExist} = await fileExist(file.name, fileHash)

  if (isFileExist) {
    message.success('⽂件已秒传')
    return
  }

  const requestList = fileChunks.map(({chunk, index}) => {
    const fd = new FormData()

    fd.append('fileHash', fileHash)
    fd.append('chunk', chunk)
    fd.append('hash', fileHash + '_' + index)
    fd.append('fileName', file.name)

    return request({
      url: 'http://localhost:8080/upload', data: fd, onProgress:
        createProgressHandler(chunk)
    })
  })

  // 并发请求切⽚
  await Promise.all(requestList)
}

```

## 暂停上传
+ 原理：记录分⽚的 xhr 对象，使⽤ XMLHttpRequest 的 abort ⽅法，取消 xhr 请求的上传

```js
function request({
                   url, method = 'post', data, headers = {}, onProgress = e => e,
                   requestList = []
                 }) {
  return new Promise((resolve) => {
    const xhr = new XMLHttpRequest()

    xhr.upload.onprogress = onProgress
    xhr.open(method, url)

    // 处理请求参数
    Object.keys(headers).forEach(key => {
      xhr.setRequestHeader(key, headers[key])
    })

    xhr.send(data)
    xhr.onload = (e) => {
      resolve({
        data: e.target.response
      })

      // 将上传成功的 xhr 从 requestList 中删除
      if (requestList) {
        const xhrIndex = requestList.findIndex(item => item === xhr)

        requestList.splice(xhrIndex, 1)
      }
    }

    // 保存当前的 xhr 对象
    requestList.push(xhr)
  })
}

// 处理暂停
function handlePause() {
  this.requestList.forEach(xhr => xhr.abort())

  this.requestList = []
}
```

## 恢复上传
+ 原理
 - 服务端校验分⽚是否已存在，已存在⽆需上传
 - 服务端端返回已上传到的分⽚数据给前端
+ 实现
```js
async function uploadFileChunks(fileChunks = []) {
  const fileHash = await calcFileMd5(fileChunks)
  const {isFileExist, uploadedList = []} = await fileExist(file.name, fileHash)

  if (isFileExist) {
    message.success('⽂件已秒传')

    return
  }

  let requestList = fileChunks.map(({chunk, index}) => {
    const fd = new FormData()
    const chunkHash = fileHash + '_' + index
    const hasUploaded = uploadedList.includes(chunkHash)

    fd.append('fileHash', fileHash)
    fd.append('chunk', chunk)
    fd.append('hash', chunkHash)
    fd.append('fileName', file.name)

    // 记录 chunk 的上传进度，如果在已上传列表，进度就是 100%
    chunk.percentage = hasUploaded ? '100' : 0
    const rest = {}

    // 切⽚已上传
    if (!hasUploaded) {
      rest.onProgress = createProgressHandler(chunk)
    }

    return request({url: 'http://localhost:8080/upload', data: fd, ...rest})
  })

  // 过滤已上传切⽚请求
  requestList = requestList.filter(({hash}) => !uploadedList.includes(hash))

  // 并发请求切⽚
  await Promise.all(requestList)

  // 已上传切⽚数量 + 本次上传的切⽚数量 = 所有切⽚数量时
  // 分⽚完成后，合并成⽂件
  if (uploadedList.length + requestList.length === fileChunks.length) {
    await mergeToFile()
  }
}

async function fileExist(filename, fileHash) {
  const {data} = await this.request({
    url: 'http://localhost:8080/fileExist',
    headers: {
      'content-type': 'appliation/json'
    },
    data: JSON.stringify({
      filename,
      fileHash
    })
  })

  // { isFileExist, uploadedList = [] }
  return JSON.parse(data)
}

// 恢复上传
async function handleResume() {
  await uploadFileChunks(fileChunks)
}
```

## 控制并发请求数
+ 实现
```js
function sendRequest(requestList, limit = 6, callback = () => {
}) {
  const len = requestList.length
  const index = 0
  const completedRequestCount = 0

  return new Promise(resolve => {
    const start = async () => {
      while (index++ < len && limit > 0) {
        // 请求数被占⽤，限制减1
        limit--

        try {
          requestList[index].then((res) => {
            // 请求结束后，释放请求数，限制加1
            limit++
            completedRequestCount++

            // 请求全部处理完成
            if (completedRequestCount === len) {
              resolve()

              // 执⾏回调
              callback()
            } else {
              start()
            }
          })
        } catch (err) {
          // todo
        }
      }
    }

    start()
  })
}

async function uploadFileChunks(fileChunks = []) {
  const fileHash = await calcFileMd5(fileChunks)
  const {isFileExist, uploadedList = []} = await fileExist(file.name, fileHash)

  if (isFileExist) {
    message.success('⽂件已秒传')

    return
  }

  let requestList = fileChunks.map(({chunk, index}) => {
    const fd = new FormData()
    const chunkHash = fileHash + '_' + index
    const hasUploaded = uploadedList.includes(chunkHash)

    fd.append('fileHash', fileHash)
    fd.append('chunk', chunk)
    fd.append('hash', chunkHash)
    fd.append('fileName', file.name)

    // 记录 chunk 的上传进度，如果在已上传列表，进度就是 100%
    chunk.percentage = hasUploaded ? '100' : 0
    const rest = {}

    // 切⽚已上传
    if (!hasUploaded) {
      rest.onProgress = createProgressHandler(chunk)
    }

    return request({url: 'http://localhost:8080/upload', data: fd, ...rest})
  })

  // 过滤已上传切⽚请求
  requestList = requestList.filter(({hash}) => !uploadedList.includes(hash))

  // 并发请求切⽚，修改点
  await sendRequest(requestList)

  // 已上传切⽚数量 + 本次上传的切⽚数量 = 所有切⽚数量时
  // 分⽚完成后，合并成⽂件
  if (uploadedList.length + requestList.length === fileChunks.length) {
    await mergeToFile()
  }
}
```

## 重试请求
+ 实现
```js
function sendRequest(requestList, limit = 6, retryLimit = 3, callback = () => {
}) {
  const len = requestList.length
  const completedRequestCount = 0
  const retry = {}

  return new Promise((resolve, reject) => {
    const start = async () => {
      while (completedRequestCount < len && limit > 0) {
        // 请求数被占⽤，限制减1
        limit--

        // State.wait 是分⽚请求的初始状态，在处理 requestList 是需要默认带上
        const index = requestList.findIndex(item => [State.error,
          State.wait].includes(item.status))

        const currentRequest = requestList[index]

        // 更新分⽚请求的状态为上传中
        currentRequest.status = State.uploading

        try {
          currentRequest.then((res) => {
            // 请求结束后，释放请求数，限制加1
            limit++
            completedRequestCount++

            // 请求完成后，把重试记录删除掉
            delete retry[index]

            currentRequest.status = State.done

            if (completedRequestCount === len) {
              resolve()

              callback()
            } else {
              start()
            }
          })
        } catch (err) {
          currentRequest.status = State.error

          retry[index] = (retry[index] || 0)++

          // 超过重试次数，直接 reject
          if (retry[index] >= retryLimit) {
            return reject()
          }

          limit++

          // 开始重试
          start()
        }
      }
    }
    start()
  })
}
```

## 浏览器空闲时间段计算⽂件 hash
+ 原理：window.requestIdleCallback
+ 实现
```js
function calcFileMd5ByRequestIdle(fileChunks = []) {
  return new Promise(resolve => {
    const spark = new SparkMD5.ArrayBuffer()
    let count = 0

    const appendToSpark = async chunk => {
      return new Promise(resolve => {
        const reader = new FileReader()
        reader.readAsArrayBuffer(file)
        reader.onload = e => {
          spark.append(e.target.result)

          resolve()
        }
      })
    }

    const task = async deadline => {
      // 当前帧有空闲，并且还存在任务
      while (count < fileChunks.length && deadline.timeRemaining() > 0) {
        await appendToSpark(fileChunks[count])

        count++

        if (count === fileChunks.length) {
          resolve(spark.end())
        }
      }

      window.requestIdleCallback(task)
    }

    window.requestIdleCallback(task)
  })
}
```