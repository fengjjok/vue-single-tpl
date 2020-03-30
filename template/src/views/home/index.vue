<template>
  <div class="home">
    <div class='xinghuan'></div>
    Home Page
  </div>
</template>

<script>
export default {
  name: 'home',
  created () {
    this.initData()
  },
  mounted () {
  },
  methods: {
    initData () {
      // http请求示例
      this.$http({
        url: this.$apiUrl.vip_scData,
        data: {
          gid: 267
        },
        success: (res) => {
          console.log('res ===>', res)
        }
      })
    }
  }
}
</script>
<style lang="scss"  scoped>
  .xinghuan{
    width: 300px;
    height: 300px;
    margin: 0 auto;
    @include border-onepx-round(rgb(201, 41, 41), 20px)
  }
</style>
