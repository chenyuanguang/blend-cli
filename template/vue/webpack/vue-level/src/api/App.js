import request from '../utils/request'

const getCompetence = (url, options = {}) => {
  return request(url, options)
}

export {
  getCompetence
}
