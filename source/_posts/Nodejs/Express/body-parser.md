---
title: body-parser
description: Request 格式转化
author: Luffy
created: 2023-07-08
modified: 2023-07-08
---

# body-parser

## 
```js
const express = require('express')
const app = express()
const jsonParser = bodyParser.json()
const urlencodedParser = bodyParser.urlencoded({ extended: false })

app.post('/',jsonParser, (req, res) => {
    
})
```
