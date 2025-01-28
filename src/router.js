import { createRouter, createWebHashHistory } from "vue-router";
import Home from "./pages/Home.vue"
import Register from "./pages/Register.vue";
import Files from "./pages/Files.vue";

const routes = [
    { path: "/", component: Home },
    { path: "/register", component: Register },
    { path: "/files", component: Files },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;