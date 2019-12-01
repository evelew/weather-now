import request from './http'

export const fetchData = ({ from }) => {
  return request({
    method: 'GET',
    url: `?q=${from}&units=celsius&appid=b6907d289e10d714a6e88b30761fae22`,
  })
}
