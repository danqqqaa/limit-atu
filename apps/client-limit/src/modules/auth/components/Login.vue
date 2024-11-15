<script setup lang="ts">
  import { Input } from '@/shared/ui/input'
  import { ref } from 'vue'
  import Button from '@/shared/ui/button/Button.vue'
  import { Eye, EyeOff } from 'lucide-vue-next'
  import { useLogin } from '../composables/use-login'
  import { loginSchema } from 'z-limit'
  import { toTypedSchema } from '@vee-validate/zod'
  import { useForm } from 'vee-validate'
  import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
  } from '@/shared/ui/form'
import Skeleton from '@/shared/ui/skeleton/skeleton.vue'
  const passwordVisible = ref(false)

  const loginForm = ref({
    username: '',
    password: ''
  })

  const formSchema = toTypedSchema(loginSchema)

  const form = useForm({ validationSchema: formSchema })

  const { mutate, isPending } = useLogin()

  const onSubmit = form.handleSubmit((values) => {
    mutate(values)
  })
</script>

<template>
  <div class="grid">
    <Skeleton v-if="isPending" class="w-2/3 mx-auto"/>
    <form @submit="onSubmit" class="space-y-6">
      <FormField name="username" v-slot="{ field: usernameField }">
        <FormItem>
          <FormLabel>Логин</FormLabel>
          <FormControl>
            <Input v-model="loginForm.username" v-bind="usernameField"></Input>
          </FormControl>
          <FormDescription v-if="!loginForm.username">Введите логин</FormDescription>
          <FormMessage v-else />
        </FormItem>
      </FormField>
      <FormField name="password" v-slot="{ field: passwordField }">
        <FormItem>
          <FormLabel>Пароль</FormLabel>
          <FormControl>
            <Input
              v-model="loginForm.password"
              :type="passwordVisible ? 'text' : 'password'"
              v-bind="passwordField"
            ></Input>
            <Button
              variant="ghost"
              size="icon"
              class="absolute mt-6 right-0 top-0 text-muted-foreground bg-transparent hover:bg-transparent"
              @click="passwordVisible = !passwordVisible"
            >
              <Eye v-if="!passwordVisible" />
              <EyeOff v-else />
            </Button>
          </FormControl>
          <FormDescription v-if="!loginForm.password">Введите пароль</FormDescription>
          <FormMessage v-else />
        </FormItem>
      </FormField>

      <Button class="mt-6 w-full" type="submit">Войти</Button>
    </form>
  </div>
</template>
