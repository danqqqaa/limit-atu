import { useTRPC } from '@/shared/composables/use-trpc'
import { loginSchemaType } from 'z-limit'
import { useAuthStore } from '@/shared/stores/auth/auth-store'
import { useRouter } from 'vue-router'
import { useMutation } from '@tanstack/vue-query'
import { showToast } from '@/shared/toast'


type UserCredentials = {
  token: string,
  user: string
}
export function useLogin() {
  const router = useRouter()
  const trpc = useTRPC()

  const { setToken } = useAuthStore()

  return useMutation({
    mutationKey: ['login'],
    mutationFn: (props: loginSchemaType) => trpc.auth.login.mutate(props),
    onError: (error) => {
      showToast({
        title: 'Ошибка входа',
        description: error.message,
        variant: 'destructive',
        duration: 3000
      })
    },
    onSuccess: (data: UserCredentials) => {
      setToken(data)
      router.push({ path: '/users', replace: true })
    }
  })
}
