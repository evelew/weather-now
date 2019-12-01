import React, { Component } from 'react'

import { fetchData } from 'api'

import Card from 'components/card'
import Header from 'components/header'

import './styles.scss'

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

export default class Home extends Component {
  state = {
    allCities: {
      Nuuk: {
        city: cities.Nuuk.city,
        country: cities.Nuuk.country,
        loading: true
      },
      Urubici: {
        city: cities.Urubici.city,
        country: cities.Urubici.country,
        loading: true
      },
      Nairobi: {
        city: cities.Nairobi.city,
        country: cities.Nairobi.country,
        loading: true
      }
    }
  }

  componentDidMount() {
    this.getData()
    this.updateAfterTenMinutes()
  }

  getData = () => {
    this.getDataFrom({ city: 'Nuuk' })
    this.getDataFrom({
      city: 'Urubici',
      showMoreDetails: true
    })
    this.getDataFrom({ city: 'Nairobi' })
  }

  getDataFrom = ({ city, showMoreDetails }) => {
    const cityFromCache = this.getDataFromCache(city)
    if (cityFromCache) {
      const newData = Object.assign(this.state.allCities, {
        [city]: cityFromCache
      })
      return this.setState({ allCities: newData })
    }

    this.fetch({ data: cities[city], showMoreDetails })
  }

  saveOnCache = data => {
    localStorage.setItem(data['city'], JSON.stringify(data))
  }

  getDataFromCache = item => {
    const cacheData = JSON.parse(localStorage.getItem(item))

    if (cacheData) {
      const dateFromCache = new Date(cacheData.updatedAt).getTime()
      const now = new Date().getTime()
      const tenMinutesAgo = now - tenMinutes
      const lessThanTenMinutes = dateFromCache >= tenMinutesAgo

      if (lessThanTenMinutes) {
        return cacheData
      }

      return null
    }

    return null
  }

  updateAfterTenMinutes = () => {
    setInterval(() => {
      Promise.resolve().then(() => {
        this.fetch({ data: cities.Nuuk })
        this.fetch({ data: cities.Urubici, showMoreDetails: true })
        this.fetch({ data: cities.Nairobi })
      })
    }, tenMinutes)
  }

  setDataCard = ({ data }) => {
    const newData = Object.assign(this.state.allCities, { [data.city]: data })
    this.setState({ allCities: newData })
  }

  setErrorCard = ({ data }) => {
    const newData = Object.assign(this.state.allCities, {
      [data.city]: {
        error: true,
        ...cities[data.city]
      }
    })
    this.setState({ allCities: newData })
  }

  fetch = ({ data, showMoreDetails }) => {
    const { city, country } = data
    const newData = Object.assign(this.state.allCities, {
      [city]: { loading: true, ...data }
    })

    this.setState({ allCities: newData }, async () => {
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
            updatedAt: new Date(),
            loading: false
          }
        } else {
          data = {
            city,
            country,
            temperature: parseInt(main.temp),
            updatedAt: new Date(),
            loading: false
          }
        }

        this.setDataCard({ data })
        this.saveOnCache(data)
      } catch (error) {
        const data = {
          city,
          country
        }
        this.setErrorCard({ data })
      }
    })
  }

  render() {
    const { allCities } = this.state
    return (
      <>
        <Header />

        <section className="home">
          {Object.keys(allCities).map((key, index) => (
            <article className="home--card" key={index}>
              <Card
                loading={allCities[key].loading}
                error={allCities[key].error}
                onClickTryAgain={() => this.fetch({ data: allCities[key] })}
                city={allCities[key].city}
                country={allCities[key].country}
                temperature={allCities[key].temperature}
                humidity={allCities[key].humidity}
                pressure={allCities[key].pressure}
                updatedAt={allCities[key].updatedAt}
              />
            </article>
          ))}
        </section>
      </>
    )
  }
}
