<template>
  <div class="login-container">
    <div class="login-card">
      <div class="login-header">
        <h2>欢迎登录</h2>
        <p>请输入您的账号和密码</p>
      </div>

      <el-form class="login-form">
        <el-form-item>
          <el-input v-model="form.username" placeholder="请输入用户名" :prefix-icon="User" size="large" />
        </el-form-item>

        <el-form-item>
          <el-input v-model="form.password" placeholder="请输入密码" type="password" show-password :prefix-icon="Lock"
            size="large" />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" size="large" class="login-btn" @click="handleLogin">
            登 录
          </el-button>
        </el-form-item>
      </el-form>

      <div class="login-footer">
        <el-checkbox v-model="rememberMe">记住我</el-checkbox>
        <el-link type="primary">忘记密码?</el-link>
      </div>
    </div>
  </div>
  <el-dialog v-model="dialogVisible" title="登录失败" width="400px" :close-on-click-modal="false" :show-close="false"
    class="error-dialog">
    <div class="dialog-content">
      <el-icon color="#F56C6C" :size="40" class="error-icon">
        <CircleCloseFilled />
      </el-icon>
      <h3 class="error-title">用户名或密码不正确</h3>
      <p class="error-tip">请检查您的登录信息后重试</p>
    </div>

    <template #footer>
      <el-button type="primary" class="relogin-btn" @click="handleReLogin">
        重新登录
      </el-button>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref } from 'vue'
import { User, Lock } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { CircleCloseFilled } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

// 控制弹窗显示
const dialogVisible = ref(false)

// 重新登录处理
const handleReLogin = () => {
  dialogVisible.value = false
  ElMessage.success('请重新输入登录信息')
}

const form = ref({
  username: '',
  password: ''
})

const router = useRouter()
const rememberMe = ref(false)

const handleLogin = async () => {
  // 这里添加登录逻辑
  const userData = await axios.post('http://127.0.0.1:5000/auth',
    { username: form.value.username, password: form.value.password })
    .then(ans => ans.data)
    const succ = userData.success
  if (succ === true) {
    localStorage.setItem('userId', form.value.username)
    localStorage.setItem('userToken', userData.token)
    console.log('userToken:', userData.token)
    router.push('/')
  } else {
    dialogVisible.value = true
  }
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.login-card {
  width: 400px;
  padding: 40px;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.login-card:hover {
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
}

.login-header {
  text-align: center;
  margin-bottom: 30px;
}

.login-header h2 {
  font-size: 24px;
  color: #333;
  margin-bottom: 10px;
}

.login-header p {
  font-size: 14px;
  color: #909399;
}

.login-form {
  margin-top: 20px;
}

.login-btn {
  width: 100%;
  margin-top: 10px;
  letter-spacing: 2px;
}

.login-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  font-size: 14px;
}

.el-input {
  margin-bottom: 20px;
}

.el-input :deep(.el-input__wrapper) {
  border-radius: 8px;
  padding: 0 15px;
}

.el-button {
  border-radius: 8px;
  font-weight: 500;
}

.error-dialog {
  border-radius: 12px;
}

.dialog-content {
  text-align: center;
  padding: 20px 0;
}

.error-icon {
  margin-bottom: 16px;
}

.error-title {
  color: #F56C6C;
  margin: 0 0 8px 0;
  font-size: 18px;
  font-weight: 500;
}

.error-tip {
  color: #909399;
  margin: 0;
  font-size: 14px;
}

.relogin-btn {
  width: 100%;
  padding: 12px 0;
  border-radius: 8px;
  background: var(--el-color-primary);
  border: none;
  transition: all 0.3s;
}

.relogin-btn:hover {
  opacity: 0.9;
  transform: translateY(-2px);
}

:deep(.el-dialog__header) {
  border-bottom: 1px solid #f0f0f0;
  padding-bottom: 16px;
  margin-right: 0;
}

:deep(.el-dialog__title) {
  font-weight: 600;
  color: #F56C6C;
}
</style>
