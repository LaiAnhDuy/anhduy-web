import React from 'react'

import './Card.scss'

function Card(props){
    const { card } = props

    return(
        <li className="Card-item">
          {card.cover && <img src={card.cover} className="card-cover" alt="ảnh thanos" />}
          {card.title}
       
         
        </li>
    )
}

export default Card