import { createRouter, createWebHashHistory } from "vue-router";
import Home from "./pages/Home.vue"
import archiveQuery from "./pages/archives/index.vue"



const routes = [
    { path: "/", component: Home },
    { path: "/archiveQuery", component:archiveQuery},

];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;