import React from 'react'
import { render, cleanup } from '@testing-library/react'
import '@testing-library/dom'

import Card from '../'

afterEach(cleanup)

describe('Card de temperatura', () => {
  it('Deve renderizar o card com as informações passadas por props', () => {
    const { getByText, queryByText } = render(
      <Card
        temp="32"
        city="Curitiba"
        country="PR"
        temperature={17}
        humidity={65}
        pressure={856}
        updatedAt="25:34:45 PM"
      />
    )

    expect(getByText('Curitiba, PR'))
    expect(getByText('17°'))

    expect(getByText('HUMIDITY'))
    expect(queryByText('65%'))

    expect(getByText('PRESSURE'))
    expect(queryByText('856hPa'))

    expect(getByText('Updated at 25:34:45 PM'))
  })

  it('Não deve encontrar informações "humidity" e "pressure"', () => {
    const { getByText, queryByText } = render(
      <Card
        temp="32"
        city="Curitiba"
        country="PR"
        temperature={17}
        updatedAt="25:34:45 PM"
      />
    )

    expect(getByText('Curitiba, PR'))
    expect(getByText('17°'))
    expect(queryByText('HUMIDITY')).toBeNull()
    expect(queryByText('PRESSURE')).toBeNull()
    expect(getByText('Updated at 25:34:45 PM'))
  })
})
