<template>
  <div>
    <el-page-header @back="_goBack" content="商户创建" />
    <el-form :model="form" label-width="80px" ref="form">
      <el-form-item label="商户名称">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="账号">
        <el-input v-model="form.account" />
      </el-form-item>
      <el-form-item label="密码">
        <el-input show-password v-model="form.password" />
      </el-form-item>
      <el-form-item label="商户分类">
        <el-cascader :options="options" @change="handleChange" v-model="form.category"></el-cascader>
      </el-form-item>
      <el-form-item label="省市区">
        <district-picker @change="handleChange" v-model="form.area" />
      </el-form-item>
      <el-form-item label="详细地址">
        <el-input v-model="form.address" />
      </el-form-item>
      <el-form-item label="联系电话">
        <el-input v-model="form.tel" />
      </el-form-item>
      <el-form-item label="联系邮箱">
        <el-input v-model="form.email" />
      </el-form-item>
      <el-form-item label="状态">
        <el-switch v-model="form.status"></el-switch>
      </el-form-item>
      <el-form-item label="店员岗位">
        <el-checkbox-group v-model="form.emp">
          <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
          <el-checkbox label="地推活动" name="type"></el-checkbox>
          <el-checkbox label="线下主题活动" name="type"></el-checkbox>
          <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item>
        <el-button :loading="loading" @click="onSubmit" type="primary">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import api from '@/api/merchants'
import common from '@/api/common'
import DistrictPicker from '@/components/DistrictPicker'

export default {
  name: 'MerchantForm',

  mixins: [],

  components: {
    DistrictPicker,
  },

  props: {},

  data() {
    return {
      loading: false,
      form: {
        name: '',
        account: '',
        password: '',
        category: [],
        area: [],
        address: '',
        tel: '',
        email: '',
        status: false,
        emp: [],
      },
      props: {
        label: 'name',
        value: 'id',
        lazy: true,
        lazyLoad: (node, resolve) => {
          const { level, value } = node
          if (!this.district.length) {
            resolve()
            return
          }
          common.district(value).then(res => {
            if (level === 2) {
              resolve(
                res.data.map(item => {
                  item.leaf = true
                  return item
                })
              )
              return
            }
            resolve(res.data)
          })
        },
      },
      district: [],
      options: [
        {
          value: 'ziyuan',
          label: '资源',
          children: [
            {
              value: 'axure',
              label: 'Axure Components',
            },
            {
              value: 'sketch',
              label: 'Sketch Templates',
            },
            {
              value: 'jiaohu',
              label: '组件交互文档',
            },
          ],
        },
      ],
    }
  },

  computed: {},

  watch: {},

  created() {},

  mounted() {
    const { id } = this.$route.params
    id && this.merchant(id)
    !id &&
      common.district().then(res => {
        this.district = res.data
      })
  },

  destroyed() {},

  methods: {
    merchant(id) {
      api.merchant(id).then(res => {
        const keys = Object.keys(this.form)
        keys.forEach(item => {
          if (item === 'category_id') {
            this.form[item] = res.data[item].split(',')
            return
          }
          if (item === 'area') {
            this.form[item] = [res.data.province_id, res.data.city_id, res.data.area_id]
            return
          }
          this.form[item] = res.data[item] || ''
        })
      })
    },
    handleChange(value) {
      console.log(value)
      this.form.area = value
    },
    onSubmit() {
      this.loading = true
      api
        .createMerchant({
          account: 'ccs2sd5',
          password: 'kan1676',
          name: '肯德基11',
          tel: '14033661275',
          category_id: '1,2',
          contact: 'cc',
          province_id: '12',
          city_id: '12',
          area_id: '12',
          address: '12',
          logo: '123',
        })
        .then(res => {
          console.log(res)
          this.loading = false
          console.log(res)
          // this.tableData = res.data.rows
          // this.total = res.data.count
        })
      console.log(this.form)
      console.log('submit!')
    },
  },
}
</script>

<style lang="less" scoped>
.el-form {
  margin-top: 20px;
}
</style>
