<script setup lang="ts">
import * as monaco from 'monaco-editor'
import message from '@/ts/message'
import { onMounted } from 'vue'
import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker'
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'
import { useDataStore } from '@/stores/dataStore'
import { storeToRefs } from 'pinia'

let { data, isValidate } = storeToRefs(useDataStore())

onMounted(() => {
  self.MonacoEnvironment = {
    getWorker: function (workerId, label) {
      if (label === 'json') {
        return new jsonWorker()
      } else {
        return new editorWorker()
      }
    }
  }

  let containerHTML = document.getElementById('monaco-editor-container')
  if (!containerHTML) {
    message.error('找不到monaco-editor-container！')
    return
  }
  let editor = monaco.editor.create(containerHTML, {
    value: JSON.stringify(data.value),
    language: 'json',
    theme: 'vs-dark'
  })

  editor.onDidChangeModelContent(() => {
    try {
      let value = editor.getValue()
      let parsedValue = JSON.parse(value)
      data.value = parsedValue
      isValidate.value = true
    } catch (error) {
      isValidate.value = false
    }
  })
})

function updateEditorValue() {
  let containerHTML = document.getElementById('monaco-editor-container')
  if (!containerHTML) {
    message.error('找不到monaco-editor-container！')
    return
  }
  let editor = monaco.editor.getModels()[0]
  editor.setValue(JSON.stringify(data.value))
}

defineExpose({
  updateEditorValue
})
</script>

<template>
  <n-alert type="success" v-if="isValidate">当前代码格式正确。</n-alert>
  <n-alert type="error" v-else>当前代码格式错误，无法保存或返回列表编辑。</n-alert>
  <div
    id="monaco-editor-container"
    style="height: 600px; margin-top: 8px; border-radius: 4px"
  ></div>
</template>
