// main.ts
import { createApp } from 'vue'
//导入 element puls 组件
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
//设置中文
import zhCn from 'element-plus/es/locale/lang/zh-cn'

import App from './App.vue'

const app = createApp(App)


app.use(ElementPlus)
app.use(ElementPlus, {
    locale: zhCn,
  })
app.mount('#app')
