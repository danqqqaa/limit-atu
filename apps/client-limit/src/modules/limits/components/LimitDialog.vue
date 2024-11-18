<script setup lang="ts">
import { Button } from '@/shared/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/shared/components/ui/dialog'
import { Input } from '@/shared/components/ui/input'
import { Label } from '@/shared/components/ui/label'
import { ref } from 'vue'

const props = defineProps<{
    data?: any
}>()

const limitForm = ref({
    limit: '',
})

const onSubmitLimit = () => {
    console.log('Form submitted!', limitForm.value.limit)
}
</script>

<template>
    <Dialog>
        <DialogTrigger as-child>
            <Button variant="outline">
                Редактировать лимит
            </Button>
        </DialogTrigger>
        <DialogContent class="sm:max-w-[425px]">
            
            <DialogHeader>
                <DialogTitle>Редактировать лимит №{{ props.data.id }}</DialogTitle>
                <DialogDescription>
                    Использовано: {{ props.data.used }}
                </DialogDescription>
            </DialogHeader>
            <div class="grid gap-4 py-4">
                <div class="grid grid-cols-4 items-center gap-4">
                    <Label for="name" class="text-right">
                        Лимит
                    </Label>
                    <Input type="number" id="limit" class="col-span-3" v-model="limitForm.limit" />
                </div>
                <!-- <div class="grid grid-cols-4 items-center gap-4">
          <Label for="username" class="text-right">
            Username
          </Label>
          <Input id="username" value="@peduarte" class="col-span-3" />
        </div> -->
            </div>
            <DialogFooter>
                <Button @click="onSubmitLimit()">
                    Сохранить
                </Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
</template>