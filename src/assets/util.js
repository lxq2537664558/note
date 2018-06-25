// let navigator = weex.requireModule("navigator");
const stream = weex.requireModule('stream');
const storage = weex.requireModule('storage')
const modal = weex.requireModule('modal')

const Utils = {
  isTaobao() {
    const {appName} = weex.config.env;
    return /(tb|taobao|淘宝)/i.test(appName);
  },
  isTrip() {
    const {appName} = weex.config.env;
    return appName === 'LX';
  },
  isBoat() {
    const {appName} = weex.config.env;
    return appName === 'Boat' || appName === 'BoatPlayground';
  },
  isWeb() {
    const {platform} = weex.config.env;
    return typeof (window) === 'object' && platform.toLowerCase() === 'web';
  },
  isIOS() {
    const {platform} = weex.config.env;
    return platform.toLowerCase() === 'ios';
  },
  /**
   * 是否为 iPhone X
   * @returns {boolean}
   */
  isIPhoneX() {
    const {deviceHeight} = weex.config.env;
    if (this.isWeb()) {
      return typeof window !== undefined && window.screen && window.screen.width && window.screen.height && (parseInt(window.screen.width, 10) === 375) && (parseInt(window.screen.height, 10) === 812);
    }
    return this.isIOS() && deviceHeight === 2436;
  },
  isAndroid() {
    const {platform} = weex.config.env;
    return platform.toLowerCase() === 'android';
  },
  isAlipay() {
    const {appName} = weex.config.env;
    return appName === 'AP';
  },
  isTmall() {
    const {appName} = weex.config.env;
    return /(tm|tmall|天猫)/i.test(appName);
  },
  isAliWeex() {
    return this.isTmall() || this.isTrip() || this.isTaobao();
  },
  decodeIconFont(text) {
    // 正则匹配 图标和文字混排 eg: 我去上学校&#xe600;,天天不&#xe600;迟到
    const regExp = /&#x[a-z|0-9]{4,5};?/g;
    if (regExp.test(text)) {
      return text.replace(new RegExp(regExp, 'g'), function (iconText) {
        const replace = iconText.replace(/&#x/, '0x').replace(/;$/, '');
        return String.fromCharCode(replace);
      });
    } else {
      return text;
    }
  },
  GET(api, data, callback, failCallback, clearLogin) {
    let self = this
    let url = 'http://api.hy590.vip/' + api
    // let url = 'http://my.vuethink.com/' + api
    // 有参数的话  拼接为字符串加在 url后面
    if (data.length > 0) {
      let formStr = ''
      data.forEach((el) => {
        if (el.name) {
          formStr += el.name + '=' + el.value + '&'
        }
      })

      if (formStr) {
        url += '?' + formStr.substr(0, formStr.length - 1)
      }
    }

    let header = {
      'dev-type': WXEnvironment.platform
    }
    storage.getItem('userInfo', e => {
      if (e.result == 'success') {
        let userInfo = {}
        if (e.data) {
          userInfo = JSON.parse(e.data)
        }

        header.authKey = userInfo.auth
        // console.log(userInfo)
        self.getRequest(url, header, callback, failCallback, clearLogin)
      } else {
        self.getRequest(url, header, callback, failCallback, clearLogin)
      }
    })
  },
  POST(api, data, callback, failCallback, clearLogin) {
    let self = this
    let url = 'http://api.hy590.vip/' + api
    // let url = 'http://my.vuethink.com/' + api
    // 有参数的话  拼接为字符串加在 url后面
    let body = {}
    if (data.length > 0) {
      body = data
    }

    let header = {
      'dev-type': WXEnvironment.platform
    }

    storage.getItem('userInfo', e => {
      if (e.result == 'success') {
        let userInfo = {}
        if (e.data) {
          userInfo = JSON.parse(e.data)
        }

        header.authKey = userInfo.auth
        // console.log(userInfo)
        self.getRequest(url, header, callback, failCallback, clearLogin, 'POST', body)
      } else {
        self.getRequest(url, header, callback, failCallback, clearLogin, 'POST', body)
      }
    })
  },
  getRequest(url, header, callback, failCallback, clearLogin, method, body) {
    let fetchData = {
      type: 'json',
      // headers: header,
      url: url,
    }
    if (body) {
      fetchData.body = body
    }
    if (method) {
      fetchData.method = method;
    } else {
      fetchData.method = "GET";
      fetchData.headers = header
    }
    // console.log(fetchData)
    stream.fetch(fetchData, (rst) => {
      // console.log(rst)
      if (rst.data) {
        if (rst.data.code == 200) {
          callback(rst)
        } else if (rst.data.code == 101 || rst.data.code == 102) {
          // 验证失败
          // 提示信息
          // 删除用户登录信息  和缓存
          clearLogin(rst.data)
        } else {
          failCallback(rst)
        }
      } else {
        failCallback(rst)
      }
    }, (rst) => {
    })
  },
  // 本地缓存 storage
  getCache(key, action, fialAction) {
    if (key === null || key === '') {
      // key值不能为空
      return false
    }

    storage.getItem(key, (e) => {
      if (e.result == 'success') {
        action(e);
      } else {
        fialAction(e);
      }
    })
  },

  setCache(key, value) {
    if (key === null || key === '') {
      // key值不能为空
      return false
    }

    if (value === '' || value === null) {
      // 删除
      storage.removeItem(key, e => {
      })
    } else {
      storage.setItem(key, value, e => {
      })
    }
  }
}

export default Utils
