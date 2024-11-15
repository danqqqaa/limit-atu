<script setup lang="ts">
  import { Page } from '@/shared/components/page'
  import { getOrganizations } from '../composables/get-organizions'
  import Skeleton from '@/shared/components/ui/skeleton/skeleton.vue'
  const { data, isLoading } = getOrganizations()

  console.log(data)
</script>

<template>
  <Page>
    <div v-if="isLoading">
      <Skeleton class="w-[1000px] h-[200px]" />
    </div>
    <div v-else>{{ JSON.stringify(data, null, 10) }}</div>
  </Page>
</template>
