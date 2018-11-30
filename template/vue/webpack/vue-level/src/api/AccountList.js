import request from '../utils/request'

const getAccountList = (url, options = {}) => {
  return request(url, options)
}

export {
  getAccountList
}
