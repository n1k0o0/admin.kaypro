<template>
  <el-upload
    ref="uploader"
    :auto-upload="false"
    :class="{'hide-upload': hideUploadIcon}"
    :on-preview="onPreview"
    :on-remove="onRemove"
    :on-change="onChange"
    :file-list="image ? [image] : []"
    :limit="1"
    accept=".png,.jpg,.jpeg,.mp4"
    action="#"
    list-type="text"
  >
    <el-icon
      class="avatar-uploader-icon"
    >
      <plus />
    </el-icon>
  </el-upload>
</template>

<script>
import {Plus} from '@element-plus/icons'

export default {
  name: "SingleImageUploader",
  components:{
    Plus
  },
  props: {
    image: {
      type: Object,
      default: null,
    },
    hideUploadIcon: {
      default: false,
      type: Boolean,
    },
    onPreview: {
      required: false,
      default: () => (function () {}),
      type: Function,
    },
    onRemove: {
      required: true,
      type: Function,
    },
    onChange: {
      required: true,
      type: Function,
    },
  }
}
</script>

<style>
.single-image-uploader.hide-upload div.el-upload.el-upload--picture-card {
  display: none;
}
.el-icon-plus.avatar-uploader-icon {
  color: #8c939d !important;
}
</style>
