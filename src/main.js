import { createApp } from 'vue'
//导入 element puls 组件
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
//设置路由
import router from './router.js'
import App from './App.vue'
const app = createApp(App);


app.use(ElementPlus);
app.use(router);
app.mount('#app');
