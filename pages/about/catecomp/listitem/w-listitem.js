// pages/about/catecomp/listitem/w-listitem.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title:{
      type:Array,
      value:[]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    currentIndex:0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    itemclick(event){
      const index=event.currentTarget.dataset.index
      // console.log(event)
      this.setData({
        currentIndex:index
      })
      this.triggerEvent('listclick',{index:index,item:this.properties.title[index]})
    }
  }
})
