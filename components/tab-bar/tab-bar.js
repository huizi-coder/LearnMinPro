// components/tab-bar/tab-bar.js
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
    tabitemClick(event){
      const index=event.currentTarget.dataset.index
      this.setData({
        currentIndex:index
      })
      this.triggerEvent('tabclick',{index:index,item:this.properties.title[index]})
    }
  }
})
