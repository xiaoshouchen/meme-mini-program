import {
  apiFuncs
} from "../../utils/apiFuncs.js";
import {
  funcs
} from "../../utils/funcs.js";

const app = getApp();
let url = "https://www.xiaochongleyuan.com/api";

Page({
  data: {
    lists: [],
    images: [],
    cate_id: 1,
    height: 0,
    pageNo: 1,
    currentType: "hottest",
    faceList: [],
    showLoading: false,
    scrollTop: 0,
    hotTagList: [],
    hideBulingbuling: false
  },

  /**
   * 滚动到顶部
   */
  scrollToTop: function() {
    let that = this;
    that.setData({
      scrollTop: 0
    });
  },

  /**
   * 搜索
   */
  search: function(e) {
    let data = e.detail.key;
    wx.navigateTo({
      url: "/pages/subpage/search/search?key=" + data + "&type=face"
    });
  },

  /**
   * 加载更多
   */
  loadMore: function(e) {
    let that = this;
    that.getFaceList(that.data.currentType, that.data.pageNo);
  },

  /**
   * 加载表情数据
   */
  getFaceList(type, pageNo = 1) {
    let that = this;
    wx.showNavigationBarLoading();
    apiFuncs.getStarFaces(type, pageNo).then(res => {
      wx.hideNavigationBarLoading();
      if (res.code != 2000) {
        return;
      }
      if (res.data.length > 0) {
        let newList = [];
        if (pageNo == 1) {
          newList = res.data;
        } else {
          newList = that.data.faceList.concat(res.data);
        }
        that.setData({
          faceList: newList,
          pageNo: pageNo + 1
        });
      } else {
        if (pageNo == 1) {
          that.setData({
            faceList: [],
            pageNo: pageNo
          })
        } else {
          that.setData({
            pageNo: pageNo
          });
        }
      }
    });
  },

  /** 
   * 修改分类
   */
  changeType: function(e) {
    console.info(" [ index.js ] ============= changeType >>>>> e = ", e);
    let that = this,
      data = e.currentTarget.dataset;
    that.setData({
      currentType: data.type
    });
    that.getFaceList(data.type, 1);
    that.scrollToTop();
  },

  onLoad: function() {
    let that = this;
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          height: res.windowHeight - 100
        })
      },
    });
    setTimeout(function callback() {
      that.setData({
        hideBulingbuling: true
      });
    }, 5000);
    that.getHotTagList();
    that.getFaceList("hottest", 1);
  },

  /**
   * 热门标签
   */
  getHotTagList: function() {
    let that = this;
    apiFuncs.getHotTag().then(res => {
      that.setData({
        hotTagList: res.data
      });
    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    let that = this;
    that.selectComponent('#search-bar').setContent("");
  },

  jumpToShare: function(e) {
    let [that, raw, src, faceId] = [this, e.currentTarget.dataset.raw, e.currentTarget.dataset.src, e.currentTarget.dataset.faceid];
    console.info(" raw = ", raw);
    console.info(" src = ", src);
    wx.navigateTo({
      url: '/pages/subpage/share/share?src=' + src + '&raw=' + raw + "$faceId=" + faceId,
    })
  },

  getmore: function() {
    this.setData({
      pageNo: this.data.pageNo + 1
    });
    let that = this;
    wx.request({
      url: url + '/bqb/images',
      header: {
        'content-type': 'application/json' // 默认值
      },
      data: {
        start: that.data.pageNo,
        cate_id: that.data.cate_id
      },
      success: function(res) {
        //console.log(res.data)
        if (res.data.data.length == 0) {
          wx.showToast({
            title: '已经加载全部',
          })
        }
        that.setData({
          images: that.data.images.concat(res.data.data)
        });
      },
    })

  },
  onShareAppMessage() {
    return funcs.getShareData();
  }
})