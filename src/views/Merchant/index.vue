<template>
  <div>
    <el-button @click="$router.push('/merchant/form')" type="primary">创建商户</el-button>
    <el-table :data="tableData" style="width: 100%" v-loading="loading" size="mini" :height="700">
      <el-table-column label="商户名称" prop="name"></el-table-column>
      <el-table-column label="logo" prop="logo">
        <template slot-scope="scope">
          <el-image style="width: 100px; height: 100px" :src="scope.row.logo" fit="contain"></el-image>
        </template>
      </el-table-column>
      <el-table-column label="介绍图片" prop="images">
        <template slot-scope="scope">
          <el-button @click="handlePreView(scope.row)" size="small" type="text">查看多图</el-button>
        </template>
      </el-table-column>
      <el-table-column label="联系方式" prop="tel"></el-table-column>
      <el-table-column label="邮箱" prop="email"></el-table-column>
      <el-table-column label="地址" prop="address"></el-table-column>
      <el-table-column label="账号" prop="account"></el-table-column>
      <el-table-column label="状态" prop="status">
        <template slot-scope="scope">
          <div v-if="scope.row.status === 0" class="danger">禁用</div>
          <div v-if="scope.row.status === 1" class="success">启用</div>
        </template>
      </el-table-column>
      <el-table-column label="注册时间" prop="status" width="150">
        <template slot-scope="scope">
          {{ $parseDate2Str(scope.row.created_at * 1000) }}
        </template>
      </el-table-column>

      <el-table-column label="商户账单" prop="images">
        <template slot-scope="scope">
          <el-button @click="handleModify(scope.row)" size="small" type="text">查看</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button @click="handleModify(scope.row)" size="small" type="text">访问</el-button>
          <el-button @click="handleModify(scope.row)" size="small" type="text">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :total="total"
      @current-change="handleCurrentChange"
      background
      layout="prev, pager, next"
    ></el-pagination>

    <!-- 查看多图 -->
    <el-dialog title="环境多图" :visible.sync="prewViewVisible">
      <el-carousel :interval="5000" arrow="always">
        <el-carousel-item v-for="(item, index) in preViewList" :key="index">
          <el-image class="preView" :src="item" fit="contain"></el-image>
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
      api.getMerchantList({ page, size: 10 }).then(res => {
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
      this.preViewList = item.images.split(';')
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

.preView {
  height: 100%;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
