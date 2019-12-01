import axios from 'axios';

const httpClient = axios.create({
  baseURL: 'https://openweathermap.org/data/2.5/weather'
});

const request = options => {
  const onSuccess = response => response.data;

  const onError = error => {
    if (error.response.status === 500) {
      throw error;
    }

    return Promise.reject(error);
  };

  return httpClient(options)
    .then(onSuccess)
    .catch(onError);
};

export default request;