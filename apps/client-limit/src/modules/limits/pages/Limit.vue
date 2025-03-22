<script setup lang="ts">
import LimitDialog from '../components/LimitDialog.vue'

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/shared/components/ui/table'
import { useLimitStore } from '@/shared/stores/limit/limit-store'
import { computed } from 'vue'

const store  = useLimitStore()

const limitsData = computed(() => store.$state.limitsData.data);
console.log(limitsData)
const today = new Date();
const month = today.getMonth();
const year = today.getFullYear();
const params = { year: year, month: month };
store.requestLimits(params);
</script>

<template>
  <div class="w-full">
    <Table>
      <TableCaption>Таблица лимитов</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead class="w-[100px]">id</TableHead>
          <TableHead>Год</TableHead>
          <TableHead>Месяц</TableHead>
          <TableHead>Использовано в км.</TableHead>
          <TableHead>Лимит в км.</TableHead>
          <TableHead>Использовано в мин.</TableHead>
          <TableHead>Лимит в мин.</TableHead>
          <TableHead class="text-right"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        
        <TableRow v-for="d in limitsData" :key="d.id">
          <TableCell class="font-medium">
            {{ d.id }}
          </TableCell>
          <TableCell>{{ d.year }}</TableCell>
          <TableCell>{{ d.month }}</TableCell>
          <TableCell>{{ d.usedMileage }}</TableCell>
          <TableCell>{{ d.limitMileage }}</TableCell>
          <TableCell>{{ d.usedTime }}</TableCell>
          <TableCell>{{ d.limitTime }}</TableCell>
          <TableCell class="text-right">
            <LimitDialog :data="d" />
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </div>
</template>