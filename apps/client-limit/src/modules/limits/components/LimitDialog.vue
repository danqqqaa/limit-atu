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
import { ref } from 'vue'
import { useQuery } from '@tanstack/vue-query'
import { useTRPC } from '@/shared/composables/use-trpc'

const trpc = useTRPC()
const props = defineProps<{
  data?: any
}>()

const limitForm = ref({
  limitMileage: '',
  limitTime: ''
})

const onSubmitLimit = () => {

  trpc.limit.updateLimit.query({ id: props.data.id, limitMileage: limitForm.value.limitMileage, limitTime: limitForm.value.limitTime }),


    console.log('Form submitted!', limitForm.value.limitMileage, limitForm.value.limitTime)
}
</script>

<template>
  <Dialog>
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