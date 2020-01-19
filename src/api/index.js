import request from './http'

const appId = process.env.REACT_APP_ID_WEATHER_MAP

export const fetchData = ({ from }) => {
  return request({
    method: 'GET',
    url: `?q=${from}&units=celsius&appid=${appId}`
  })
}
