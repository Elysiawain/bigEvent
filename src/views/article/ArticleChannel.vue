<template>
    <page-container title="文章分类">
        <template #extra>
            <el-button type="primary">分类编辑</el-button>
        </template>
        <div v-for="item in 4" :key="item" class="slotContent"> 默认插槽内容区</div>
    </page-container>
</template>

<style lang="scss" scoped>
.slotContent {
    margin-bottom: 20px;
}
</style>