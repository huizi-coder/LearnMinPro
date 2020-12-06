// components/search/w-search.js
Component({
    data: {
        inputShowed: false,
        inputVal: ""
    },
    methods:{
        showInput: function () {
            this.setData({
                inputShowed: true
            });
        },
        hideInput: function () {
            this.setData({
                inputVal: "",
                inputShowed: false
            });
        },
        clearInput: function () {
            this.setData({
                inputVal: ""
            });
        },
        inputTyping: function (e) {
            this.setData({
                inputVal: e.detail.value
            });
        }
    }
    
})
