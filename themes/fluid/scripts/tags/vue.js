/* global hexo */

'use strict';

const vue = (args, content) => {
  return `<div class="vue-component">${content}</div>`;
};

/*
  {% vue %}
  text
  {% endvue  %}
 */
hexo.extend.tag.register('vue', vue, {ends: true});
