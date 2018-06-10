<template>
  <div>
    <head-nav @tabTo="onTabTo"></head-nav>
    <!--网址-->
    <scroller :class="['main-list']" offset-accuracy="300" loadmoreoffset="300">
      <div style="height: 280px;position: relative;">

        <div style="position: absolute;top: 0;left: 0;right: 0;bottom: 0;">
          <image :src="domainsBackground" alt="" style="height: 280px;width: 750px"></image>
        </div>
        <div style="flex: 1;flex-direction: row;justify-content: space-around;align-items: center;">
          <div @click="clickDomain(v.url)" v-for="v in domains" style=";height: 150px;width: 150px;border-color: #edc23b;border-width: 3px;border-style: solid;border-radius: 75px;justify-content: center;align-items: center">
            <text style="color: #edc23b;font-weight: 700;font-size: 30px;">{{v.title}}</text>
          </div>
        </div>
      </div>
      <!--公告-->
      <announcement :bulletinText="bulletinText"></announcement>
      <!--线路-->
      <!--<scroller style="height: 710px;background-color: #f1f1f1"></scroller>-->
      <list :class="['route-list']" style="background-color: #f1f1f1;">
        <cell style="height: 130px;" v-for="route in routes">
          <div style="background-color: #fff;height: 110px;margin-top: 20px;flex-direction: row;align-items: center">
            <div style="width: 169px;flex-direction: row">
              <image :src="newBulletinLog" alt="" style="margin-left: 20px;height: 30px;width: 30px;" ></image>
              <text style="margin-left: 10px;font-size: 22px;color: #555">{{route.title}}</text>
            </div>
            <div style="width: 1px;background-color: #aaa;height: 50px;"></div>
            <div style="width: 400px;justify-content: center;align-items: center">
              <text style="background-color: #f7f7f7;color: #f81c1b;font-size: 28px;padding-top: 5px;padding-bottom: 5px;padding-right: 30px;padding-left: 30px;border-radius: 30px">{{route.showUrl}}</text>
            </div>
            <div @click="clickRoute(route.url)" style="height: 110px;width: 180px;background-color: #ffcc2e;justify-content: center;align-items: center">
              <text style="font-size: 28px;color: #555;font-weight: 700;">进入游戏>></text>
            </div>
          </div>
        </cell>
      </list>
    </scroller>
  </div>
</template>
<script>
	import _globalConfig from '@/Global.vue'
	const _c = _globalConfig

	import HeadNav from '../components/headNav.vue';
	import AnCement from '../components/announcement.vue';

  export default {
    data() {
      return {
      	// 公告
				bulletinText: '啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊',
        // domain
        domains: [
          {
            'title': '1001.net',
            'url': '1005.net',
            'textClass': ''
          },
          {
            'title': '1005.net',
            'url': '1005.net',
            'textClass': ''
          },
          {
            'title': '1005.net',
            'url': '1005.net',
            'textClass': ''
          }
        ],
        domainsBackground: _c.sUrl + '/images/route_blurry_background.png',
        //  route
        routes: [
          {
            title: '线路一',
            showUrl: 'http://www.baidu.com',
            url: '1'
          },
          {
            title: '线路一',
            showUrl: 'http://www.baidu.com',
            url: '1'
          },
          {
            title: '线路一',
            showUrl: 'http://www.baidu.com',
            url: '1'
          },
          {
            title: '线路一',
            showUrl: 'http://www.baidu.com',
            url: '1'
          },
          {
            title: '线路一',
            showUrl: 'http://www.baidu.com',
            url: '1'
          },
          {
            title: '线路一',
            showUrl: 'http://www.baidu.com',
            url: '1'
          },
          {
            title: '线路一',
            showUrl: 'http://www.baidu.com',
            url: '1'
          },
          {
            title: '线路一',
            showUrl: 'http://www.baidu.com',
            url: '1'
          },
          {
            title: '线路一',
            showUrl: 'http://www.baidu.com',
            url: '1'
          },
          {
            title: '线路一',
            showUrl: 'http://www.baidu.com',
            url: '1'
          },
          {
            title: '线路一',
            showUrl: 'http://www.baidu.com',
            url: '1'
          },
          {
            title: '线路一',
            showUrl: 'http://www.baidu.com',
            url: '1'
          },
          {
            title: '线路一',
            showUrl: 'http://www.baidu.com',
            url: '1'
          },
          {
            title: '线路一',
            showUrl: 'http://www.baidu.com',
            url: '1'
          },
        ],
        newBulletinLog: _c.sUrl + '/images/new_bulletin.png',
        newBulletinText: '不计输赢天天返回优惠无需申请, 美东时间: 2018/4/30'
      }
    },
    methods: {
      clickDomain(url) {
        console.log(url)
      },
      clickRoute(url) {
        console.log(url)
      },
			onTabTo(url) {
				this.$parent.onTabTo({
					data: {
						key: url
					},
					status: 'navTabTo'
				})
			}
    },
    components: {
		  'head-nav': HeadNav,
		  'announcement': AnCement,
    },
		mounted() {
    	this.$parent.closeLoadding()
			// this.$parent.isShow = false
		}
  }
</script>
<style scoped>
  .domain {
    flex-direction: row;
    height: 280px;
  }
  .main-list {
    position: fixed;
    top: 110px;
    bottom: 90px;
    left: 0;
    right: 0;
  }
  .route-list {
    position: fixed;
    top: 430px;
    bottom: 90px;
    left: 0;
    right: 0;
  }
</style>