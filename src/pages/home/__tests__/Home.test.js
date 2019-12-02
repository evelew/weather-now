import React from 'react'
import { render, wait } from '@testing-library/react'
import '@testing-library/dom'

import { fetchData } from 'api'
import Home from '../'

jest.mock('api')
jest.useFakeTimers()

afterEach(() => {
  jest.clearAllMocks()
  jest.clearAllTimers()
})

describe('Página home', () => {
  it('Deve fazer requisições e renderizar 3 cards', async () => {
    const { getByText } = render(<Home />)

    expect(fetchData).toBeCalledWith({ from: 'Nuuk,GL' })
    expect(fetchData).toBeCalledWith({ from: 'Urubici,BR' })
    expect(fetchData).toBeCalledWith({ from: 'Nairobi,KE' })

    getByText('Nuuk, GL')
    getByText('Urubici, BR')
    getByText('Nairobi, KE')
  })

  it('Deve passar 10 minutos e fazer requisições', async () => {
    const { queryByText } = render(<Home />)

    expect(fetchData).toHaveBeenCalled()

    // Avança 10 minutos
    jest.advanceTimersByTime(600000)

    await wait(() => {
      queryByText('loader.svg')
      expect(fetchData).toHaveBeenCalled()
    })
  })

  it('Deve utilizar informações do cache e depois de 10 minutos fazer a requisição', async () => {
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: () => {
          return JSON.stringify({
            city: 'Cache',
            country: 'JS',
            temperature: -1,
            updatedAt: new Date(),
            loading: false
          })
        }
      }
    })
    const { queryAllByText, queryByText } = render(<Home />)

    expect(queryAllByText(/Cache, JS/))
    expect(fetchData).not.toHaveBeenCalled()

    // Avança 10 minutos
    jest.advanceTimersByTime(600000)

    await wait(() => {
      queryByText('loader.svg')
      expect(fetchData).toHaveBeenCalled()
    })
  })
})
