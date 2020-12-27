![npm version](https://img.shields.io/badge/npm-6.14.5-informational)
![element-ui version](https://img.shields.io/badge/element--ui-2.13.2-ff69b4)
![vue version](https://img.shields.io/badge/vue-2.6.12-blueviolet)

# v-element-scrollbar
从element-ui分离出来的scrollbar

## Install
```
$npm install v-element-scrollbar
```
## 使用

```
// main.js
import Vue from 'vue'
import vElementScrollbar from 'v-element-scrollbar'
Vue use(vElementScrollbar)
// **.vue
<template>
    <div>
        <v-element-scrollbar>
            <div>内容</div>
        </v-element-scrollbar>
    </div>
</template> 
```
## Props
|  prop   | type | describe | default |
|  ----  | ----  | ---- | ---- |
| native  | boolean | 是否使用原生滚动 | false |
| wrapStyle | object | el-scrollbar__wrap元素的行内样式 | {} |
| wrapClass | object | el-scrollbar__wrap额外的className | {} |
| viewStyle | object | el-scrollbar__view元素的行内样式 | {} |
| viewClass | object | el-scrollbar__view额外的className | {} |
| noresize | boolean | 不根据container的尺寸变化而变化 | false |
| direction | string | `vertical | horizontal | both` 设置滚动方向 | vertical |
| tag | string | 实现view元素的HTML标签 | div |



