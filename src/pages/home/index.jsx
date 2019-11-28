import React, { useState, useEffect } from 'react'

import { fetchData } from 'api'

import Card from 'components/card'
import Header from 'components/header'

import './styles.scss'

export default function Home() {
  const [nairobi, setNairobi] = useState(null)

  useEffect(() => {
    setNairobi({
      city: 'Nairobi',
      country: 'BR',
      temperature: 13,
      updatedAt: '25:65:45',
      loading: false,
      error: true,
    })
  }, [])

  const onClickTryAgain = async (card, setItem) => {
    try {
      setItem({
        city: card.city,
        country: card.country,
        loading: true,
      })

      const data = await fetchData()

      setItem(data)
    } catch (error) {
      setItem({
        city: card.city,
        country: card.country,
        error: true,
      })
    }
  }

  return (
    <>
      <Header />

      <section className="home">
        {nairobi && (
          <article className="home--card">
            <Card
              loading={nairobi.loading}
              error={nairobi.error}
              onClickTryAgain={() => onClickTryAgain(nairobi, setNairobi)}
              city={nairobi.city}
              country={nairobi.country}
              temperature={nairobi.temperature}
              updatedAt={nairobi.updatedAt}
            />
          </article>
        )}
      </section>
    </>
  )
}
