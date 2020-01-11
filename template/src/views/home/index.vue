<template>
  <div class="home">
    <div class='xinghuan'></div>
    Home Page
  </div>
</template>

<script>
import apiUrl from '@request/apiUrl'
export default {
  name: 'home',
  created () {
    this.initData()
  },
  mounted () {
  },
  methods: {
    initData () {
      this.$http({
        url: apiUrl.get_goods,
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
