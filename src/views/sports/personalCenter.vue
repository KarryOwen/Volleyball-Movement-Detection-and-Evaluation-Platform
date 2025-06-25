<template>
  <div class="training-container">
    <h2 class="section-title">个人中心</h2>
    <div class="profile-container">
      <el-card class="profile-card">
        <!-- 头像区域 -->
        <div class="avatar-section">
          <el-avatar :size="120" :src="userInfo.avatar" class="profile-avatar" />
          <el-upload action="#" :show-file-list="false" :auto-upload="false" :on-change="handleAvatarChange"
            class="avatar-uploader">
            <el-button type="primary" plain size="small" round>
              <el-icon>
                <Upload />
              </el-icon>
              更换头像
            </el-button>
          </el-upload>
        </div>

        <!-- 个人信息 -->
        <div class="info-section">
          <el-descriptions title="个人信息" :column="1" border size="large" class="profile-descriptions">
            <el-descriptions-item label="用户名">
              <el-tag>{{ userInfo.username }}</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="性别">
              {{ userInfo.gender }}
            </el-descriptions-item>
            <el-descriptions-item label="邮箱">
              {{ userInfo.email }}
              <el-button type="text" size="small" @click="showEditDialog('email')">
                <el-icon>
                  <Edit />
                </el-icon>
              </el-button>
            </el-descriptions-item>
            <el-descriptions-item label="手机号码">
              {{ userInfo.phone }}
              <el-button type="text" size="small" @click="showEditDialog('phone')">
                <el-icon>
                  <Edit />
                </el-icon>
              </el-button>
            </el-descriptions-item>
          </el-descriptions>
        </div>

        <!-- 操作按钮 -->
        <div class="action-section">
          <el-button type="primary" @click="handleSave">保存修改</el-button>
          <el-button @click="handleReset">重置</el-button>
        </div>
      </el-card>

      <!-- 编辑对话框 -->
      <el-dialog v-model="editDialog.visible" :title="`修改${editDialog.label}`" width="400px" center>
        <el-input v-model="editDialog.value" />
        <template #footer>
          <el-button @click="editDialog.visible = false">取消</el-button>
          <el-button type="primary" @click="confirmEdit">确认</el-button>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Upload, Edit } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

// 用户信息
const userInfo = ref({
  username: localStorage.getItem('userId'),
  gender: '男',
  email: 'zhangsan@example.com',
  phone: '13800138000',
  avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
})

// 编辑对话框状态
const editDialog = ref({
  visible: false,
  field: '',
  label: '',
  value: ''
})

// 显示编辑对话框
const showEditDialog = (field) => {
  editDialog.value = {
    visible: true,
    field,
    label: field === 'email' ? '邮箱' : '手机号码',
    value: userInfo.value[field]
  }
}

// 确认编辑
const confirmEdit = () => {
  userInfo.value[editDialog.value.field] = editDialog.value.value
  editDialog.value.visible = false
}

// 更换头像
const handleAvatarChange = (file) => {
  const reader = new FileReader()
  reader.onload = (e) => {
    userInfo.value.avatar = e.target.result
  }
  reader.readAsDataURL(file.raw)
}

// 保存修改
const handleSave = () => {
  ElMessage.success('个人信息已保存')
}

// 重置信息
const handleReset = () => {
  ElMessage.info('已重置修改')
}
</script>

<style scoped>
.section-title {
  color: #1a2f3a;
  border-bottom: 2px solid #ffd04b;
  padding-bottom: 10px;
  margin-bottom: 20px;
}
.profile-container {
  display: flex;
  justify-content: center;
  padding: 30px;
}

.profile-card {
  width: 100%;
  max-width: 800px;
  border-radius: 12px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
}

.avatar-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
}

.profile-avatar {
  margin-bottom: 15px;
  border: 3px solid #fff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.avatar-uploader {
  margin-top: 10px;
}

.info-section {
  margin-bottom: 30px;
}

.profile-descriptions {
  margin: 0 auto;
  max-width: 600px;
}

:deep(.profile-descriptions .el-descriptions__title) {
  font-size: 18px;
  color: #333;
  margin-bottom: 20px;
}

:deep(.profile-descriptions .el-descriptions__label) {
  width: 100px;
  font-weight: 500;
  color: #666;
}

.action-section {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 30px;
}

:deep(.el-tag) {
  font-size: 14px;
}

:deep(.el-button--text) {
  margin-left: 10px;
  padding: 0;
}
</style>
