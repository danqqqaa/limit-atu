import itmCronPage from "./pages/itmCron.vue";
import { Timer } from 'lucide-vue-next'

export const router = [
    {
        path: '/cron',
        component: itmCronPage,
        name: 'Крон',
        onLayout: true,
        componentIcon: Timer
    }
]