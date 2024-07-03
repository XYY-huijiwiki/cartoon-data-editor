<script setup lang="ts">
import { darkTheme, zhCN, useOsTheme } from 'naive-ui'
import message from '@/ts/message'
import { onMounted, ref,computed } from 'vue'
import { useDataStore } from '@/stores/dataStore'
import { storeToRefs } from 'pinia'

// 判断是否为测试环境
let debug = import.meta.env.DEV

// 主题
let theme = computed(() => useOsTheme().value === 'dark' ? darkTheme : null)

// 定义一些变量
let { data } = storeToRefs(useDataStore())
let loading = ref(false)
let title = ref(debug ? `爱洗澡的大象` : mw.config.values.wgTitle)
let editSummary = ref('')

// 获取数据的功能
async function getData(title: string) {
  let requestURL = encodeURI(
    `https://xyy.huijiwiki.com/api/rest_v1/namespace/data/Data:${title}.json?${Date()}`
  )
  let response = await fetch(requestURL)
  let responseJSON = await response.json()
  let rawData = responseJSON['_embedded'][0]
  delete rawData['_id']
  data.value = rawData
}

onMounted(() => {
  getData(title.value)
})

// 保存按钮的功能
async function uploadData() {
  if (!editSummary.value) {
    message.error('编辑摘要不得为空！')
    return
  }
  try {
    loading.value = true
    await new mw.Api().edit(`Data:${title.value}.json`, () => ({
      text: JSON.stringify(data.value),
      summary: editSummary.value,
      tags: 'jsoneditor'
    }))
    $message.success('保存成功')
  } catch (error) {
    $message.error('保存失败')
  } finally {
    loading.value = false
    // refresh page after 2s
    setTimeout(() => {
      location.reload()
    }, 2000)
  }
}
</script>

<template>
  <n-config-provider :locale="zhCN" :theme="theme">
    <n-global-style v-if="debug"/>
      <n-tabs animated default-value="列表编辑">
        <n-tab-pane name="列表编辑" display-directive="show:lazy">
          <list-editor></list-editor>
        </n-tab-pane>
        <n-tab-pane name="使用说明" display-directive="show:lazy">
          <user-guide></user-guide>
        </n-tab-pane>
      </n-tabs>
      <n-divider/>
        <n-input-group>
          <n-input v-model:value="editSummary" placeholder="编辑摘要（必填）"></n-input>
          <n-button @click="uploadData()" :loading="loading">保存</n-button>
        </n-input-group>
  </n-config-provider>
</template>
