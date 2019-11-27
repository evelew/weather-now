import React from 'react'

import './styles.scss'
import Card from '../../components/card'
import Header from '../../components/header'


export default function Home() {
  const cards = [
    {
      city: 'Fazenda Rio Grande',
      country: 'BR',
      temperature: 4,
      updatedAt: '25:65:45'
    },
    {
      city: 'Curitiba',
      country: 'BR',
      temperature: 26,
      humidity: 65,
      pressure: 856,
      updatedAt: '25:65:45'
    },
    {
      city: 'São José dos Pinhais',
      country: 'BR',
      temperature: 13,
      updatedAt: '25:65:45'
    }
  ]

  return (
    <>
      <Header />
      
      <section className="home">
        {cards.map((card, index) => (
          <article className="home--card" key={index}>
            <Card city={card.city} country={card.country} temperature={card.temperature} humidity={card.humidity} pressure={card.pressure} updatedAt={card.updatedAt} />
          </article>
        ))}
      </section>
    </>
  )
}