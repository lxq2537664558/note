
let stream = weex.requireModule('stream');
let navigator = weex.requireModule("navigator");

export default {
    methods: {
        jump(to) {
            if (this.$router) {
                this.$router.push(to)
            }
        },
        GET (api, callback) {
            return stream.fetch({
                method: 'GET',
                type: 'json',
                url: 'http://cdn.zwwill.com/yanxuan/' + api
                // url: 'http://10.242.69.181:8089/yanxuan/' + api
            }, callback)
        },
				// 跳转
				jumpUrl(url) {
        	console.log(url)
					// navigator.push({
					// 	url: "./detail.html",
					// 	animated: "true"
					// });
				},
				jumpReturnUrl() {

				},
				test() {
        	console.log(1)
				}
    }
}
