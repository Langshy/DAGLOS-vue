<script setup>
import { ref,reactive,computed } from "vue";
import Header from './components/Header.vue';
import Aside from './components/Aside.vue';
import router from "./router.js";

//路由跳转
const routerChange = (n) =>{
  router.push(n);
}

const title = ref("档案管理");
</script>

<!-- 容器布局 -->
<template>
  <!-- 主页 -->
  <div class="common-layout" :style="{ height: contentHeight + 'px' }">
    <el-container>
      <el-header><Header/></el-header>
      <el-container>
        <el-aside width="200px" :style="{ height: contentHeight + 'px' }"><Aside/></el-aside>
        <el-main>
          <RouterView></RouterView>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 初始化内容高度
      contentHeight: 0
    };
  },
  mounted() {
    // 当组件挂载完成后，设置初始高度
    this.setContentHeight();
    // 添加窗口大小改变的监听器
    window.addEventListener('resize', this.setContentHeight);
  },
  beforeDestroy() {
    // 组件销毁前移除监听器
    window.removeEventListener('resize', this.setContentHeight);
  },
  methods: {
    setContentHeight() {
      // 设置内容高度为窗口高度减去其他固定元素的高度
      this.contentHeight = window.innerHeight - 100; // 假设有100px其他固定高度的元素
    }
  }
};
</script>