<script setup lang="ts">
  import Button from '@/shared/components/ui/button/Button.vue'
  import { useGetMvz } from '../composables/get-subdivisons'

  const { mutate } = useGetMvz()
  const getSubdivision = () => mutate()
</script>

<template>
  <div class="w-full h-screen flex justify-center gap-2">
    <Button @click="getSubdivision">Запрос подразделений</Button>
    <Button>Запрос подразделений</Button>
    <Button>Запрос подразделений</Button>
  </div>
</template>
