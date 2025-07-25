(function(){
const script = document.createElement('script');
  script.src = 'https://unpkg.com/vue@3/dist/vue.global.js';
  script.async = true;

  script.onload = () => {
    window.Vue = Vue;
  };

  document.head.appendChild(script);
})()
