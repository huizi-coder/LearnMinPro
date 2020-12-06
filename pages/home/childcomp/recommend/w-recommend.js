// pages/home/childcomp/recommend/w-recommend.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    recommends:{
      type:Array,
      value:[]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    isload:false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    imgload(){
      if(!this.data.isload){
        this.data.isload=true
        this.triggerEvent('imgisload')
        console.log('图片加载完成')
      }
    }
  }
})
