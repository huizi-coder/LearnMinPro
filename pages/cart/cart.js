// pages/cart/cart.js
import{
  getgoods
}from'../../network/cart.js'

import{
  chooseAddress,
  showModal
}from'../../utils/asyncWX.js'

import regeneratorRuntime from '../../utils/runtime.js'

Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    goodlist:[],
    isgetaddress:false,
    cartlist:[],
    totalPrice:0,
    totalNum:0,
    allChecked:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
      mask:true
    })
    getgoods().then(res=>{
      // console.log(res)
      wx.hideLoading({
        success: (res) => {
          // console.log('隐藏成功')
        },
      })
      const list=res.data
      this.setData({
        goodlist:list,
      })
    })

    
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
    const cartlist=wx.getStorageSync('cartlist') || []
    const address=wx.getStorageSync('address')
    if(address.userName){
      this.setData({
        isgetaddress:true
      })
    }
    this.recount()
    this.setData({
      address:address,
      cartlist,
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    // console.log()
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    // console.log("onUnload")
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  async btnclick(){
    // try {
    //   const res1= await getSetting()
    //   console.log(res1)
    //   const scopeAddress=res1.authSetting["scope.address"];
    //   // console.log(scopeAddress)
    //   console.log(scopeAddress)
    //   if(scopeAddress===false){
    //     await openSetting();
    //   }
    //   const res2=await chooseAddress()
    //   console.log(res2)
    // } catch (error) {
    //   // console.log(error)
    // }
    try {
      chooseAddress().then(res=>{
        // console.log(res)
        let address=res
        address.all=address.provinceName+address.cityName+address.countyName+address.detailInfo
        wx.setStorageSync('address', address)
      })
    } catch (error) {
      console.log(error)
    }
  },
  guessitemclick(info){
    const bool=this.data.isgetaddress
    if(bool){
      const thisInfo=info.detail.info
      const thiscart=this.data.cartlist
      const index=thiscart.findIndex(v=>v._id===thisInfo._id)
      if(index===-1){
        thisInfo.num=1;
        thisInfo.checked=false;
        thiscart.push(thisInfo)
      }else{
        thiscart[index].num++
      }
      // console.log(thiscart)
      // console.log(thisInfo)
      wx.setStorageSync('cartlist', thiscart)
      wx.showToast({
        title: '加入购物车成功',
        mask:true
      })
      this.setData({
        cartlist:thiscart
      })
    }else{
      wx.showToast({
        title: '请先选择收货地址',
        mask:true,
        image:"/assets/images/detail/warning.png"
      })
    }
  },
  cartadd(info){
    const thisInfo=info.detail.info
    const thiscart=this.data.cartlist
    const index=thiscart.findIndex(v=>v._id===thisInfo._id)
    thiscart[index].num++
    wx.setStorageSync('cartlist', thiscart)
    this.recount()
    this.setData({
      cartlist:thiscart
    })
  },
  async cartreduce(info){
    const thisInfo=info.detail.info
    const thiscart=this.data.cartlist
    const index=thiscart.findIndex(v=>v._id===thisInfo._id)
    if(thisInfo.num===1){
      await showModal({content:"您是否要删除商品"}).then(res=>{
        if(res.confirm){
          thiscart.splice(index,1)
          
        }
      })
    }else{
      thiscart[index].num--
    }
    wx.setStorageSync('cartlist', thiscart)
    this.recount()
    this.setData({
      cartlist:thiscart
    })
  },
  checkchange(info){
    const thisInfo=info.detail.info
    const thiscart=this.data.cartlist
    const index=thiscart.findIndex(v=>v._id===thisInfo._id)
    thiscart[index].checked=!thiscart[index].checked
    wx.setStorageSync('cartlist', thiscart)
    this.recount()
    this.setData({
      cartlist:thiscart,
    })
  },
  recount(){
    const cartlist=wx.getStorageSync('cartlist') || []
    const allChecked=cartlist.length?cartlist.every(v=>v.checked):false
    let totalPrice=0
    let totalNum=0
    cartlist.forEach(v=>{
      if(v.checked){
        totalPrice+=v.num*v.price;
        totalNum+=v.num
      }
    })
    this.setData({
      allChecked,
      totalNum,
      totalPrice
    })
  },
  cartcheckClick(){
    const allChecked=this.data.allChecked
    const currentChecked=!allChecked
    const cartlist=wx.getStorageSync('cartlist') || []
    cartlist.forEach(v=>{
      v.checked=currentChecked
    })
    wx.setStorageSync('cartlist', cartlist)
    this.setData({
      cartlist,
      allChecked:currentChecked
    })
    this.recount()
  }
})