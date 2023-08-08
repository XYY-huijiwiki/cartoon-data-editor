import { ref, computed } from 'vue'
import type { Ref } from 'vue'
import { defineStore } from 'pinia'

export const useDataStore = defineStore('data', () => {
  let data: Ref<{ [key: string]: string | number | string[] }> = ref({})
  let isValidate: Ref<boolean> = ref(true)
  return { data, isValidate }
})
