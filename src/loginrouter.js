import { createRouter, createWebHashHistory } from "vue-router";
import Register from "./pages/register/index.vue";
import Login from "./pages/login/index.vue";
import Cp from "./pages/user/changePass.vue"


const routes = [
    {path: "/", component: Login},
    {path:"/registers",component:Register},
    {path:"/cp",component:Cp},
]
const router = createRouter({
    history: createWebHashHistory(),
    routes,
});
export default router;