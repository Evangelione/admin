<template>
  <el-dialog title="坐标拾取" :visible.sync="visible">
    <baidu-map class="map" :scroll-wheel-zoom="true" :zoom="15" @ready="ready" :center="center">
      <i class="el-icon-location point" />
    </baidu-map>
    <div style="margin-top: 14px;margin-bottom: 14px;">
      当前城市：{{ city }} - 当前坐标：{{ lng }}, {{ lat }} - {{ address }}
    </div>
    <input type="text" placeholder="输入地址" style="margin-right: 8px;width: 280px;" v-model="search" />
    <el-button size="small" @click="handleSearch">查询</el-button>
    <el-button size="small" @click="handleConfirm">确定</el-button>
  </el-dialog>
</template>

<script>
export default {
  name: '',

  mixins: [],

  components: {},

  props: {
    center: {
      type: [Object, String],
      default: '杭州',
    },
  },

  data() {
    return {
      visible: false,
      lng: '',
      lat: '',
      city: '',
      address: '',
      map: '',
      geoc: '',
      search: '',
    }
  },

  computed: {},

  watch: {},

  created() {},

  mounted() {},

  destroyed() {},

  methods: {
    ready({ BMap, map }) {
      console.log(BMap, map)
      const geolocation = new BMap.Geolocation()
      // Geocoder类用于用户地址解析
      const geoc = new BMap.Geocoder()
      this.geoc = geoc
      this.map = map
      geolocation.getCurrentPosition(
        r => {
          if (geolocation.getStatus() == 0) {
            console.log(r)
            alert('您的位置：' + r.point.lng + ',' + r.point.lat)
            this.lng = r.point.lng
            this.lat = r.point.lat
            this.city = r.address.city
            map.panTo(r.point)
            geoc.getLocation(r.point, rs => {
              const addComp = rs.addressComponents
              this.address = addComp.province + addComp.city + addComp.district + addComp.street + addComp.streetNumber
            })
          } else {
            alert('failed' + this.getStatus())
          }
        },
        { enableHighAccuracy: true }
      )
      map.addEventListener('dragend', () => {
        const point = map.getCenter()
        this.lng = point.lng
        this.lat = point.lat
        geoc.getLocation(point, rs => {
          const addComp = rs.addressComponents
          this.address = addComp.province + addComp.city + addComp.district + addComp.street + addComp.streetNumber
        })
      })
    },
    show() {
      this.visible = true
    },
    handleSearch() {
      this.geoc.getPoint(
        this.search,
        point => {
          if (point) {
            this.map.centerAndZoom(point, 16)
            this.lng = point.lng
            this.lat = point.lat
            this.geoc.getLocation(point, rs => {
              const addComp = rs.addressComponents
              this.address = addComp.province + addComp.city + addComp.district + addComp.street + addComp.streetNumber
            })
          } else {
            alert('您选择地址没有解析到结果!')
          }
        },
        this.city
      )
    },
    handleConfirm() {
      this.$emit('confirm', this.lng, this.lat, this.address)
      this.visible = false
    },
  },
}
</script>

<style lang="less" scoped>
.map {
  position: relative;
  width: 100%;
  height: 500px;

  .point {
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -15px;
    margin-left: -15px;
    font-size: 30px;
    color: red;
  }
}

/deep/.el-dialog {
  margin-top: 6vh !important;
}
</style>
