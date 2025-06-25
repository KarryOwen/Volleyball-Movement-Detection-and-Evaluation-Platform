<template>
  <!-- 未登入提示 -->
  <el-dialog v-model="showDialog" title="登录提示" width="400px" :close-on-click-modal="false" :show-close="false" center>
    <div class="auth-dialog-content">
      <el-icon :size="60" color="#F56C6C">
        <WarningFilled />
      </el-icon>
      <h3>您尚未登录</h3>
      <p>登录后可查看完整内容，立即登录体验更多功能</p>
    </div>

    <template #footer>
      <div class="auth-dialog-footer">
        <el-button type="primary" @click="handleLogin">立即登录</el-button>
      </div>
    </template>
  </el-dialog>
  <!--  -->
  <div class="sports-app-container">
    <!-- 左侧导航栏 -->
    <div class="sports-nav">
      <div class="logo-section">
        <h2 class="brand-name">Volleyball</h2>
      </div>

      <el-menu :default-active="activeTab" class="sports-menu" background-color="#1a2f3a" text-color="#b8c7ce"
        active-text-color="#ffd04b" @select="handleSelect">
        <el-menu-item index="detection">
          <el-icon>
            <Opportunity />
          </el-icon>
          <span>运动检测</span>
        </el-menu-item>

        <el-menu-item index="record">
          <el-icon>
            <Apple />
          </el-icon>
          <span>检测记录</span>
        </el-menu-item>

        <el-menu-item index="center">
          <el-icon>
            <Basketball />
          </el-icon>
          <span>个人中心</span>
        </el-menu-item>
      </el-menu>
    </div>

    <!-- 右侧内容区 -->
    <div class="sports-content">
      <!-- 用户退出 -->
      <div class="logout-container">
        <el-tooltip effect="dark" content="安全退出用户" placement="bottom">
          <el-button class="logout-btn" type="danger" plain circle @click="handleLogout">
            <el-icon :size="18">
              <SwitchButton />
            </el-icon>
          </el-button>
        </el-tooltip>
      </div>
      <!-- 内容组件 -->
      <component :is="currentComponent" />
    </div>
  </div>
</template>

<script setup>
import { ref, shallowRef } from 'vue'
import { Opportunity, Apple, Basketball } from '@element-plus/icons-vue'
import motionDetection from '@/views/sports/motionDetection.vue'
import personalCenter from '@/views/sports/personalCenter.vue'
import detectionRecord from '@/views/sports/detectionRecord.vue'
import { WarningFilled } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import { SwitchButton } from '@element-plus/icons-vue'


const router = useRouter()
// 当前激活的标签
const activeTab = ref('detection')

// 动态组件
const currentComponent = shallowRef(motionDetection)

// 组件映射
const componentsMap = {
  detection: motionDetection,
  center: personalCenter,
  record: detectionRecord
}

// 处理菜单选择
const handleSelect = (key) => {
  activeTab.value = key
  currentComponent.value = componentsMap[key]
}

// 判断是否存在id

let showDialog = false
  // localStorage.getItem('userId') ? false : true

const handleLogin = () => {
  showDialog = false
  router.push('/login')
}
// 退出登入
const handleLogout = () => {
  localStorage.removeItem('userId')
  localStorage.removeItem('userToken')
  router.push('/login')
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
.logout-container {
  position: relative;
  display: inline-block;
}

/* 主按钮样式 */
.logout-btn {
  transition: all 0.3s ease;
  padding: 8px;
  border-color: var(--el-color-danger-light-3);
  color: var(--el-color-danger);
}

.logout-btn:hover {
  background: var(--el-color-danger-light-9);
  transform: scale(1.1);
  border-color: var(--el-color-danger);
}
.sports-app-container {
  margin-left: 0;
  display: flex;
  min-height: 100vh;
  width: 100%;
  height: 100%;
  background-color: #f5f7fa;
}

.sports-nav {
  width: 220px;
  background-color: #1a2f3a;
  color: white;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
}

.logo-section {
  display: flex;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #2c3e50;
}

.logo {
  width: 40px;
  height: 40px;
  margin-right: 10px;
}

.brand-name {
  font-size: 18px;
  font-weight: bold;
  color: #fff;
  margin: 0;
}

.sports-menu {
  border-right: none;
}

.sports-menu .el-menu-item {
  height: 56px;
  line-height: 56px;
  margin: 5px 0;
  transition: all 0.3s;
}

.sports-menu .el-menu-item:hover {
  background-color: #2c3e50 !important;
}

.sports-menu .el-menu-item.is-active {
  background-color: #2c3e50 !important;
  border-left: 3px solid #ffd04b;
}

.sports-content {
  flex: 1;
  padding: 20px;
  background-color: #fff;
  box-shadow: -2px 0 10px rgba(0, 0, 0, 0.05);
  overflow-y: auto;
}


.auth-dialog-content {
  text-align: center;
  padding: 10px 0;
}

.auth-dialog-content h3 {
  margin: 15px 0 10px;
  font-size: 18px;
  color: #303133;
}

.auth-dialog-content p {
  margin: 0;
  font-size: 14px;
  color: #606266;
  line-height: 1.5;
}

.auth-dialog-footer {
  display: flex;
  justify-content: center;
  gap: 20px;
  padding-top: 10px;
}

:deep(.el-dialog__header) {
  border-bottom: 1px solid #f0f0f0;
  margin-right: 0;
  padding-bottom: 15px;
}

:deep(.el-dialog__title) {
  font-size: 18px;
  font-weight: 500;
  color: #303133;
}

:deep(.el-button) {
  padding: 10px 24px;
  border-radius: 6px;
  font-size: 14px;
}

:deep(.el-button--primary) {
  background-color: #409EFF;
  border-color: #409EFF;
}
</style>
