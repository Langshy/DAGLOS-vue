import { createRouter, createWebHashHistory } from "vue-router";
import Home from "./pages/Home.vue"
import Register from "./pages/register/Register.vue";
import Archive from "./pages/file/Archive.vue";
import registerList from "./pages/register/registerList.vue";
import registerOptions from "./pages/register/registerOptions.vue";

const routes = [
    { path: "/", component: Home },
    { path: "/register", component: Register },
    { path: "/Archive", component: Archive },
    { path: "/registerList", component: registerList },
    { path: "/registerOptions", component: registerOptions },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;