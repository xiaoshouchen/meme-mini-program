import { apiFuncs } from "../../../utils/apiFuncs.js";
import { funcs } from "../../../utils/funcs.js";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageNo: 1,
    tagId: 0,
    faceList: [],
    title: ""
  },

  /**
   * 获取表情列表
   */
  getFaceList: function (id, pageNo = 1) {
    let that = this;
    wx.showNavigationBarLoading();
    apiFuncs.getFaceListByTag(id, pageNo).then(res => {
      if (res.code == 2000 && res.data.length > 0) {
        let newList = that.data.faceList.concat(res.data);
        that.setData({
          faceList: newList,
          pageNo: pageNo + 1
        });
      }
      wx.hideNavigationBarLoading();
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.info(" [ list.js ] =============== onLoad >>>>> options = ", options);
    let that = this,
      tagId = options.tagId;
    wx.setNavigationBarTitle({
      title: options.tag
    });
    that.setData({
      tagId: tagId
    });
    that.getFaceList(tagId);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    let that = this;
    that.getFaceList(that.data.tagId, that.data.pageNo);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return funcs.getShareData();
  }
})