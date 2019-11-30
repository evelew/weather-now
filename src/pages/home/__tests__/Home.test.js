import React from 'react'
import { render, wait, cleanup } from '@testing-library/react'
import '@testing-library/dom'

import { fetchData } from 'api'
import Home from '../'

jest.mock('api')
jest.setTimeout(6000)

afterEach(cleanup)

describe('Página home', () => {
  it('Deve renderizar 3 cards, Nuuk, Urubici e Nairobi', async () => {
    const { getByText } = render(<Home />)

    await wait(() => {
      expect(fetchData).toBeCalledWith({ from: 'Nuuk,GL' })
      getByText('Nuuk, GL')
    })

    await wait(() => {
      expect(fetchData).toBeCalledWith({ from: 'Urubici,BR' })
      getByText('Urubici, BR')
    })

    await wait(() => {
      expect(fetchData).toBeCalledWith({ from: 'Nairobi,KE' })
      getByText('Nairobi, KE')
    })
  })
})
