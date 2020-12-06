// pages/cart/childcomp/carttabbar/w-cart-tab.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    num:{
      type:Number,
      value:0
    },
    price:{
      type:Number,
      value:0
    },
    ischecked:{
      type:Boolean,
      value:false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    checkClick(){
      this.triggerEvent('cartcheckClick')
    }
  }
})
