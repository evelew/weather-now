const request = ({ error = false }) => {
  if (error) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        return reject()
      }, 2000)
    })
  }

  return new Promise((resolve) => {
    setTimeout(() => {
      return resolve({
        city: 'Nairobi',
        country: 'BR',
        temperature: 5,
        updatedAt: '25:65:45',
        loading: false,
        error: false
      })
    }, 2000)
  })
}

export const fetchData = () => {
  return request({ error: false });
}