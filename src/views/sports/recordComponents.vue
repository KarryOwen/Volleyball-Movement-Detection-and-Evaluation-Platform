<template>
  <div class="record-card">
    <!-- 序号 -->
    <div class="record-item index">
      {{ index }}
    </div>

    <!-- 模型 -->
    <div class="record-item model">
      {{ record.model }}
    </div>

    <!-- 用户 -->
    <div class="record-item user">
      {{ record.user }}
    </div>

    <!-- 原视频 -->
    <div class="record-item video">
      <video class="video-preview" :src="record.sourceVideo" controls disablePictureInPicture />
    </div>

    <!-- 结果视频 -->
    <div class="record-item video">
      <video class="video-preview" :src="record.resultVideo" controls disablePictureInPicture />
    </div>

    <!-- 处理时间 -->
    <div class="record-item time">
      {{ record.processTime }}
    </div>

    <!-- 操作栏 -->
    <div class="record-item actions">
      <el-button link @click="$emit('detail')">
        展示详情
      </el-button>
      <el-button type="danger" link @click="$emit('del')">
        删除
      </el-button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  record: {
    model: String,
    user: String,
    sourceVideo: String,
    resultVideo: String,
    processTime: String
  },
  index: [Number, String],
})

defineEmits(['del', 'detail'])
</script>

<style scoped>
.record-card {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 16px 24px;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: transform 0.2s ease;
  margin-bottom: 12px;
}

.record-card:hover {
  transform: translateY(-2px);
}

.record-item {
  font-size: 14px;
  color: #303133;
  font-weight: 500;
  white-space: nowrap;
}

.index {
  flex: 0 0 40px;
  font-weight: 600;
  color: #409eff;
}

.model {
  flex: 0 0 160px;
}

.user {
  flex: 0 0 100px;
}

.video {
  flex: 1 0 240px;
}

.time {
  flex: 0 0 80px;
  color: #909399;
}

.actions {
  flex: 0 0 80px;
  display: flex;
  gap: 8px;
}

.video-preview {
  width: 240px;
  height: 135px;
  border-radius: 6px;
  background: #000;
  object-fit: contain;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.video-preview::-webkit-media-controls-panel {
  background: rgba(0, 0, 0, 0.5);
}

.el-button {
  padding: 8px;
  transition: opacity 0.2s;
}

.el-button:hover {
  opacity: 0.8;
}
</style>
