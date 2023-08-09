<script setup lang="ts">
import { ref } from 'vue'

// 判断是否为测试环境
let debug = import.meta.env.DEV

// 定义一些变量
let title = ref(debug ? `爱洗澡的大象` : mw.config.values.wgTitle)
let baseURL = ref(`https://xyy.huijiwiki.com/wiki/`)
</script>

<template>
  <n-ul>
    <n-li>
      一般说明
      <n-ul>
        <n-li>此处的所有“剧情简介”都应来自官方，官方写错的也一并保留。</n-li>
        <n-li>可以留空，不必全部填写。</n-li>
        <n-li>记得保存，保存后要等待一段时间（最多24小时）页面才会刷新。</n-li>
        <n-li>大部分数据已经过校对，如确信要修改请在编辑摘要内简要说明理据。</n-li>
      </n-ul>
    </n-li>
    <n-li>
      其他编辑方法
      <n-ul>
        <n-li>
          <n-a :href="baseURL + `Data:` + title + `.json?action=edit`" target="_blank">点击此处</n-a
          >直接编辑JSON代码。
        </n-li>
        <n-li>
          <n-a :href="baseURL + `Project:开发者#数据表格`" target="_blank">点击此处</n-a
          >查看大批量修改数据的方法。
        </n-li>
      </n-ul>
    </n-li>
  </n-ul>
</template>
