<template>
  <!-- 设置卡片盒子阴影 -->
  <!-- 卡片盒子g滚动条美化 -->
  <!-- <el-scrollbar height="100%"> -->
  <el-card
    class="page-container"
    :style="{
      boxShadow: `none`,
      display: 'flex',
      flexDirection: 'column',
      overflowY: 'scroll',
      height: '100%'
    }"
  >
    <template #header>
      <div class="page-header">
        <!-- 必要不用插槽，可选用插槽，非通用则为普通插槽 -->
        <span>{{ title }}</span>

        <slot name="extra"></slot>
      </div>
    </template>
    <slot></slot>
  </el-card>
  <!-- </el-scrollbar> -->
</template>

<script setup>
import { defineProps } from 'vue'

defineProps({
  title: {
    required: true,
    type: String
  }
})
</script>

<style scoped lang="scss">
.page-container {
  background-color: white;

  .page-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
