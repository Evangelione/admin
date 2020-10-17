<template>
  <div>
    <el-button @click="$router.push('/merchant/form')" type="primary">创建商户</el-button>
    <el-table :data="tableData" style="width: 100%" v-loading="loading">
      <el-table-column label="商户名称" prop="name"></el-table-column>
      <el-table-column label="logo" prop="logo">
        <template slot-scope="scope">
          <el-image style="width: 100px; height: 100px" :src="scope.row.logo"></el-image>
        </template>
      </el-table-column>
      <el-table-column label="联系人" prop="contact"></el-table-column>
      <el-table-column label="联系方式" prop="tel"></el-table-column>
      <el-table-column label="邮箱" prop="email"></el-table-column>
      <el-table-column label="地址" prop="address"></el-table-column>
      <el-table-column label="账号" prop="account"></el-table-column>
      <el-table-column label="介绍图片" prop="images">
        <template slot-scope="scope">
          <el-button @click="handlePreView(scope.row)" size="small" type="text">查看多图</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="handleModify(scope.row)" size="small" type="text">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :total="total"
      @current-change="handleCurrentChange"
      background
      hide-on-single-page
      layout="prev, pager, next"
    ></el-pagination>

    <!-- 查看多图 -->
    <el-dialog title="环境多图" :visible.sync="prewViewVisible">
      <el-carousel :interval="5000" arrow="always">
        <el-carousel-item v-for="(item, index) in preViewList" :key="index">
          <h3>{{ item }}</h3>
        </el-carousel-item>
      </el-carousel>
    </el-dialog>
  </div>
</template>

<script>
import api from '@/api/merchants'

export default {
  name: 'MerchantIndex',

  mixins: [],

  components: {},

  props: {},

  data() {
    return {
      loading: true,
      tableData: [],
      page: 1,
      total: 0,
      preViewList: [],
      prewViewVisible: false,
    }
  },

  computed: {},

  watch: {},

  created() {},

  mounted() {
    this.merchantList()
  },

  destroyed() {},

  methods: {
    merchantList(page = 1) {
      api.merchantList({ page, size: 10 }).then(res => {
        console.log(res)
        this.loading = false
        this.tableData = res.data.rows
        this.total = res.data.count
      })
    },
    handleCurrentChange(val) {
      console.log(val)
      this.merchantList(val)
    },
    handleModify(item) {
      console.log(item)
      this.$router.push(`/merchant/form/${item.id}`)
    },
    handlePreView(item) {
      this.prewViewVisible = true
      console.log(item)
      this.preViewList = item.images
    },
  },
}
</script>

<style lang="less">
.el-table {
  margin-top: 12px;
}

.el-pagination {
  text-align: right;
  margin-top: 8px;
}

.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
