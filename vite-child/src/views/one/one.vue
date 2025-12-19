<template>
  <div class="text">
    <button class="btn">按钮</button>
    浮动元素是如何定位的正如我们前面提到的那样，当一个元素浮动之后，它会被移出正常的文档流，然后向左或者向右平移，一直平移直到碰到了所处的容器的边框，或者碰到另外一个浮动的元素。
  </div>
</template>
<script>
import { defineComponent } from "vue"

export default defineComponent({
  name: 'one',
  setup () {
  }
})
</script>
<style>
.text {
  width: 300px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 25px;
}
.btn {
  float: right;
  clear: both;
  /*其他装饰样式*/
}
.text::before {
  content: "";
  float: right;
  width: 0px;
  height: 50px; /*先随便设置一个高度*/
  background: red;
}
</style>
