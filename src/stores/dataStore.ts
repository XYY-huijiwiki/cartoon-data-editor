import { ref } from 'vue'
import type { Ref } from 'vue'
import { defineStore } from 'pinia'

export const useDataStore = defineStore('data', () => {
  const data: Ref<{ [key: string]: string | number | string[] }> = ref({})
  return { data }
})
