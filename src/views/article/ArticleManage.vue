<template>
    <page-container title="文章管理">
        <template #extra>
            <el-button type="primary">具名插槽</el-button>
        </template>
        <div v-for="item in 4" :key="item"> 默认插槽内容区</div>
    </page-container>
</template>
    
<style lang="scss" scoped></style>