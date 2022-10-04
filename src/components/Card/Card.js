import React from 'react'

import './Card.scss'

function Card(props) {
    const { card } = props

    return(
        <div className="Card-item">
          {card.cover && 
          <img 
          src={card.cover} 
          className="card-cover" 
          alt="ảnh thanos" 
          onMouseDown={e => e.preventDefault()}
          />
          }
          {card.title}
         
          <span className="delete-card"> X </span>
        </div>
    )
}

export default Card