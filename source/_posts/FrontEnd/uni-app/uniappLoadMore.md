---
layout: post
title: uniapp 滚动加载(分页查询)封装
index_img: https://www.blogxj.cn/upload/2024/04/5c2c8a01cd9df41b9ea05b699002fb18-a57cb64527874d639a80971389bdc405.jpg
tags: ['Uniapp']
categories:
 - FrontEnd
---

# uni-app 滚动加载

### 封装继承组件

> 创建文件`/components/extends/PaginationList.vue`

```js
<template>
  <!-- 报错提示框 -->
  <u-modal v-model="showErrorTip" :mask-close-able="true" :content="tipContent"></u-modal>
</template>

<script>

export default {
  name: "PaginationList",
  data() {
    return {
      // 请求服务 必填
      service: null,
      // 数据内容
      listData: [],
      // 数据总数，我们系统是通过Header返回，可根据自己系统情况修改
      totalCount: null,
      loadText: {
        loadmore: '上拉显示更多',
        loading: '正在加载...',
        nomore: '没有更多数据了'
      },
      status: 'nomore',

      urlParam: {},
      isLoading: false,
      // 错误提示
      showErrorTip: false,
      tipContent: '',
    }
  },
  onLoad() {
    this.urlParam = {
      page: 0,
      size: 10
    }
  },
  methods: {
    loadData(page) {
		this.initExtraData();
      uni.showLoading({mask: true});
      this.isLoading = true;
      if(page){
         this.urlParam= Object.assign(this.urlParam, page)
      }else{
         this.urlParam= Object.assign(this.urlParam, {page:0})
      }
      // Tip 查询请求默认方法名请设置为query
	   this.service.query(this.urlParam).then((res) => {
         // #ifdef H5
           this.totalCount = Number(res.header['x-total-count']);
         // #endif
         // #ifdef APP-PLUS ||MP
           this.totalCount = Number(res.header['X-Total-Count']);
         // #endif
         if (res.statusCode === 200 && res.data && res.data.length > 0) {
			 if(this.urlParam.page===0){
				 this.listData = []
			 }
           if (this.listData.length === 0) {
             this.listData = res.data.map(item => Object.assign({}, item))
           } else {
             this.listData = [...this.listData, ...res.data]
           }
           if (this.totalCount === this.listData.length) {
             this.status = 'nomore';
           } else {
             this.status = 'loadmore';
           }
           uni.hideLoading();
           this.isLoading = false
         } else {
           this.$msg('未查询到数据');
           this.listData = [];
           uni.hideLoading();
           this.isLoading = false
         }
      }).catch(() => {
        this.$msg('数据请求失败');
        this.listData = [];
        uni.hideLoading();
        this.isLoading = false
      })
    },
    // 下拉加载更多
    loadmore() {
      if (this.totalCount === this.listData.length) {
        this.status = 'nomore';
      } else {
		  this.urlParam.page = this.urlParam.page+1;
        this.status = 'loading';
		  this.loadData({page:this.urlParam.page});
      }
    },
	 initExtraData() {}
  }

}
</script>

<style></style>
```

### 组件应用
```js
<template>
   <view class="wrapper">
      <scroll-view scroll-y="true" class="container" @scrolltolower="loadmore">
      </scroll-view>
   </view>
</template>

<script>
	import PaginationList from '@/components/extends/PaginationList.vue'
	import testService from "@/api/service/testService.js"
   export default {
	   extends: PaginationList,
      data() {
         // 必填
         service: testService
      },
      methods: {
         filterData() {
            this.urlParam = {
               page: 0,
               size: 999
            }
            // 可修改过滤条件再获取全部数据
            this.loadData()
         }
      }
   }
</script>

<style lang="scss" scoped>
   .wrapper {
      display: flex;
      flex-direction: column;
      height: 100%;
       .container {
         flex: 1;
         overflow: scroll;
      }
   }
</style>
```