<template>
  <div class="training-container">
    <h2 class="section-title">运动检测</h2>
    <div class="container">
      <!-- 操作按钮区域 -->
      <div class="control-bar">
        <label class="custom-button primary">
          <input type="file" accept="video/*" @change="handleFileUpload" hidden>
          上传视频
        </label>
        <button class="custom-button success" @click="startProcessing">
          展示结果
        </button>
      </div>

      <!-- 内容展示区域 -->
      <div class="content-wrapper">
        <!-- 左侧评估面板 -->
        <div class="evaluation-panel">
          <div v-if="evaluationData" class="evaluation-content">
            <h3 class="section-title">运动评估报告</h3>
            <div class="score-display">
              <span class="score-value">{{ evaluationData.score }}</span>
              <span class="score-unit">分</span>
            </div>
            <div class="recommendation-box">
              <p class="recommendation-text">{{ evaluationData.recommendation }}</p>
            </div>
          </div>
          <div v-else class="empty-state">
            <p>等待分析结果...</p>
          </div>
        </div>

        <!-- 右侧视频播放器 -->
        <div class="video-container">
          <video ref="videoPlayer" class="video-player" controls :src="processedVideoUrl">
            您的浏览器不支持视频播放
          </video>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, } from 'vue'
import axios from 'axios'

// 视频处理相关
const videoFile = ref(null)
const processedVideoUrl = ref('')
const videoPlayer = ref(null)

// 评估数据
const evaluationData = ref({
  score: 88.5,
  recommendation: '动作总体标准，注意保持膝关节稳定。建议加强核心肌群训练，每周增加2次平衡练习。'
})

const handleFileUpload = async (event) => {
  const file = event.target.files[0]
  if (file) {
    videoFile.value = file
    const formData = new FormData()
    formData.append('file', file)
    // 这里添加实际的文件上传逻辑
    // 上传视频
    console.log(file)
    await axios.post('http://127.0.0.1:5000/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': localStorage.getItem('userToken')
      }
    }).then(ans => console.log(ans))
  }
}

const startProcessing = async () => {
  //if (!videoFile.value) return
  // 这里添加视频处理逻辑
  // 获取评分以及视频
  const rel = await axios.get('http://127.0.0.1:5000/download').then(ans => ans)
  console.log(rel)
  // processedVideoUrl.value =
}
// onBeforeUnmount(() => {
//   if (processedVideoUrl.value) {
//     URL.revokeObjectURL(processedVideoUrl.value)
//   }
// })

</script>

<style scoped>
.section-title {
  color: #1a2f3a;
  border-bottom: 2px solid #ffd04b;
  padding-bottom: 10px;
  margin-bottom: 20px;
}

.container {
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 1.5rem;
}

.control-bar {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
}

.custom-button {
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
}

.custom-button.primary {
  background: #4a90e2;
  color: white;
}

.custom-button.primary:hover {
  background: #357abd;
}

.custom-button.success {
  background: #34c759;
  color: white;
}

.custom-button.success:hover {
  background: #248a3d;
}

.content-wrapper {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 2rem;
  min-height: 600px;
}

.evaluation-panel {
  background: #ffffff;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.video-container {
  position: relative;
  width: 100%;
  background: #000;
  border-radius: 8px;
  overflow: hidden;
  max-width: 800px;
  max-height: 600px;
  /* aspect-ratio: '16:9'; */
}

.video-player {
  width: 100%;
  height: 100%;
  object-fit: contain;
  transition: transform 0.3s ease;
}

.section-title {
  color: #1a1a1a;
  margin-bottom: 1.5rem;
  font-size: 1.25rem;
}

.score-display {
  display: flex;
  align-items: baseline;
  margin-bottom: 2rem;
}

.score-value {
  font-size: 3.5rem;
  font-weight: 700;
  color: #4a90e2;
  margin-right: 0.5rem;
}

.score-unit {
  font-size: 1.2rem;
  color: #666;
}

.recommendation-box {
  background: #f8f9fa;
  border-radius: 8px;
  padding: 1.5rem;
}

.recommendation-text {
  color: #444;
  line-height: 1.6;
  margin: 0;
}

.empty-state {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
}
</style>
