import { useTRPC } from '@/shared/composables/use-trpc'
import { useQuery } from '@tanstack/vue-query'
import { defineStore } from 'pinia'

export const useLimitStore = defineStore('limit', {
    state: () => ({
        limitsData: [] as any,
    }),
    actions: {
        async requestLimits(params: any) {
            this.limitsData = await useQuery({
                queryFn: () => useTRPC().limit.getLimits.query(params),
                queryKey: ['limits', params],
            })
        },
        async updateLimit(params: any) {
            await useTRPC().limit.updateLimit.query(params)
        }
    }
})