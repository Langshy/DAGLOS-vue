import { createRouter, createWebHashHistory } from "vue-router";
import Home from "./pages/Home.vue"
import Archive from "./pages/archives/index.vue";
import ArchiveAdd from "./pages/archives/add.vue";
import ArchiveDetails from "./pages/archives/details.vue";
import registerList from "./pages/register/registerList.vue";
import registerOptions from "./pages/register/registerOptions.vue";
import userPage from "./pages/user/index.vue";


const routes = [
    { path: "/", component: Home },
    { path: "/index", component: Home },
    { path: "/Archive/index", component: Archive },
    { path: "/Archive/add", component: ArchiveAdd },
    {
        path: "/Archive/details/:id",
        component: ArchiveDetails,
    },
    { path: "/registerList", component: registerList },
    { path: "/registerOptions", component: registerOptions },
    { path: "/userPage", component: userPage },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;