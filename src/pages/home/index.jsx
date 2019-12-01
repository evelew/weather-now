import React, { useState, useEffect } from 'react'

import { fetchData } from 'api'

import Card from 'components/card'
import Header from 'components/header'

import './styles.scss'

export default function Home() {
  const tenMinutes = 600000
  const cities = {
    nuuk: {
      city: 'Nuuk',
      country: 'GL'
    },
    urubici: {
      city: 'Urubici',
      country: 'BR'
    },
    nairobi: {
      city: 'Nairobi',
      country: 'KE'
    }
  }

  const [nuuk, setNuuk] = useState({
    city: cities.nuuk.city,
    country: cities.nuuk.country,
    loading: true
  })
  const [urubici, setUrubici] = useState({
    city: cities.urubici.city,
    country: cities.urubici.country,
    loading: true
  })
  const [nairobi, setNairobi] = useState({
    city: cities.nairobi.city,
    country: cities.nairobi.country,
    loading: true
  })

  useEffect(() => {
    getData()
    updateAfterTenMinutes()

    // eslint-disable-next-line
  }, [])

  const getData = async () => {
    getDataFromNuuk()
    getDataFromUrubici()
    getDataFromNairobi()
  }

  const getDataFromNuuk = () => {
    const nuuk = getDataFromCache(cities.nuuk.city)
    if (nuuk) {
      return setDataCard({ data: nuuk, setData: setNuuk })
    }

    return fetch({ data: cities.nuuk, setData: setNuuk })
  }

  const getDataFromUrubici = () => {
    const urubici = getDataFromCache(cities.urubici.city)
    if (urubici) {
      return setDataCard({ data: urubici, setData: setUrubici })
    }

    return fetch({
      data: cities.urubici,
      setData: setUrubici,
      showMoreDetails: true
    })
  }

  const getDataFromNairobi = () => {
    const nairobi = getDataFromCache(cities.nairobi.city)
    if (nairobi) {
      return setDataCard({ data: nairobi, setData: setNairobi })
    }

    return fetch({ data: cities.nairobi, setData: setNairobi })
  }

  const saveOnCache = data => {
    localStorage.setItem(data['city'], JSON.stringify(data))
  }

  const getDataFromCache = item => {
    const cacheData = JSON.parse(localStorage.getItem(item))

    if (cacheData) {
      const dateFromCache = new Date(cacheData.updatedAt).getTime()
      const now = new Date().getTime() - tenMinutes
      const lessThanTenMinutes = dateFromCache > now

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
            onClickTryAgain={() => fetch({ data: cities.nuuk, setData: setNuuk })}
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
