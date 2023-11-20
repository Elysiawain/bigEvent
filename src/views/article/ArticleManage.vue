<script setup>
import { ref } from 'vue'
const onSearch = () => { }
const onReset = () => {

}
const showDrawer = ref(false)

// 添加文章封面时上传校验本地预览
const imageUrl = ref('')
// 当用户添加封面时
const onAvatarChange = (uploadFile) => {

    if (beforeUpload(uploadFile)) { // 会根据文件的大小返回true或false
        imageUrl.value = URL.createObjectURL(uploadFile.raw)
        // 前端图片上传本地预览惯用语法——URL.createObjectURL(file)
        return true
    }
    // 图片过大
    return false
}
// 选择封面前校验
const beforeUpload = (rawFile) => {
    if (rawFile.size / 1024 / 1024 > 2) {
        ElMessage.error('图片大小不能超过 2MB!');
        return false;
    }
    return true;
};
</script>
<template>
    <page-container title="文章管理">
        <template #extra>
            <el-button type="primary" @click="showDrawer = true">发布文章</el-button>
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
        <el-table>
            <template #empty>
                <el-empty description="暂无文章" />
            </template>
        </el-table>
    </page-container>
    <!-- 右侧抽屉 -->
    <el-drawer v-model="showDrawer" title="添加文章" direction="rtl" size="50%">
        添加封面：
        <el-upload class="avatar-uploader" :show-file-list="false" :on-change="onAvatarChange" :auto-upload="false">
            <!--  :auto-upload="false" 将自动上传设置为false -->
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon">
                <Plus />
            </el-icon>
        </el-upload>
    </el-drawer>
</template>
    
<style lang="scss" scoped>
.avatar-uploader .avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>
<!-- 设置上传封面样式 -->
<style lang="scss">
.avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
}
</style>