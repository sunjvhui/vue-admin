import axios from '@/libs/api.request'

export const getTableData = () => {
  return axios.request({
    url: 'get_table_data',
    method: 'get'
  })
}

export const errorReq = () => {
  return axios.request({
    url: 'error_url',
    method: 'post'
  })
}

export const saveErrorLogger = info => {
  return axios.request({
    url: 'save_error_logger',
    data: info,
    method: 'post'
  })
}
// 地址列表数据
export const getAddressList = (page) => {
  return axios.request({
    url: 'admin/address/list',
    params:{
      page
    },
    method: 'get'
  })
}
// 地址删除
export const deleteAddress = (address_id) => {
  return axios.request({
    url: '/admin/address/delete',
    params: {
      address_id
    },
    method: 'post'
  })
}
// 地址详情
export const addressInfo = (address_id) => {
  return axios.request({
    url: '/admin/address/info',
    params: {
      address_id
    },
    method: 'get'
  })
}
// 地址编辑
export const editAddress = address => {
  return axios.request({
    url: '/admin/address/update',
    data: address ,
    method: 'post'
  })
}

// 家具类型列表
export const getTypeList = (page) => {
  return axios.request({
    url: '/admin/furniture_type/list',
    params:{
      page
    },
    method: 'get'
  })
}
// 删除家具类型
export const deleteFurnitureDelete = (type_id) => {
  return axios.request({
    url: '/admin/furniture_type/delete',
    params: {
      type_id
    },
    method: 'post'
  })
}
// 添加家具类型
export const addFurnitureType = type => {
  return axios.request({
    url: '/admin/furniture_type/edit',
    data: type,
    method: 'post'
  })
}
// 家具类型详情
export const furnitureTypeInfo = (type_id) => {
  return axios.request({
    url: '/admin/furniture_type/info',
    params: {
      type_id
    },
    method: 'get'
  })
}

// 家具类型编辑
export const editFurnitureType = type => {
  return axios.request({
    url: '/admin/furniture_type/edit',
    data: type,
    method: 'post'
  })
}

// 支付列表
export const getPayList = (page) => {
  return axios.request({
    url: '/admin/pay/list',
    params:{
      page
    },
    method: 'get'
  })
}
// 删除支付
export const deletePay = (pay_id) => {
  return axios.request({
    url: '/admin/pay/delete',
    params: {
      pay_id
    },
    method: 'post'
  })
}

// 支付方式详情
export const getPayInfo = (pay_id) => {
  return axios.request({
    url: '/admin/pay/info',
    params: {
      pay_id
    },
    method: 'get'
  })
}
// 訂單列表数据
export const getOrderList = (page) => {
  return axios.request({
    url: 'admin/order/list',
    params:{
      page
    },
    method: 'get'
  })
}
// 订单删除
export const deleteOrder = (order_id) => {
  return axios.request({
    url: '/admin/order/delete',
    params: {
      order_id
    },
    method: 'post'
  })
}
// 订单详情
export const getOrderInfo = (order_id) => {
  return axios.request({
    url: '/admin/order/info',
    params: {
      order_id
    },
    method: 'get'
  })
}
// 订单编辑
export const editOrder = order => {
  return axios.request({
    url: '/admin/order/edit',
    data: order,
    method: 'post'
  })
}
// 配送方式列表
export const getShippingList = (page) => {
  return axios.request({
    url: '/admin/shipping/list',
    params:{
      page
    },
    method: 'get'
  })
}
// 添加配送方式
export const addShipping = shipping => {
  return axios.request({
    url: '/admin/shipping/save',
    data: shipping,
    method: 'post'
  })
}
// 删除配送方式
export const deleteShipping = (shipping_id) => {
  return axios.request({
    url: '/admin/shipping/delete',
    params: {
      shipping_id
    },
    method: 'post'
  })
}

// 配送方式详情
export const shippingInfo = (shipping_id) => {
  return axios.request({
    url: '/admin/shipping/info',
    params: {
      shipping_id
    },
    method: 'get'
  })
}
// 配送方式编辑
export const editShipping = shopping => {
  return axios.request({
    url: '/admin/shipping/save',
    data: shopping,
    method: 'post'
  })
}

// 用户详情
export const userInfo = (user_id) => {
  return axios.request({
    url: '/admin/user/info',
    params: {
      user_id
    },
    method: 'get'
  })
}

// 用户列表
export const getUserList = (page) => {
  return axios.request({
    url: '/admin/user/list',
    params:{
      page
    },
    method: 'get'
  })
}
