---
layout: post
title: Effects in gsap
index_img: https://www.w3cplus.com/sites/default/files/blogs/2020/2007/greensock-beginner-1.png
tags: ['Animation', 'Library']
---

## 注册自定义动画
```js
class AComponent implements OnInit{
    gsapBtn: Signal<ElementRef | undefined> = viewChild('gsapBtn');

    constructor() {
        gsap.registerEffect({
          name: 'm-fade',
          effect: (target: Element, config: any) => {
            return gsap.to(target, { duration: config.duration, opacity: 0 })
          },
          defaults: { duration: 2 },
          // 设置extendTimeline可以将其作为方法直接插入到timeline中
          extendTimeline: true
        })
    }


  ngOnInit(): void {
    gsap.effects['m-fade'](this.gsapBtn()?.nativeElement);

    const tl = gsap.timeline();
    // extendTimeline: true
    tl['m-fade'](".box", { duration: 3 })
      ['m-fade'](".box2", { duration: 1 }, "+=2")
      .to(".box3", { x: 100 });

    //extendTimeline: false
    tl.add(
      gsap.effects['m-fade'](".box", { configProp: "value" }),
      "+=position"
    );
   }
}
```

## 批量注册自定义动画
```js
const gsapEffects = [
  { 
    id: "fadeSlideTo",  
    props: { opacity: 0.5, x: 300, yoyo: true, repeat: -1 }
  },
  { 
    id: "fadeSlideFrom", 
    animate: 'from',
    props: { opacity: 0.25, x: 300, yoyo: true, repeat: -1  }
  },
  { 
    id: "fadeSlideFromTo", 
    animate: 'fromTo', 
    props: { opacity: 0.1, x: 300}, 
    props2: { opacity: 1, x: 600, yoyo: true, repeat: -1  }
  }
];

gsapEffects.forEach(effect => {
  gsap.registerEffect({
    name: effect.id,
    defaults: { duration: 1 },
    extendTimeline: true,
    effect(targets, config) {
      if(effect.animate === 'from'){
        return gsap.from(targets, {...effect.props,...config })
      } 
      else if (effect.animate === 'fromTo'){ 
        return gsap.fromTo(targets, {...effect.props,...config }, {...effect.props2})
        }
      else {
        return gsap.to(targets, {...effect.props,...config })
      }
    }
  });
});



let tl = gsap.timeline();
tl.fadeSlideTo(".fadeSlideTo")
  .fadeSlideFrom(".fadeSlideFrom", 0)
  .fadeSlideFromTo(".fadeSlideFromTo", 0)
```