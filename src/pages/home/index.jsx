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
    getDataFromNuuk()
    getDataFromUrubici()
    getDataFromNairobi()
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

  const getDataFromNuuk = async () => {
    const { city, country } = data.nuuk
    setNuuk({ loading: true })

    try {
      const from = `${city},${country}`
      const { main } = await fetchData({ from })

      setNuuk({
        city: city,
        country: country,
        temperature: main.temp,
        updatedAt: getDate(),
        loading: false
      })
    } catch (error) {
      setNuuk({
        city: city,
        country: country,
        updatedAt: getDate(),
        error: true
      })
    }
  }

  const getDataFromUrubici = async () => {
    const { city, country } = data.urubici
    setUrubici({ loading: true })

    try {
      const from = `${city},${country}`
      const { main } = await fetchData({ from })

      setUrubici({
        city: city,
        country: country,
        temperature: main.temp,
        humidity: main.humidity,
        pressure: main.pressure,
        updatedAt: getDate(),
        loading: false
      })
    } catch (error) {
      setUrubici({
        city: city,
        country: country,
        updatedAt: getDate(),
        error: true
      })
    }
  }

  const getDataFromNairobi = async () => {
    const { city, country } = data.nairobi
    setNairobi({ loading: true })

    try {
      const from = `${city},${country}`
      const { main } = await fetchData({ from })

      setNairobi({
        city: city,
        country: country,
        temperature: main.temp,
        updatedAt: getDate(),
        loading: false
      })
    } catch (error) {
      setNairobi({
        city: data.nairobi.city,
        country: data.nairobi.country,
        updatedAt: getDate(),
        error: true
      })
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
            onClickTryAgain={getDataFromNuuk}
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
            onClickTryAgain={getDataFromUrubici}
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
            onClickTryAgain={getDataFromNairobi}
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
