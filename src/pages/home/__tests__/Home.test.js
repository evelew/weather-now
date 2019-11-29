import React from 'react'
import { render, wait } from '@testing-library/react'
import '@testing-library/dom'

import Home from '../'

describe('Página home', () => {
  it('Deve renderizar 3 cards, Nuuk, Urubici e Nairobi', async () => {
    const { getByText } = render(<Home />)

    await wait(() => {
      getByText('Nuuk, GL')
    })

    getByText('Urubici, BR')
    getByText('Nairobi, KE')
  })
})