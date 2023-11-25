<template>
  <div id="appMain">
    <!-- 分页器等的文字默认是英文的，由于这里不涉及切换， 所以在 App.vue 中直接导入设置成中文即可 -->
    <el-config-provider :locale="zh">
      <router-view />
    </el-config-provider>
  </div>
</template>

<script setup>
import zh from 'element-plus/es/locale/lang/zh-cn.mjs'
</script>

<style scoped lang="scss"></style>
