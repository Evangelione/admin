<template>
  <el-upload
    action="https://jsonplaceholder.typicode.com/posts/"
    :before-upload="beforeUpload"
    :before-remove="beforeRemove"
    :on-preview="handlePreview"
    :on-remove="handleRemove"
    :on-exceed="handleExceed"
    list-type="picture"
  >
    <el-button size="small" type="primary">点击上传</el-button>
    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过512kb</div>
  </el-upload>

  <!-- <el-upload
    :http-request="_uploadImg"
    list-type="picture-card"
    :before-remove="_beforeRemoveImage"
    :limit="limit"
    :file-list="fileList"
    ref="upload"
  >
    <i class="el-icon-plus"></i>
    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
  </el-upload> -->
</template>

<script>
export default {
  name: 'UploadImage',

  mixins: [],

  components: {},

  props: {
    limit: {
      type: Number,
      required: true,
    },
  },

  data() {
    return {
      fileList: [],
    }
  },

  computed: {},

  watch: {},

  created() {},

  mounted() {},

  destroyed() {},

  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
    handleExceed() {
      this.$message.warning(`最多上传 ${this.limit} 个文件`)
    },
    beforeRemove(file) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    beforeUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isPNG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 / 1024 < 512

      if (!isJPG && !isPNG) {
        this.$message.error('上传头像图片只能是 JPG 或 PNG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 512KB!')
      }
      return isJPG && isLt2M
    },
  },
}
</script>

<style lang="less" scoped></style>
