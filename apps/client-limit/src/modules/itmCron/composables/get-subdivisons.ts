import { useTRPC } from "@/shared/composables/use-trpc";
import { useMutation } from "@tanstack/vue-query";

export function useGetMvz() {
    const trpc = useTRPC()
    return useMutation({
        mutationKey: ['get-mvz'],
        mutationFn: () => trpc.cron.getMvz.mutate()
    })
}