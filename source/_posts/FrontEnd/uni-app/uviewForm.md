---
layout: post
title: Uview表单验证
excerpt: Uview表单实现及验证
tags: ['Uniapp']
categories:
 - FrontEnd
---

# Uview表单验证

### Demo组件囊括常用的表单类型
```js
<template>
	<view class="shipment">
		<view class="scan-wrapper margin-b20">
			<u-form :model="lotForm" ref="uForm">
				<u-form-item label="物料号" prop="partNumber" ref="partNumber" label-position="left" :label-width="180">
					<u-input :clearable="false" height="40" v-model="lotForm.partNumber" maxlength=300 @blur="searchPart" @confirm="hideKeyBoard" />
					<u-icon name="search" size="40" @click="navigateToPart"></u-icon>
				</u-form-item>
				<u-form-item label="数量" prop="quantity" label-position="left" :label-width="180">
					<u-input :clearable="false" height="40" type="number" v-model="lotForm.quantity" />
				</u-form-item>
				<u-form-item label="收货类型" prop="type" ref="type" label-position="left" :label-width="180">
					<u-input :clearable="false" type="select" v-model="lotForm.type" @click="showTypeList = true"
						placeholder="请选择收货类型" />
				</u-form-item>
				<u-form-item label="序列化" label-position="left" :label-width="180" >
					<u-checkbox v-model="lotForm.serialize"></u-checkbox>
				</u-form-item>
			</u-form>
			<u-action-sheet :list="typeList" v-model="showTypeList" @click="selectType"></u-action-sheet>
		</view>
		<view class="part-details">
			// 详情信息
		</view>
		<view class="vs-flex vs-space-around">
			<button class="btn-default bg-color-base margin-r20" @click="reset">重置</button>
			<button class="btn-default bg-color-base" @click="onSubmit">创建批次</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				lotForm: {
					partNumber: '',
					quantity: '',
					type: '类型1',
					orderNumber: '',
					serialize: false
				},
				typeList: [{text: '类型1'}， {text: '类型2'}],
				// 验证规则， OnReady中调用setRules方法设置
				rules: {
					partNumber: [{
						required: true,
						message: '请输入物料号',
						trigger: ['change','blur'],
					}],
					quantity: [{
						pattern: /^([1-9]([0-9]+)?)$/g,
						message: '请输入正整数',
						trigger: ['change','blur']
					},{
						required: true,
						message: '请输入数量',
						trigger: 'blur'
					}],
					type: [{
						required: true,
						message: '请选择收货类型',
						trigger: ['change','blur']
					}]
				},
				showTypeList: false,
				doReflash: false,
			}
		},
		onShow() {
			// navigateToPart 此页面为页面A, 跳转到到页面B, 可以在页面B中修改上页的数据，在本页显示时重写验证表单信息
			var pages = getCurrentPages();
			var currPage = pages[pages.length - 1];
			let doReflash = currPage.$vm.doReflash?currPage.$vm.doReflash:false;
			if(doReflash){
				this.lotForm.partNumber = currPage.$vm.lotForm.partNumber;
				// 手动触发partNumber字段表单校验
				this.$refs.partNumber.onFieldChange();
			}
		},
		onReady() {
				this.$refs.uForm.setRules(this.rules);
		},
		methods: {
			// 在page.json中配置app-plus => titleNView => buttons 用于返回首页
			onNavigationBarButtonTap: function(e) {
			  uni.switchTab({
			    url: '/pages/home/home'
			  })
			},
			searchPart(partNumber) {
				// 请求发送请求获取信息
			},
			navigateToPart() {
				uni.navigateTo({
					url: "../part"
				})
			},
			selectType(index) {
				this.lotForm.type = this.typeList[index].text;
			},
			onSubmit() {
				this.$refs.uForm.validate(valid => {
					if (valid) {
						console.log('通过验证');
						// 提交表单
					} else {
						console.log('验证失败');
					}
				});
			},
			reset() {
				this.lotForm.serialize = false;
				this.$refs.uForm.resetFields();
				this.lotForm.type = "类型1";
			},
			hideKeyBoard() {
				uni.hideKeyboard()
			}
		}
	}
</script>

<style lang="scss">
	// 页面有一些样式是通用样式，在公共样式文件中，具体请搜索'uniapp公共样式'
	.shipment {
		display: flex;
		flex-direction: column;
		height: 100%;
		padding: 20rpx;

		.scan-wrapper {
			flex-shrink: 0;
			width: 100%;
			background-color: #fff;
			border-radius: 8px;
			padding: 0 20rpx;

			.scan {
				margin-right: 16rpx;
			}

			.packTitle {
				font-weight: 800;
				font-size: 30px;
			}
		}
		
		.part-details {
			flex: 1;
			overflow: scroll;
		}

		.scroll-wrapper {
			flex: 1;
			overflow: scroll;

			.box-scroll {
				height: 100%;
			}
		}
	}
</style>

```