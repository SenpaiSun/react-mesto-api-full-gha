import React from 'react'
import {Link} from 'react-router-dom'
import smile404 from '../image/smile404.png'

export default function PageNotFound() {
  return(
    <div className="not-found">
      <img src={smile404} className='not-found__image'/>
      <h3 className="not-found__title">404 Not Found  - Страница не найдена :(</h3>
      <Link className="not-found__return" to="/sign-up">&crarr; Вернуться </Link>
    </div>
  )
}