<script setup lang="ts">
import { ref } from 'vue'

let baseURL = ref(`https://xyy.huijiwiki.com/wiki/`)
</script>

<template>
  <n-ul>
    <n-li>此处的所有“剧情简介”都应来自官方，官方写错的也一并保留。</n-li>
    <n-li>可以留空，不必全部填写。</n-li>
    <n-li>记得保存，保存后要等待一段时间（最多24小时）页面才会刷新。</n-li>
    <n-li>大部分数据已经过校对，如确信要修改请在编辑摘要内简要说明理据。</n-li>
    <!-- <n-li
      >每次进入代码编辑器都会同步一次数据，导致原来的代码排版丢失。按 <n-text code>Shift</n-text> +
      <n-text code>Alt</n-text> + <n-text code>F</n-text> 可以自动排版。</n-li
    > -->
    <n-li
      >如果需要编辑大量页面，请查看<n-a
        tag="a"
        :href="baseURL + `Project:开发者#数据表格`"
        target="_blank"
        >批量编辑</n-a
      >。</n-li
    >
  </n-ul>
</template>
