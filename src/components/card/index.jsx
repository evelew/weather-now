import React from 'react'
import './styles.scss'

export default function Card({ city, country, temperature, humidity, pressure, updatedAt }) {
  const getClassStyle = (value) => {
    if (value <= 5) {
      return 'card-body--blue'
    } else if (value > 5 && value <= 25) {
      return 'card-body--orange'
    } else {
      return 'card-body--red'
    }
  }

  const colorStyle = getClassStyle(temperature)

  return (
    <article className="card">
      <div className="card-header">
        <p>{city}, {country}</p>
      </div>
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