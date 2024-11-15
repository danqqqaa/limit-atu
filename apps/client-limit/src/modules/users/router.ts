import { Users } from "lucide-vue-next"
import UserPage from "./pages/UsersPage.vue"


export const router = [
    {
        path: '/users',
        component: UserPage,
        name: 'users',
        onLayout: true,
        componentIcon: Users 
    }
]