<template>
  <el-cascader :options="options" @change="handleChange" :props="props" :value="value" />
</template>

<script>
import common from '@/api/common'

export default {
  name: 'CategoryPicker',

  mixins: [],

  components: {},

  props: {},

  data() {
    return {
      options: [],
      value: [],
      props: {
        label: 'name',
        value: 'id',
        lazy: true,
        lazyLoad: (node, resolve) => {
          const { level, value } = node
          if (!this.options.length) {
            resolve()
            return
          }
          common.getCategoryList(value).then(res => {
            if (level === 1) {
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

  watch: {},

  created() {},

  mounted() {
    const { id } = this.$route.params
    !id &&
      common.getCategoryList().then(res => {
        this.options = res.data
      })
  },

  destroyed() {},

  methods: {
    handleChange(value) {
      this.$emit('change', value)
    },
    getDefault(arr) {
      this.value = arr
      common.getCategoryList().then(parent => {
        const p = parent.data
        if (arr[0]) {
          const pIndex = p.findIndex(item => item.id === arr[0])
          common.getCategoryList(arr[0]).then(child => {
            const c = child.data.map(item => {
              item.leaf = true
              return item
            })
            p[pIndex].children = c
            this.options = p
          })
        } else {
          this.options = p
        }
      })
    },
  },
}
</script>

<style lang="less" scoped></style>
