<template>
  <BaseLayout>
    <router-view />
  </BaseLayout>
</template>

<script>
import BaseLayout from '@/views/Layout/index.vue'
export default {
  name: 'Index',

  mixins: [],

  components: {
    BaseLayout,
  },

  props: {
    header: String,
  },

  data() {
    return {}
  },

  computed: {},

  watch: {},

  created() {},

  mounted() {},

  destroyed() {},

  methods: {},
}
</script>

<style lang="less" scoped></style>
