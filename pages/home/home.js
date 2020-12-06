// pages/home/home.js
import{
  getMultidata,
  getgoods
}from'../../network/home.js'

// const DB = wx.cloud.database().collection("goods")

const types = ['clothes','skirt','shose']
const Top=500

Page({
  /**
   * 页面的初始数据
   */
  data: {
    banners:[],
    recommends:[],
    goods:{
      clothes:{list:[]},
      skirt:{list:[]},
      shose:{list:[]}
    },
    currenttype:'clothes',
    isshow:false,
    isfixed:false,
    top:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    getMultidata().then(res=>{
      // console.log(res)
      const banners=res.data.data.banner.list;
      const recommends=res.data.data.recommend.list;
      // console.log(banners)
      this.setData({
        banners:banners,
        recommends
      })
    })

    this.getgoods('clothes')
    this.getgoods('skirt')
    this.getgoods('shose')

    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },
  onPageScroll(options){
    const top=options.scrollTop
    const flag = top>Top
    const flag2 = top>=this.data.top
    // console.log(flag)
    if(flag!=this.data.isshow){
      this.setData({
        isshow:flag
      })
    }
    if(flag2!=this.data.isfixed){
      this.setData({
        isfixed:flag2
      })
    }
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log('底线')
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  tabitemclick(event){
    console.log(event)
    const index=event.detail.index
    const type=types[index]
    this.setData({
      currenttype:type
    })
  },
  getgoods(type){
    getgoods(type).then(res => {
      // res.data 是一个包含集合中有权限访问的所有记录的数据，不超过 20 条
     const goods=res.data
    //  console.log(goods)
     const oldlist=this.data.goods[type].list
     oldlist.push(...goods)
    //  console.log(oldlist)
     const typeKey=`goods.${type}.list`
     this.setData({
       [typeKey]:oldlist
     })
    })
  },
  imgisload(){
    wx.createSelectorQuery().select('#tabcontrol').boundingClientRect(rect=>{
      console.log(rect)
      const top=rect.top
      this.setData({
        top:top
      })
    }).exec()
  }
})