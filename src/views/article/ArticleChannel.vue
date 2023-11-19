<script setup>
import { getArticleList, deleteArticleCate } from '@/api/article'
import { ref } from 'vue'
import ChannelEdit from './components/ChannelEdit.vue'
import { Delete, Edit } from '@element-plus/icons-vue'
const articleList = ref([])
const loading = ref(false)
const getArticle = async () => {
    loading.value = true
    const res = await getArticleList()
    loading.value = false
    articleList.value = res.data.data
}
getArticle()
const dialog = ref()
// 添加文章分类
const onEditChannel = (row) => {
    dialog.value.open(row)
}
const onAddChannel = () => {
    dialog.value.open({})
}
// 删除文章
const onDeleteChannel = async (row) => {
    await ElMessageBox.confirm(
        // 这里加一个异步，只有当用户选择确认推出后才会执行后续操作
        '是否确认删除该分类？',
        '温馨提示',
        {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning'
        })
    await deleteArticleCate(row.id)
    ElMessage.success('删除成功')
     getArticle()
}
const onSuccess = () => {
    getArticle() // 重新加载数据
}


</script>
<template>
    <page-container title="文章分类" v-loading="loading">
        <template #extra>
            <el-button type="primary" @click="onAddChannel">添加分类</el-button>
        </template>
        <div class="slotContent">
            <el-table :data="articleList" stripe style="width: 100%">
                <el-table-column type="index" label="序号" width="180" />
                <el-table-column prop="cate_name" label="分类名称" width="480" />
                <el-table-column prop="cate_alias" label="分类别名" width="380" />
                <el-table-column prop="active" label="操作">
                    <!-- 可利用插槽自定义内容 -->
                    <template #default="{ row, $index }">
                        <el-button :icon="Edit" @click="onEditChannel(row, $index)" type="primary" plain></el-button>
                        <el-button :icon="Delete" @click="onDeleteChannel(row, $index)" type="danger" plain></el-button>
                    </template>
                </el-table-column>
                // 当数据为空的时候
                <template #empty>
                    <el-empty description="暂无分类" />
                </template>
            </el-table>
        </div>
        <channel-edit ref="dialog" @success="onSuccess"></channel-edit>
    </page-container>
</template>

<style lang="scss" scoped>
.slotContent {
    margin-bottom: 20px;
}
</style>