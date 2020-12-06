import request from "./base.js"

const baseURL='http://123.207.32.32:8000/api/v1';

export function getMultidata(){
  return request({
    url:baseURL+'/home/multidata'
  })
}

const DB = wx.cloud.database().collection("goods")
export function getgoods(type){
  return DB.where({
    type:type
  }).get()
}