<script setup>

import { useRoute } from 'vue-router'

//获取路由传参
const route = useRoute()
const id = route.params.id

console.log(id)

</script>
<template>
    详情页

</template>