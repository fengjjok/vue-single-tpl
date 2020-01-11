<template>
   <div class="mask-main">
        <transition name="fade" tag="div">
            <div class="mask" v-if="isShowMask" @click="clickMask"></div>
        </transition>
</div>
</template>
<style scoped lang="scss">
  /* 遮罩层 */
  .mask {
    position: fixed;
    left:0;
    top:0;
    bottom:0;
    right:0;
    background:rgba(0,0,0,.6);
    z-index: 100;
  }
</style>
<script type="text/ecmascript-6">
export default {
	props: ['isShowMask'],
	data () {
	return {
		scrollTop: 0
	}
  },
  watch: {
    isShowMask: {
        immediate: true,
		handler(newVal, oldVal) {
			if (newVal) {
			this.scrollTop = document.body.scrollTop || document.documentElement.scrollTop
			document.body.style = `position:fixed;top: -${this.scrollTop}px`
			} else {
			document.body.style = ''
			window.scrollTo(0, this.scrollTop)
			}
		}
	}
	},
	mounted () {
	},
	methods: {
		clickMask() {
			this.$emit('clickMask')
		}
	}
}
</script>
