import { useTRPC } from "@/shared/composables/use-trpc";
import { useQuery } from "@tanstack/vue-query";

export function getOrganizations() {
    const trpc = useTRPC()
    return useQuery({
        queryFn: () => trpc.user.getOrganizations.query(),
        queryKey: ['organizations'],
    })
}