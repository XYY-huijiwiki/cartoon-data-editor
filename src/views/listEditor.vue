<script setup lang="ts">
import { useDataStore } from '@/stores/dataStore'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import message from '@/ts/message'

let { data } = storeToRefs(useDataStore())
let newKey = ref('')
let newValue = ref('')
let loading = ref(false)

async function addItem(): Promise<void> {
  loading.value = true
  let key2add = newKey.value.trim()
  let value2add = newValue.value.trim()

  // 判断newKey是否已经在data中存在
  if (key2add in data.value) {
    message.error('键名已存在')
    return
  }

  // 判断newValue是否为json数组，如果是，就以数组形式存储，否则以字符串形式存储
  try {
    console.log(JSON.parse(value2add))
    if (Array.isArray(JSON.parse(value2add))) {
      data.value[key2add] = JSON.parse(value2add)
    } else {
      throw new Error('not a json array')
    }
  } catch {
    data.value[key2add] = value2add
  } finally {
    newKey.value = ''
    newValue.value = ''
    message.success('成功添加在第一行')
    loading.value = false
    return
  }
}
</script>

<template>
  <div v-if="Object.keys(data).length === 0">
    <n-skeleton text :repeat="4" /><n-skeleton text style="width: 60%" />
  </div>
  <n-form :model="data" label-placement="left" :label-width="80" size="small" v-else>
    <n-form-item v-for="(value, key) in data" :label="key" :path="key">
      <n-input-group>
        <n-dynamic-tags
          v-if="Array.isArray(value)"
          v-model:value="data[key]"
          style="width: inherit"
        ></n-dynamic-tags>
        <n-input-number
          v-else-if="typeof value === 'number'"
          v-model:value="data[key]"
          style="width: 100%"
        ></n-input-number>
        <n-input v-else v-model:value="data[key]"></n-input>
        <n-popconfirm
          @positive-click="delete data[key]"
          :positive-button-props="{ type: `error` }"
          :show-icon="false"
        >
          <template #trigger>
            <n-button type="error" tertiary>
              <material-symbol>delete</material-symbol>
            </n-button>
          </template>
          <template #default>
            确定删除 <n-text type="error">{{ key }}</n-text> 吗？
          </template>
        </n-popconfirm>
      </n-input-group>
    </n-form-item>
    <!-- 输入和添加新的键值对 -->
    <n-form-item>
      <n-input-group>
        <n-input v-model:value="newKey" placeholder="新键名"></n-input>
        <n-input v-model:value="newValue" placeholder="新键值"></n-input>
        <n-button @click="addItem()" :disabled="!newKey || !newValue" :loading="loading">
          <material-symbol>add</material-symbol>
        </n-button>
      </n-input-group>
    </n-form-item>
  </n-form>
</template>
