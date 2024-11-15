<script setup lang="ts">
  import Login from '@/modules/auth/components/Login.vue'
  import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card'
</script>

<template>
  <div class="w-full h-screen flex items-center justify-center bg-primary">
    <Card class="w-1/3">
      <CardHeader>
        <CardTitle class="flex justify-center">Авторизация</CardTitle>
      </CardHeader>
      <CardContent>
        <Login />
      </CardContent>
    </Card>
  </div>
</template>
