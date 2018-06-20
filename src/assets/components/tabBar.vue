<template>
  <div :class="['wrapper', isIpx() ? 'w-ipx' : '' ]">
    <div class="bar-item" @click="tabTo(key)" v-for="(nav, key) of bottomNav" style="align-items: center">
      <image :src="nav.logo +  (currentPageIndex == key ? '_active.png' : '.png')" alt=""
             style="width: 30px;height: 30px; margin-top: 15px"></image>
      <text class="bar-txt" :style="{fontSize: '28px', color: currentPageIndex == key ? '#fecd2e' : '#eeeeee'}">{{nav.title}}</text>
    </div>
  </div>
</template>
<style scoped>
  .iconfont {
    font-family: iconfont;
  }

  .wrapper {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 90px;
    flex-wrap: nowrap;
    flex-direction: row;
    justify-content: space-around;
    border-top-width: 1px;
    border-top-color: #d9d9d9;
    background-color: #303030;
  }
  .w-ipx {
    height: 140px;
  }
  .bar-item {
    flex: 1;
  }
  .bar-txt, .bar-ic {
    color: #666;
    text-align: center;
  }
  .bar-active {
    color: #b4282d;
  }
  .bar-ic {
    padding-top: 14px;
    font-size: 38px;
  }
  .bar-txt {
    font-size: 22px;
    padding-top: 2px;
  }

  .i-notice {
    position: absolute;
    top: 10px;
    right: 30px;
    height: 30px;
    width: 30px;
    border-radius: 100%;
    font-size: 26px;
    line-height: 30px;
    text-align: center;
    color: #fff;
    background-color: #f00;
  }

  .notice-dot {
    position: absolute;
    top: 15px;
    right: 40px;
    height: 15px;
    width: 15px;
    border-radius: 100%;
    background-color: #f00;
  }
</style>
<script>
	import _c from '@/Global.vue'
	const modal = weex.requireModule('modal');

	export default {
		props: ['currentPage'],
		computed: {},
		data() {
			return {
				// pIndexKey:'home',
				newBulletinLog: _c.sUrl + '/images/home.png',
				// // 选中的
				// bottomSelected: 0,
				bottomNav: [
					{
						'title': '首页',
						'logo': _c.sUrl + '/images/home',
						'url': 'Home'
						// 'url': 'ActivityDetails'
					},
					{
						'title': '线路中心',
						'logo': _c.sUrl + '/images/route_center',
						'url': 'RouteCenter'
					},
					{
						'title': '优惠中心',
						'logo': _c.sUrl + '/images/discount_center',
						'url': 'DiscountCenter'
					},
					{
						'title': '个人',
						'logo': _c.sUrl + '/images/my_center',
						'url': 'MyCenter'
					}
				],
				msgCenterLogo: _c.sUrl + '/images/msg_center.png',
				agentLogo: _c.sUrl + '/images/jinsha_topNav.png'
			}
		},
		created() {
      this.tabTo(this.currentPage)

			// this.$router.push(this.currentPage)
		},
		mounted() {
		},
		computed: {
			currentPageIndex() {
				switch (this.currentPage) {
					case 'Home':
						return 0
						break
					case 'RouteCenter':
						return 1
						break
					case 'DiscountCenter':
						return 2
						break
					case 'MyCenter':
					case 'VIPexplanation':
					case 'IntegralExchange':
					case 'ActivityDetails':
						return 3
						break
					case 'MsgRecode':
					case 'Setting':
						break
				}
			}
		},
		methods: {
			tabTo(index) {
				if (this.currentPageIndex === index) return;
				// this.bottomSelected = index;
				this.$emit('tabTo', {
					status: 'tabTo',
					data: {
						key: this.bottomNav[index].url
					}
				})
			},
      isIpx() {
				return _c.isIpx();
      }
		}
	}
</script>