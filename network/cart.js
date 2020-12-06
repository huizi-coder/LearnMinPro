const DB = wx.cloud.database().collection("goods")
export function getgoods(){
  return DB.get()
}