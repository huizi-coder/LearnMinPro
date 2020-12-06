// components/goods-item/w-goods-item.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    good:{
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
    btnclick(event){
      const info=this.properties.good
      // console.log(info)
      this.triggerEvent('tabclick',{info:info})
    }
  }
})
