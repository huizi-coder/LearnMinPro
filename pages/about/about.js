// pages/about/about.js
import{
  getcatelist,
  getcurrentcate
}from'../../network/cate.js'

const adb=wx.cloud.database()
const test = adb.collection('goods')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    catelist:[],
    title:['精品推荐','上衣','裤裙','鞋子','皮包','护肤彩妆','饰品','精品推荐','上衣','裤裙','鞋子','皮包','护肤彩妆','饰品','精品推荐','上衣','裤裙','鞋子','皮包','护肤彩妆','饰品','精品推荐','上衣','裤裙','鞋子','皮包','护肤彩妆','饰品'],
    currenttype:'精品推荐',
    currentcontent:[]
  },

  onLoad(){
    this.getcatelist()
    this.getcurrentcontent()
  },
  addifo(){
    test.add({
      // data 字段表示需新增的 JSON 数据
      data: {
        name: "lphe",
        age: 18,
      }
    })
    .then(res => {
      console.log(res)
    })
  },
  searchifo(){
    test.get().then(res=>{
      console.log(res)
    })
  },
  listitemclick(event){
    wx.showLoading({
      title: '加载中',
      mask:true
    })
    // console.log(event)
    const index=event.detail.index
    const type=this.data.title[index]
    this.setData({
      currenttype:type
    })
    this.getcurrentcontent()
  },
  getcatelist(){
    getcatelist().then(res =>{
      console.log(res)
      const catelist=res.data
      var catetitle=[]
      for (let i of catelist) {
        catetitle.push(i.title)
      }
      this.setData({
        catelist:catelist,
        title:catetitle
      })
    })
  },
  getcurrentcontent(){
    const ctype=this.data.currenttype
    getcurrentcate(ctype).then(res=>{
      wx.hideLoading({
        success: (res) => {
          // console.log('隐藏成功')
        },
      })
      // console.log(res.data[0].cates)
      const cates=res.data[0].cates
      this.setData({
        currentcontent:cates
      })
    })
  },
  imgisload(){
    console.log('加载完成')
    wx.hideLoading({
      success: (res) => {},
    })
  }
})