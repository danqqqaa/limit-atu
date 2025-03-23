<script setup lang="ts">
import { Button } from '@/shared/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/shared/components/ui/dialog'
import { Input } from '@/shared/components/ui/input'
import { Label } from '@/shared/components/ui/label'
import { computed, onMounted, ref } from 'vue'
import { useLimitStore } from '@/shared/stores/limit/limit-store'

const store = useLimitStore()

const props = defineProps<{
  data?: any,
}>()

const today = new Date();
const month = today.getMonth();
const year = today.getFullYear();
const params = { year: year, month: month };
const isDialogOpen = ref(false)
const limitForm = ref({
  limitMileage: '',
  limitTime: ''
})
const onSubmitLimit = async () => {
  await store.updateLimit({ id: props.data.id, limitMileage: limitForm.value.limitMileage, limitTime: limitForm.value.limitTime });
  console.log('Form submitted!', limitForm.value.limitMileage, limitForm.value.limitTime)
  await store.requestLimits(params)
  isDialogOpen.value = false
}
onMounted(() => {
  limitForm.value.limitMileage = props.data.limitMileage
  limitForm.value.limitTime = props.data.limitTime
})
</script>

<template>
  <Dialog :open="isDialogOpen" @update:open="isDialogOpen = $event">
    <DialogTrigger as-child>
      <Button variant="outline">Редактировать лимит</Button>
    </DialogTrigger>
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Редактировать лимит №{{ props.data.id }}</DialogTitle>
        <DialogDescription>Использовано: {{ props.data.used }}</DialogDescription>
      </DialogHeader>
      <div class="grid gap-4 py-4">
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="name" class="text-right">Лимит в км.</Label>
          <Input type="number" class="col-span-3" v-model="limitForm.limitMileage" />
          <Label for="name" class="text-right">Лимит в мин.</Label>
          <Input type="number" class="col-span-3" v-model="limitForm.limitTime" />
        </div>
        <!-- <div class="grid grid-cols-4 items-center gap-4">
          <Label for="username" class="text-right">
            Username
          </Label>
          <Input id="username" value="@peduarte" class="col-span-3" />
        </div> -->
      </div>
      <DialogFooter>
        <Button @click="onSubmitLimit()">Сохранить</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>