// 此文封装文章数据相关请求
import request from '@/utils/request'

// 获取数据
export const getArticleList = () => {
  return request.get('/my/cate/list') // 所有请求一定要返回数据，否则会丢失异步
}

// 添加文章分类
export const addArticleCate = (data) => {
   return request.post('/my/cate/add', data) 
}

// 更新文章
export const updateArticleCate = (data) => {
 return request.put('/my/cate/info', data)
}

// 删除文章类型
export const deleteArticleCate = (id) => {
  return request.delete('/my/cate/del', {
    params: { id }
  })
}
