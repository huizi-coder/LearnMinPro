const DB = wx.cloud.database().collection("catelist")
export function getcatelist(){
  return DB.get()
}
export function getcurrentcate(type){
  return DB.where({
    title:type
  }).get()
}