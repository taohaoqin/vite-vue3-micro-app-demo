<template>
  <div class="layout">
    <div class="left">
      <el-menu
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
      >
        <el-sub-menu index="1">
          <template #title>
            <el-icon>
              <Location />
            </el-icon>
            <span>Navigator One</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="1-1">item one</el-menu-item>
            <el-menu-item index="1-2">item two</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <el-menu-item index="1-3">item three</el-menu-item>
          </el-menu-item-group>
          <el-sub-menu index="1-4">
            <template #title>item four</template>
            <el-menu-item index="1-4-1">item one</el-menu-item>
          </el-sub-menu>
        </el-sub-menu>
        <el-menu-item index="2">
          <el-icon>
            <Menu />
          </el-icon>
          <span>Navigator Two</span>
        </el-menu-item>
      </el-menu>
    </div>
    <div class="right"></div>
  </div>
</template>

<script setup>
// import { Menu as IconMenu, Location, Setting } from "@element-plus/icons-vue"
const handleOpen = (key, keyPath) => {
  console.log(key, keyPath)
}
const handleClose = (key, keyPath) => {
  console.log(key, keyPath)
}
</script>
<style lang="scss">
.layout {
  display: flex;
  .left {
    width: 220px;
  }
  .right {
    width: calc(100% - 220px);
  }
}
</style>
