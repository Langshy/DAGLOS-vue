import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import Login from './Login.vue'

import loginrouter from './loginrouter'
import VueCookies from 'vue3-cookies';

const app = createApp(Login)
app.use(ElementPlus)
app.use(loginrouter);
app.use(VueCookies);
app.mount('#login')
