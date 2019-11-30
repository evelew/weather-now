import React, { useState, useEffect } from 'react'

import { fetchData } from 'api'

import Card from 'components/card'
import Header from 'components/header'

import './styles.scss'

export default function Home() {
  const data = {
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
    city: data.nuuk.city,
    country: data.nuuk.country,
    loading: true
  })
  const [urubici, setUrubici] = useState({
    city: data.urubici.city,
    country: data.urubici.country,
    loading: true
  })
  const [nairobi, setNairobi] = useState({
    city: data.nairobi.city,
    country: data.nairobi.country,
    loading: true
  })

  useEffect(() => {
    getData()
    updateAfterTenMinutes()

    // eslint-disable-next-line
  }, [])

  const getData = async () => {
    fetch({ data: data.nuuk, setData: setNuuk })
    fetch({ data: data.urubici, setData: setUrubici, showMoreDetails: true })
    fetch({ data: data.nairobi, setData: setNairobi })
  }

  const updateAfterTenMinutes = () => {
    const tenMinutes = 600000

    setInterval(() => {
      getData()
    }, tenMinutes)
  }

  const getDate = () => {
    return new Date().toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    })
  }

  const setDataCard = ({ data, setData }) => {
    setData({
      city: data.city,
      country: data.country,
      temperature: data.temperature,
      humidity: data.humidity,
      pressure: data.pressure,
      updatedAt: getDate(),
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
          pressure: main.pressure
        }
      } else {
        data = {
          city,
          country,
          temperature: parseInt(main.temp)
        }
      }

      setDataCard({ data, setData })
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
            onClickTryAgain={() => fetch({ data: data.nuuk, setData: setNuuk })}
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
                data: data.urubici,
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
              fetch({ data: data.nairobi, setData: setNairobi })
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
