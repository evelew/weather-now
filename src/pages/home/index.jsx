import React, { useState, useEffect } from 'react'

import { fetchData } from 'api'

import Card from 'components/card'
import Header from 'components/header'

import './styles.scss'

export default function Home() {
  const tenMinutes = 600000
  const cities = {
    Nuuk: {
      city: 'Nuuk',
      country: 'GL'
    },
    Urubici: {
      city: 'Urubici',
      country: 'BR'
    },
    Nairobi: {
      city: 'Nairobi',
      country: 'KE'
    }
  }

  const [nuuk, setNuuk] = useState({
    city: cities.Nuuk.city,
    country: cities.Nuuk.country,
    loading: true
  })
  const [urubici, setUrubici] = useState({
    city: cities.Urubici.city,
    country: cities.Urubici.country,
    loading: true
  })
  const [nairobi, setNairobi] = useState({
    city: cities.Nairobi.city,
    country: cities.Nairobi.country,
    loading: true
  })

  useEffect(() => {
    getData()
    updateAfterTenMinutes()

    // eslint-disable-next-line
  }, [])

  const getData = async () => {
    getDataFrom({ city: 'Nuuk', setData: setNuuk })
    getDataFrom({ city: 'Urubici', setData: setUrubici, showMoreDetails: true })
    getDataFrom({ city: 'Nairobi', setData: setNairobi })
  }

  const getDataFrom = ({ city, setData, showMoreDetails }) => {
    const cityFromCache = getDataFromCache(city)
    if (cityFromCache) {
      return setDataCard({ data: cityFromCache, setData })
    }

    return fetch({ data: cities[city], setData, showMoreDetails })
  }
  
  const saveOnCache = data => {
    localStorage.setItem(data['city'], JSON.stringify(data))
  }

  const getDataFromCache = item => {
    const cacheData = JSON.parse(localStorage.getItem(item))

    if (cacheData) {
      const dateFromCache = new Date(cacheData.updatedAt).getTime()
      const now = new Date().getTime()
      const tenMinutesAgo = now - tenMinutes
      const lessThanTenMinutes = dateFromCache > tenMinutesAgo

      if (lessThanTenMinutes) {
        return cacheData
      }

      return null
    }

    return null
  }

  const updateAfterTenMinutes = () => {
    setInterval(() => {
      getData()
    }, tenMinutes)
  }

  const setDataCard = ({ data, setData }) => {
    setData({
      city: data.city,
      country: data.country,
      temperature: data.temperature,
      humidity: data.humidity,
      pressure: data.pressure,
      updatedAt: data.updatedAt,
      loading: false
    })
  }

  const setErrorCard = ({ data, setData }) => {
    setData({
      city: data.city,
      country: data.country,
      error: true
    })
  }

  const fetch = async ({ data, setData, showMoreDetails }) => {
    const { city, country } = data
    setData({ loading: true })

    try {
      const from = `${city},${country}`
      const { main } = await fetchData({ from })

      let data = null

      if (showMoreDetails) {
        data = {
          city,
          country,
          temperature: parseInt(main.temp),
          humidity: main.humidity,
          pressure: main.pressure,
          updatedAt: new Date()
        }
      } else {
        data = {
          city,
          country,
          temperature: parseInt(main.temp),
          updatedAt: new Date()
        }
      }

      setDataCard({ data, setData })
      saveOnCache(data)
    } catch (error) {
      const data = {
        city,
        country
      }
      setErrorCard({ data, setData })
    }
  }

  return (
    <>
      <Header />

      <section className="home">
        <article className="home--card">
          <Card
            loading={nuuk.loading}
            error={nuuk.error}
            onClickTryAgain={() =>
              fetch({ data: cities.nuuk, setData: setNuuk })
            }
            city={nuuk.city}
            country={nuuk.country}
            temperature={nuuk.temperature}
            updatedAt={nuuk.updatedAt}
          />
        </article>

        <article className="home--card">
          <Card
            loading={urubici.loading}
            error={urubici.error}
            onClickTryAgain={() =>
              fetch({
                data: cities.urubici,
                setData: setUrubici,
                showMoreDetails: true
              })
            }
            city={urubici.city}
            country={urubici.country}
            temperature={urubici.temperature}
            humidity={urubici.humidity}
            pressure={urubici.pressure}
            updatedAt={urubici.updatedAt}
          />
        </article>

        <article className="home--card">
          <Card
            loading={nairobi.loading}
            error={nairobi.error}
            onClickTryAgain={() =>
              fetch({ data: cities.nairobi, setData: setNairobi })
            }
            city={nairobi.city}
            country={nairobi.country}
            temperature={nairobi.temperature}
            updatedAt={nairobi.updatedAt}
          />
        </article>
      </section>
    </>
  )
}
