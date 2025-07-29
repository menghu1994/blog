---
layout: page
title: 精选网站
---



<!-- {% vue %} -->
<div id="apple"><span v-text="name"></span></div>
<script >
	const app = Vue.createApp({
	  setup() {
	    return {
	    	name: 'test Name'
	    }
	  }
	})
	app.mount('#apple');
	console.log(app);
</script>
<!-- {% endvue %} -->