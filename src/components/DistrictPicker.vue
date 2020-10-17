<template>
  <el-cascader :options="district" :props="props" :value="value" @change="handleChange"></el-cascader>
</template>

<script>
import common from '@/api/common'

export default {
  name: 'DistrictPicker',

  mixins: [],

  components: {},

  props: {
    value: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
      district: [],
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
    }
  },

  computed: {},

  watch: {
    value() {
      this.get()
    },
  },

  created() {},

  mounted() {},

  destroyed() {},

  methods: {
    get() {
      common.district().then(province => {
        const p = province.data
        if (this.value[0]) {
          const pIndex = p.findIndex(item => item.id === this.value[0])
          common.district(this.value[0]).then(city => {
            const c = city.data
            if (this.value[1]) {
              const cIndex = c.findIndex(item => item.id === this.value[1])
              common.district(this.value[1]).then(area => {
                c[cIndex].children = area.data.map(item => {
                  item.leaf = true
                  return item
                })
                p[pIndex].children = c
                this.district = p
              })
            }
          })
        } else {
          this.district = p
        }
      })
    },
    handleChange(value) {
      this.$emit('change', value)
    },
  },
}
</script>

<style lang="less" scoped></style>
