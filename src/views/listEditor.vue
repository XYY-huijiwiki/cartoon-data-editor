<script setup lang="ts">
import { useDataStore } from '@/stores/dataStore'
import { storeToRefs } from 'pinia'

let { data } = storeToRefs(useDataStore())
</script>

<template>
  <div v-if="Object.keys(data).length === 0"><n-skeleton text :repeat="4" /><n-skeleton text style="width: 60%" /></div>
  <n-form
    :model="data"
    label-placement="left"
    :label-width="80"
    v-else
  >
    <n-form-item v-for="(value, key) in data" :label="key" :path="key">
      <n-dynamic-tags v-if="Array.isArray(value)" v-model:value="data[key]"></n-dynamic-tags>
      <n-input-number
        v-else-if="typeof value === 'number'"
        v-model:value="data[key]"
        style="width: 100%"
      ></n-input-number>
      <n-input v-else v-model:value="data[key]"></n-input>
    </n-form-item>
  </n-form>
</template>
