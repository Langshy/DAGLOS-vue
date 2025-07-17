import { createRouter, createWebHashHistory } from "vue-router";
import Home from "./pages/Home.vue"
import archiveQuery from "./pages/archives/index.vue"
import archiveTable from "./pages/archives/tabel.vue"
import archiveAdd from "./pages/archives/add.vue"
import archiveDetails from "./pages/archives/details.vue"


const routes = [
    { path: "/", component: Home },
    { 
        path: "/archive/query", 
        component:archiveQuery,
        children:[
            {
                path:"table",
                component:archiveTable,
            },
        ]
    },
    { path: "/archive/add" , component:archiveAdd },
    { path: "/archive/details/:id" ,name: 'Details' , component:archiveDetails}

];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;