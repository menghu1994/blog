---
layout: post
title: 前端主题切换
index_txt: Gist
tags: ['Gist', 'FrontEnd']
---

## 主题切换
> 通过切换根元素css变量来切换主题色

```js
function changeTheme() {
  document.body.classList.toggle('light-mode');
}
```

### 添加切换主题动画
```js
function changeThemeWithAnimation = (e: any) {
  const x = e.clientX;
  const y = e.clientY;
  const endRadius = Math.hypot(
    Math.max(x, innerWidth - x),
    Math.max(y, innerHeight - y)
  );

  let isDark: boolean;

  const transition = document.startViewTransition(() => {
    const root = document.documentElement;
    isDark = root.classList.contains('dark');
    root.classList.remove(isDark ? 'dark' : 'light-mode');
    root.classList.add(isDark ? 'light-mode' : 'dark');
  });

  transition.ready.then(() => {
    const clipPath = [
      `circle(0px at ${x}px ${y}px)`,
      `circle(${endRadius}px at ${x}px ${y}px)`,
    ];
    document.documentElement.animate(
      {
        clipPath: isDark ? [...clipPath].reverse() : clipPath,
      },
      {
        duration: 500,
        easing: 'ease-in',
        pseudoElement: isDark
          ? '::view-transition-old(root)'
          : '::view-transition-new(root)',
      }
    );
  });
}
```

```css
::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
}

/* 进入dark模式和退出dark模式时，两个图像的位置顺序正好相反 */
.dark::view-transition-old(root) {
  z-index: 1;
}

.dark::view-transition-new(root) {
  z-index: 999;
}

::view-transition-old(root) {
  z-index: 999;
}

::view-transition-new(root) {
  z-index: 1;
}
```