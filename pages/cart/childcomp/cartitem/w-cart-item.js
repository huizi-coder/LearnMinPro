// pages/cart/childcomp/cartitem/w-cart-item.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    cartitem:{
      type:Object,
      value:{}
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
    add(){
      const info=this.properties.cartitem
      this.triggerEvent('cartadd',{info:info})
    },
    reduce(){
      const info=this.properties.cartitem
      this.triggerEvent('cartreduce',{info:info})
    },
    checkchanged(){
      const info=this.properties.cartitem
      this.triggerEvent('checkchange',{info:info})
    }
  }
})
