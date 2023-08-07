<script setup lang="ts">
import * as monaco from 'monaco-editor'
import message from '@/ts/message'
import { onMounted } from 'vue'
onMounted(() => {
  self.MonacoEnvironment = {
    getWorker: function (workerId, label) {
      
      let getWorkerModule = (moduleUrl: string, label: string) => {
        return new Worker(self.MonacoEnvironment.getWorkerUrl(moduleUrl), {
          name: label,
          type: 'module'
        })
      }

      switch (label) {
        case 'json':
          console.log("object");
          try {
            return getWorkerModule('monaco-editor/esm/vs/language/json/json.worker?worker', label)
          } catch (error) {
            console.log(error);
          }
        case 'css':
        case 'scss':
        case 'less':
          return getWorkerModule('monaco-editor/esm/vs/language/css/css.worker?worker', label)
        case 'html':
        case 'handlebars':
        case 'razor':
          return getWorkerModule('monaco-editor/esm/vs/language/html/html.worker?worker', label)
        case 'typescript':
        case 'javascript':
          return getWorkerModule(
            'monaco-editor/esm/vs/language/typescript/ts.worker?worker',
            label
          )
        default:
          return getWorkerModule('monaco-editor/esm/vs/editor/editor.worker?worker', label)
      }
    }
  }

  let containerHTML = document.getElementById('monaco-editor-container')
  if (!containerHTML) {
    message.error('找不到monaco-editor-container！')
    return
  }
  let editor = monaco.editor.create(containerHTML, {
    value: `{
    "集数": 1,
    "页面名": "爱洗澡的大象"}
`,
    language: 'json',
    theme: 'vs-dark',
    scrollBeyondLastLine: false
  })

  // editor.getAction('editor.action.formatDocument').run()
})
</script>

<template>
  <div id="monaco-editor-container" style="height: 600px"></div>
</template>
