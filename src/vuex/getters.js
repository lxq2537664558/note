const getters = {
  getAaa: state => state.aaa,
	getAnnouncement: state => state.announcement,
	getSliderList: state => state.sliderList,
	getSubmitForm: state => state.submitForm,
	getLoading: state => state.loading,
	getUserInfo: state => state.userInfo,
	getHeadNav: state => state.headNav,
	getCurrentIndex: state => state.currentIndex,
	jumpUrl:state => state.jumpUrl,
	getTipList:state => state.tipList
}

export default getters
