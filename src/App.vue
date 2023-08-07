<script setup lang="ts">
import { darkTheme, zhCN } from 'naive-ui'
import message from '@/ts/message'
import { onMounted, ref } from 'vue'
import codeEditor from './view/code-editor.vue'

// 判断是否为测试环境
let debug = import.meta.env.DEV

// 定义一些变量
let baseURL = ref(`https://xyy.huijiwiki.com/wiki/`)
let dataStr = ref('{}')
let dataObj = ref({})
let dataBackup = ref({})
let loading = ref(false)
let showModal = ref(true)
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
  dataBackup.value = JSON.stringify(rawData)
}

onMounted(() => {
  getData(title.value)
  dataStr.value = JSON.stringify(dataBackup.value)
  dataObj.value = dataStr.value
})

// 取消按钮
// 重置数据并关闭模态框
function cancel() {
  dataStr.value = JSON.stringify(dataBackup.value)
  dataObj.value = dataStr.value
  showModal.value = false
}

// 强制要求填写编辑摘要
async function checkEditSummary() {
  if (!editSummary.value) {
    message.error('编辑摘要不得为空！')
    return
  }
  await uploadData()
}

// 保存按钮的功能
async function uploadData() {
  try {
    loading.value = true
    await new mw.Api().edit(`Data:${title.value}.json`, () => ({
      text: JSON.stringify(dataStr.value),
      summary: editSummary.value,
      tags: 'jsoneditor'
    }))
    $message.success('保存成功')
  } catch (error) {
    $message.error('保存失败')
  } finally {
    loading.value = false
    showModal.value = false
  }
}

//
let handleBeforeLeave = (tabName: string) => {
  switch (tabName) {
    case '列表编辑':
      try {
        dataObj.value = JSON.parse(dataStr.value)
      } catch (error) {
        message.error('JSON格式错误！')
        return false
      }
      break
    case '代码编辑':
      dataStr.value = JSON.stringify(dataObj.value)
      break
    default:
      break
  }
  return true
}
</script>

<template>
  <n-config-provider :locale="zhCN" :theme="darkTheme" v-cloak>
    <n-alert type="error" v-if="debug" closable>
      当前处于测试环境！如果您在羊羊百科内看到这个提示，请刷新页面！
    </n-alert>
    <n-tabs animated @before-leave="handleBeforeLeave">
      <n-tab-pane name="列表编辑" display-directive="show:lazy">
        <n-form :model="dataObj" label-placement="left" :label-width="80">
          <n-form-item v-for="(value, key) in dataObj" :label="key" :path="key">
            <n-dynamic-tags
              v-if="Array.isArray(value)"
              v-model:value="dataObj[key]"
            ></n-dynamic-tags>
            <n-input-number
              v-else-if="typeof value === 'number'"
              v-model:value="dataObj[key]"
              style="width: 100%"
            ></n-input-number>
            <n-input v-else v-model:value="dataObj[key]"></n-input>
          </n-form-item>
          <n-form-item label="编辑摘要" :path="editSummary">
            <n-input v-model:value="editSummary"></n-input>
          </n-form-item>
        </n-form>
      </n-tab-pane>
      <n-tab-pane name="代码编辑" display-directive="show:lazy">
        <code-editor></code-editor>
      </n-tab-pane>
      <n-tab-pane name="使用说明" display-directive="show">
        <n-ul>
          <n-li>此处的所有“剧情简介”都应来自官方，官方写错的也一并保留。</n-li>
          <n-li>可以留空，不必全部填写。</n-li>
          <n-li>记得保存，保存后要等待一段时间（最多24小时）页面才会刷新。</n-li>
          <n-li>大部分数据已经过校对，如确信要修改请在编辑摘要内简要说明理据。</n-li>
          <n-li>“列表编辑”和“代码编辑”不能同时使用，其数据是不互通的。</n-li>
        </n-ul>
      </n-tab-pane>
    </n-tabs>
    <template #action>
      <n-space justify="end">
        <n-button tag="a" :href="baseURL + `Data:` + title + `.json`" target="_blank"
          >源码编辑</n-button
        >
        <n-button tag="a" :href="baseURL + `Project:开发者#数据表格`" target="_blank"
          >批量编辑</n-button
        >
        <n-button @click="cancel()">取消（不保存）</n-button>
        <n-button @click="checkEditSummary()" :loading="loading">保存</n-button>
      </n-space>
    </template>
  </n-config-provider>
</template>
