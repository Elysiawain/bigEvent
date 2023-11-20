<script setup>
import {ref} from 'vue'
const onSearch = () => { }
const onReset = () => {

}

</script>
<template>
    <page-container title="文章管理">
        <template #extra>
            <el-button type="primary">发布文章</el-button>
        </template>

        <!-- 表单部分 -->
        <el-form inline>
            <el-form-item label="文章分类:">
                <!-- Vue2 => v-model :value 和 @input 的简写 -->
                <!-- Vue3 => v-model :modelValue 和 @update:modelValue 的简写 -->
                <el-select placeholder="请选择">
                    <el-option label="前端" value="前端"></el-option>
                    <el-option label="后端" value="后端"></el-option>
                </el-select>

                <!-- Vue3 => v-model:cid  :cid 和 @update:cid 的简写 -->
                <!-- <channel-select v-model:cid="params.cate_id"></channel-select> -->
            </el-form-item>
            <el-form-item label="发布状态:">
                <!-- 这里后台标记发布状态，就是通过中文标记的，已发布 / 草稿 -->
                <el-select placeholder="请选择">
                    <el-option label="已发布" value="已发布"></el-option>
                    <el-option label="草稿" value="草稿"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button @click="onSearch" type="primary">搜索</el-button>
                <el-button @click="onReset">重置</el-button>
            </el-form-item>
        </el-form>
    </page-container>
</template>
    
<style lang="scss" scoped></style>