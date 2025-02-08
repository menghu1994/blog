---
layout: post
title: Mongoose
tags: ['mongodb']
---

### 
```typescript
import { Schema } from 'mongoose';
import mongoose from 'mongoose';

// create schema
const blogSchema = new Schema({ name: String, type: String }, {
    // add shcema method
    methods: {
        // 不要使用`() => {}`,会影响this绑定
        findSimilarTypes(cb) {
            return mongoose.model('Blog').find({ type: this.type }, cb);
        }
    }
});
// Add schema method with another way
blogSchema.methods.findSimilarTypes = function(cb) {
    return  mongoose.model('Blog').find({ type: this.type }, cb);
}
// create model
const Blog = mongoose.model('Blog', blogSchema);
// save model in mongodb
// `_id` 创建model会自动添加_id字段
const bo = new Blog();
await bo.save()
```
