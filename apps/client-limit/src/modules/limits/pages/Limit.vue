<script setup lang="ts">
import LimitDialog from '../components/LimitDialog.vue'
import { useTRPC } from '@/shared/composables/use-trpc'
import { useQuery } from '@tanstack/vue-query'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/shared/components/ui/table'
const dataTest = [
  {
    id: 1,
    year: 2024,
    month: 0,
    used: 5,
    limit: 1000,
    idTableLimits: 1
  },
  {
    id: 2,
    year: 2024,
    month: 0,
    used: 5,
    limit: 1000,
    idTableLimits: 2
  },
  {
    id: 3,
    year: 2024,
    month: 0,
    used: 5,
    limit: 1000,
    idTableLimits: 3
  },
  {
    id: 4,
    year: 2024,
    month: 0,
    used: 5,
    limit: 1000,
    idTableLimits: 4
  },
  {
    id: 5,
    year: 2024,
    month: 0,
    used: 5,
    limit: 1000,
    idTableLimits: 5
  }
]

const trpc = useTRPC()
function getLimits() {
  return useQuery({
    queryFn: () => trpc.limit.getLimits.query(),
    queryKey: ['limits']
  })
}
function getCronMvz() {
  return useQuery({
    queryFn: () => trpc.cron.getMvz.query(),
    queryKey: ['mvz']
  })
}
function getCronSubdivisions() {
  return useQuery({
    queryFn: () => trpc.cron.getSubdivisions.query(),
    queryKey: ['subdivisions']
  })
}
const { data } = getLimits()
const cronMvz = getCronMvz()
const cronSubdivisions = getCronSubdivisions()
</script>

<template>
  <div class="w-full">
    {{ cronMvz.data.value?.entries }}
    <br />
    {{ cronSubdivisions.data.value?.entries }}
    <Table>
      <TableCaption>Таблица лимитов</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead class="w-[100px]">id</TableHead>
          <TableHead>Год</TableHead>
          <TableHead>Месяц</TableHead>
          <TableHead>Использовано</TableHead>
          <TableHead>Лимит</TableHead>
          <TableHead>Подразделение</TableHead>
          <TableHead>Цех</TableHead>
          <TableHead class="text-right"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow v-for="d in data" :key="d.id">
          <TableCell class="font-medium">
            {{ d.id }}
          </TableCell>
          <TableCell>{{ d.year }}</TableCell>
          <TableCell>{{ d.month }}</TableCell>
          <TableCell>{{ d.used }}</TableCell>
          <TableCell>{{ d.limit }}</TableCell>
          <TableCell>{{ d.subdivisionId }}</TableCell>
          <TableCell>{{ d.mvzId }}</TableCell>
          <TableCell class="text-right">
            <LimitDialog :data="d" />
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </div>
</template>