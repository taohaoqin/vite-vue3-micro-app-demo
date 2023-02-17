<template>
  <h1>{{ msg }}</h1>
  <h2>{{ props.msg }}</h2>
  <div class="box">
    <div class="box-item">111</div>
  </div>
  <button type="button" @click="handleClick">btn</button>
</template>
<script setup>
const emit = defineEmits(["btn"])
const props = defineProps({
  msg: String,
})
function handleClick() {
  emit("btn", "hello vite")
}
</script>
<style lang="scss" scoped>
a {
  color: #42b983;
}
.box {
  .box-item {
    color: red;
  }
}
</style>
