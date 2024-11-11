import LimitPage from "./pages/Limit.vue"

export const router = [
    {
        path: '/limit',
        component: LimitPage,
        name: 'Лимиты',
        onLayout: true

    }
]