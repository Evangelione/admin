<template>
  <div>
    <el-page-header @back="_goBack" content="商户创建" />
    <el-form :model="form" label-width="80px" :rules="rules" ref="form" size="small">
      <el-form-item label="商户名称" prop="name">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="商户介绍">
        <el-input v-model="form.introduction" />
      </el-form-item>
      <el-form-item label="logo" prop="logo">
        <UploadImage :limit="1" />
      </el-form-item>
      <el-form-item label="商户图片">
        <UploadImage :limit="5" />
      </el-form-item>
      <el-form-item label="联系电话">
        <el-input v-model="form.tel" />
      </el-form-item>
      <el-form-item label="联系邮箱" prop="email">
        <el-input v-model="form.email" />
      </el-form-item>
      <el-form-item label="商户分类">
        <CategoryPicker @change="handleChangeCategory" ref="categoryPicker" />
      </el-form-item>
      <el-form-item label="省市区">
        <DistrictPicker @change="handleChangeArea" ref="districtPicker" />
      </el-form-item>
      <el-form-item label="坐标">
        <el-button type="primary" size="small" @click="handleShowMap">拾取坐标</el-button>
        <span v-if="form.long && form.lat">当前坐标：{{ this.form.long }} , {{ this.form.lat }}</span>
      </el-form-item>
      <el-form-item label="详细地址">
        <el-input v-model="form.address" />
      </el-form-item>
      <el-form-item label="账号">
        <el-input v-model="form.account" />
      </el-form-item>
      <el-form-item label="密码">
        <el-input show-password v-model="form.password" />
      </el-form-item>
      <el-form-item label="状态">
        <el-switch v-model="form.status" />
      </el-form-item>
      <el-form-item>
        <el-button :loading="loading" @click="onSubmit" type="primary">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
    <CoordinatePicker ref="coordinatePicker" @close="dialogMapVisible = false" @confirm="handleMapConfirm" />
  </div>
</template>

<script>
import api from '@/api/merchants'
import CategoryPicker from '@/components/CategoryPicker'
import DistrictPicker from '@/components/DistrictPicker'
import UploadImage from '@/components/UploadImage'
import CoordinatePicker from '@/components/CoordinatePicker'

export default {
  name: 'MerchantForm',

  mixins: [],

  components: {
    CategoryPicker,
    DistrictPicker,
    UploadImage,
    CoordinatePicker,
  },

  props: {},

  data() {
    return {
      loading: false,
      form: {
        name: '',
        introduction: '',
        logo: '',
        images: '',
        tel: '',
        email: '',
        category_id: '',
        category_pid: '',
        province_id: '',
        city_id: '',
        area_id: '',
        circle_id: '',
        market_id: '',
        address: '',
        long: '',
        lat: '',
        account: '',
        password: '',
        status: false,
      },
      rules: {
        name: this.$validator.required,
        logo: [this.$validator.required, this.$validator.url],
        email: [this.$validator.required, this.$validator.email],
      },
      imageUrl: '',
      dialogMapVisible: false,
      center: '',
    }
  },

  computed: {},

  watch: {},

  created() {},

  mounted() {
    const { id } = this.$route.params
    id && this.merchant(id)
  },

  destroyed() {},

  methods: {
    merchant(id) {
      api.getMerchantInfo(id).then(res => {
        const keys = Object.keys(this.form)
        keys.forEach(item => {
          this.form[item] = res.data[item] || ''
        })
        this.$refs.categoryPicker.getDefault([res.data.category_pid, res.data.category_id])
        this.$refs.districtPicker.getDefault([
          res.data.districts.province_id,
          res.data.districts.city_id,
          res.data.districts.area_id,
        ])
      })
    },

    handleChangeCategory(value) {
      console.log(value)
      // this.form.category_id = value
    },
    handleChangeArea(value) {
      console.log(value)
      this.form.province_id = value[0]
      this.form.city_id = value[1]
      this.form.area_id = value[2]
    },
    onSubmit() {
      this.loading = true
      this.$refs.form.validate(valid => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
      // api
      //   .createMerchant({
      //     account: 'ccs2sd5',
      //     password: 'kan1676',
      //     name: '肯德基11',
      //     tel: '14033661275',
      //     category_id: '1,2',
      //     contact: 'cc',
      //     province_id: '12',
      //     city_id: '12',
      //     area_id: '12',
      //     address: '12',
      //     logo: '123',
      //   })
      //   .then(res => {
      //     console.log(res)
      //     this.loading = false
      //     console.log(res)
      //     // this.tableData = res.data.rows
      //     // this.total = res.data.count
      //   })
      console.log(this.form)
      console.log('submit!')
    },

    handleAvatarSuccess() {},
    beforeAvatarUpload() {},
    handleShowMap() {
      this.$refs.coordinatePicker.show()
    },
    handleMapConfirm(lng, lat, address) {
      console.log(lng)
      console.log(lat)
      console.log(address)
      this.form.long = lng
      this.form.lat = lat
      this.form.address = address
    },
  },
}
</script>

<style lang="less" scoped>
.el-form {
  margin-top: 20px;
}
</style>
