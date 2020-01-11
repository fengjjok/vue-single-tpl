<template>
  <div class="netWork">
    <div class="netWork-main">
      <div class="img">
      </div>
      <p>网络不给力，加载失败~</p>
      <div class="btn">
        <button class="comm-btn" type="button" @click="clickResetLoad">重新加载</button>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import "index";
</style>
<script type="text/ecmascript-6">
export default {
  props: [],
  components: {
  },
  data () {
    return {
      childHeaderObj: {
        title: '提现',
        isGiveUp: false,
        isTouming: false
      }
    }
  },
  methods: {
    clickResetLoad () {
      this.$router.back(-1)
    }
  }
}
</script>
