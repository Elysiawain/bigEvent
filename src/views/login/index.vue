<script setup>
import { User, Lock, Message } from '@element-plus/icons-vue'
import { ref, watch } from 'vue'
import { userRegister, userLogin } from '@/api/user'
import { useUserStore } from '@/stores/userStore'
import { useRouter } from 'vue-router'
const form = ref() //校验使用
const isRegister = ref(false)
// 添加注册的数据对象(绑定在:model="formModel"上)
const formModel = ref({
    username: '',
    password: '',
    repassword: ''
})
// 添加验证规则
const rules = {
    username: [
        { required: true, message: '请输入用户名', trigger: 'change' },
        { min: 2, max: 10, message: '用户名长度只能在2-10个字符之间', trigger: 'change' }
    ],// triggery 表示触发时机
    password: [
        { required: true, message: '请输入密码', trigger: 'change' },
        { pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{7,}$/, message: '密码必须包含字母和数字，长度为7-16位', trigger: 'change' }
    ],
    repassword: [
        { required: true, message: '请再次输入密码', trigger: 'change' },
        {
            validator: (rule, value, callback) => {
                // 判断两次输入的密码是否一致
                if (value !== formModel.value.password) {
                    callback(new Error('两次输入密码不一致'))
                } else {
                    callback()
                }
            }, trigger: 'change'
        }]
}
// 当用户输入完所有的数据后校验用户输入是否合法
const checkRegister = async () => {
    await form.value.validate()// 校验数据
    await userRegister(formModel.value)
    ElMessage.success('注册成功')
    isRegister.value = false
}
const userStore = useUserStore()
const rotuer=useRouter()
const checkLogin = async () => {
    await form.value.validate()// 校验数据
    const res = await userLogin(formModel.value)
    // 存入token到store
    userStore.setToken(res.data.token)
    ElMessage.success('登录成功')
    // 登录成功后跳转到首页
    rotuer.push('/')
}
// 当切换注册和登录时清空表单数据
watch(isRegister, () => {
    formModel.value = {
        username: '',
        password: '',
        repassword: ''
    }
})

</script>

<template>
    <el-row class="login-page">
        <el-col :span="12" class="bg"></el-col>
        <el-col :span="6" :offset="3" class="form">
            <transition name="fade" mode="out-in">
                <!-- 注册展示 -->
                <el-form :model="formModel" :rules="rules" ref="form" size="large" autocomplete="off" v-if="isRegister">
                    <el-form-item>
                        <h1>注册</h1>
                    </el-form-item>
                    <el-form-item prop="username">
                        <el-input :prefix-icon="User" placeholder="请输入用户名" v-model="formModel.username"></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input :prefix-icon="Lock" type="password" placeholder="请输入密码"
                            v-model="formModel.password"></el-input>
                    </el-form-item>
                    <el-form-item prop="repassword">
                        <el-input :prefix-icon="Lock" type="password" placeholder="请输入再次密码"
                            v-model="formModel.repassword"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button class="button" type="primary" auto-insert-space @click="checkRegister">
                            注册
                        </el-button>
                    </el-form-item>
                    <el-form-item class="flex">
                        <el-link type="info" :underline="false" @click="isRegister = false">
                            ← 返回
                        </el-link>
                    </el-form-item>
                </el-form>



                <!-- 登录注册展示 -->
                <el-form :model="formModel" :rules="rules" ref="form" size="large" autocomplete="off" v-else>
                    <el-form-item>
                        <h1>登录</h1>
                    </el-form-item>
                    <el-form-item prop="username">
                        <el-input :prefix-icon="User" placeholder="请输入用户名" v-model="formModel.username"></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input name="password" :prefix-icon="Lock" type="password" placeholder="请输入密码"
                            v-model="formModel.password"></el-input>
                    </el-form-item>
                    <el-form-item class="flex">
                        <div class="flex">
                            <el-checkbox>记住我</el-checkbox>
                            <el-link type="primary" :underline="false">忘记密码？</el-link>
                        </div>
                    </el-form-item>
                    <el-form-item>
                        <el-button class="button" type="primary" auto-insert-space @click="checkLogin">登录</el-button>
                    </el-form-item>
                    <el-form-item class="flex">
                        <el-link type="info" :underline="false" @click="isRegister = true">
                            注册 →
                        </el-link>
                    </el-form-item>
                </el-form>
            </transition>

        </el-col>
    </el-row>
</template>

<style lang="scss" scoped>
.login-page {
    height: 100vh;
    background-color: #fff;

    .bg {
        background: url('@/assets/logo2.png') no-repeat 60% center / 240px auto,
            url('@/assets/login_bg.jpg') no-repeat center / cover;
        border-radius: 0 20px 20px 0;
    }


    .form {
        display: flex;
        flex-direction: column;
        justify-content: center;
        user-select: none;

        @keyframes fade-leave {

            // 设置离场动画
            0% {
                transform: translateX(0);
            }

            50% {
                transform: translateX(-100px);
            }

            100% {
                transform: translateX(0px);
            }
        }

        @keyframes fade-enter {
            0% {
                transform: translateX(100px);
            }

            33% {
                transform: translateX(-100px);
            }

            66% {
                transform: translateX(50px);
            }

            100% {
                transform: translateX(0px);
            }
        }

        .fade-enter-from {
            opacity: 0;
        }

        .fade-enter-to {
            // 元素入场完毕时状态
            opacity: 1;
        }

        .fade-enter-active {
            // 元素入场时触发
            animation: fade-enter 1s;
            transition: opacity 2s;
        }

        .fade-leave-active {
            // 元素离场时触发
            animation: fade-leave 1s reverse;
            transition: opacity 1s;
        }

        .fade-leave-to {
            // 元素离场完毕时状态
            opacity: 0;
        }

        .title {
            margin: 0 auto;
        }

        .button {
            width: 100%;
        }

        .flex {
            width: 100%;
            display: flex;
            justify-content: space-between;
        }
    }
}
</style>
