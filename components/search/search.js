// components/search/search.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    showMask: false,
    content: ""
  },

  /**
   * 组件的方法列表
   */
  methods: {

    /**
     * 搜索
     */
    __search: function () {
      let that = this;
      wx.navigateTo({
        url: "/pages/index/search/search?key=" + that.data.content
      });
      that.setData({
        content: ""
      });
    },

    /**
     * 输入监听
     * @param {*} e 
     */
    __onInput: function (e) {
      console.info(" [ search.js ] ================== __onInput >>>>> e = ", e);
      let that = this;
      that.setData({
        content: e.detail.value
      });
    },

    /**
     * 清除输入框数据
     */
    __clear: function () {
      let that = this;
      that.setData({
        content: ""
      });
    },

    /**
     * 获取焦点
     */
    __onFocus: function () {
      let that = this;
      that.setData({
        showMask: true
      });
    },

    /**
     * 失去焦点
     */
    __onBlur: function () {
      let that = this;
      that.setData({
        showMask: false
      });
    },

    __catchTouchMove: function () {

    }
  }
})