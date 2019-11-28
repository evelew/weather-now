import React, { useState } from 'react'

import Loader from '../../icons/loader'

import './styles.scss'

export default function Card({ city, country, temperature, humidity, pressure, updatedAt }) {
  const [loading, setLoading] = useState(false)

  const getClassStyle = (value) => {
    if (value <= 5) {
      return 'card-body--blue'
    } else if (value > 5 && value <= 25) {
      return 'card-body--orange'
    } else {
      return 'card-body--red'
    }
  }

  const renderHeader = () => {
    return (
      <div className="card-header">
          <p>{city}, {country}</p>
        </div>
    )
  }

  const colorStyle = getClassStyle(temperature)

  if (loading) {
    return (
      <article className="card">
        {renderHeader()}

        <div className="card-loader">
        <Loader />
        </div>
      </article>
    )
  }

  return (
    <article className="card">
      {renderHeader()}

      <div className="card-body">
        <p className={colorStyle}>{temperature}°</p>
      </div>
      <div className="card-footer">
        {humidity && pressure && (
          <div className="card-footer--details">
            <div className="card-footer--details-block">
              <p>HUMIDITY</p>
              <p>
                <strong>{humidity}<small>%</small></strong>
              </p>
            </div>
            <div className="card-footer--details-block">
              <p>PRESSURE</p>
              <p>
                <strong>{pressure}<small>hPa</small></strong>
              </p>
            </div>
          </div>
        )}

        <p className="card-footer--time">Updated at {updatedAt} PM</p>
      </div>
    </article>
  )
}