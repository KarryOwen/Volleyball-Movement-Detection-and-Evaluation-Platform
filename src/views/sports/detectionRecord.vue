<template>
  <!-- 弹窗主体 -->
  <el-dialog v-model="dialogVisible" title="视频分析对比" width="80%" class="video-dialog">
    <div class="video-comparison">
      <!-- 原视频区域 -->
      <div class="video-column">
        <div class="video-header">
          <el-icon>
            <VideoCamera />
          </el-icon>
          <h3>原始视频</h3>
        </div>
        <div class="video-container">
          <video v-if="sourceVideo" controls :src="sourceVideo" class="video-player"></video>
          <div v-else class="video-placeholder">
            <el-icon>
              <Picture />
            </el-icon>
          </div>
        </div>
      </div>

      <!-- 分割线 -->
      <div class="divider"></div>

      <!-- 结果视频区域 -->
      <div class="video-column">
        <div class="video-header">
          <el-icon>
            <DataAnalysis />
          </el-icon>
          <h3>分析结果</h3>
        </div>
        <div class="video-container">
          <video v-if="resultVideo" controls :src="resultVideo" class="video-player"></video>
          <div v-else class="video-placeholder">
            <el-icon>
              <Files />
            </el-icon>
          </div>
        </div>
      </div>
    </div>

    <template #footer>
      <el-button @click="dialogVisible = false">关闭</el-button>
    </template>
  </el-dialog>
  <div class="training-container">
    <h2 class="section-title">检测记录</h2>
    <div class="directory-header">
      <div class="header-item index">序号</div>
      <div class="header-item model">分析模型</div>
      <div class="header-item user">用户</div>
      <div class="header-item video">原始视频</div>
      <div class="header-item video">结果视频</div>
      <div class="header-item time">处理耗时</div>
      <div class="header-item actions">操作</div>
    </div>
    <Record v-for="(e, i) in records" :key="i" @detail="openModal" @del="delrec(i)" :record="e" :index="i + 1"></Record>
  </div>
</template>

<script setup>
import Record from '@/views/sports/recordComponents.vue'
import { ref } from 'vue';
import {
  VideoCamera,
  DataAnalysis,
  Picture,
  Files
} from '@element-plus/icons-vue'

// 弹窗显示状态
const dialogVisible = ref(false)

// 视频地址（示例数据）
const sourceVideo = ref('https://example.com/source.mp4')
const resultVideo = ref('https://example.com/result.mp4')

// 打开弹窗
const openModal = () => {
  dialogVisible.value = true
  // 在这里修改视频地址
}
const records = ref([{
  model: 666,
  user: 1,
  sourceVideo: null,
  resultVideo: null,
  processTime: 6666
}, {
  model: 666,
  user: 2,
  sourceVideo: null,
  resultVideo: null,
  processTime: 6666
}, {
  model: 666,
  user: 3,
  sourceVideo: null,
  resultVideo: null,
  processTime: 6666
}])
// 删除record
const delrec = (id) => {
  records.value = records.value.filter((e, i) => i !== id)
}
</script>

<style scoped>
.section-title {
  color: #1a2f3a;
  border-bottom: 2px solid #ffd04b;
  padding-bottom: 10px;
  margin-bottom: 20px;
}

.directory-header {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 12px 24px;
  background: #f8f9fa;
  border-radius: 8px;
  margin-bottom: 8px;
}

.header-item {
  font-size: 13px;
  font-weight: 600;
  color: #606266;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.index {
  flex: 0 0 40px;
}

.model {
  flex: 0 0 160px;
}

.user {
  flex: 0 0 100px;
}

.video {
  flex: 0 0 240px;
}

.time {
  flex: 0 0 150px;
}

.actions {
  flex: 0 0 80px;
}
</style>
