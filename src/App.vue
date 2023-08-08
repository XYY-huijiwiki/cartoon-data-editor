<script setup lang="ts">
import { darkTheme, zhCN } from 'naive-ui'
import message from '@/ts/message'
import { onMounted, ref } from 'vue'
import type { Ref } from 'vue'
import { useDataStore } from '@/stores/dataStore'
import { storeToRefs } from 'pinia'
import codeEditor from './views/codeEditor.vue'

// 判断是否为测试环境
let debug = import.meta.env.DEV

// 定义一些变量
let { data, isValidate } = storeToRefs(useDataStore())
let loading = ref(false)
let title = ref(debug ? `爱洗澡的大象` : mw.config.values.wgTitle)
let editSummary = ref('')
let codeEditorRef: Ref<InstanceType<typeof codeEditor> | null> = ref(null)

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
  }
}

const handleBeforeLeave = (value: string) => {
  if (value === '代码编辑' && codeEditorRef.value) {
    codeEditorRef.value.updateEditorValue()
  }
  return true
}
</script>

<template>
  <n-config-provider :locale="zhCN" :theme="darkTheme">
    <n-global-style />
    <n-card>
      <n-tabs animated default-value="列表编辑" @before-leave="handleBeforeLeave">
        <n-tab-pane name="列表编辑" display-directive="show:lazy" :disabled="!isValidate">
          <list-editor></list-editor>
        </n-tab-pane>
        <n-tab-pane name="代码编辑" display-directive="show:lazy">
          <code-editor ref="codeEditorRef"></code-editor>
        </n-tab-pane>
        <n-tab-pane name="使用说明" display-directive="show:lazy">
          <user-guide></user-guide>
        </n-tab-pane>
      </n-tabs>
      <template #action>
        <n-input-group>
          <n-input v-model:value="editSummary" placeholder="编辑摘要（必填）"></n-input>
          <n-button @click="uploadData()" :loading="loading" :disabled="!isValidate">保存</n-button>
        </n-input-group>
      </template>
    </n-card>
  </n-config-provider>
</template>
