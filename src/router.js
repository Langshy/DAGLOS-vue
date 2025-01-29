import { createRouter, createWebHashHistory } from "vue-router";
import Home from "./pages/Home.vue"
import Register from "./pages/Register.vue";
import Files from "./pages/Files.vue";
import registerList from "./pages/registerList.vue";
import registerOptions from "./pages/registerOptions.vue";

const routes = [
    { path: "/", component: Home },
    { path: "/register", component: Register },
    { path: "/files", component: Files },
    { path: "/registerList", component: registerList },
    { path: "/registerOptions", component: registerOptions },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;