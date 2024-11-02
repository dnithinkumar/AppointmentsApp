// Write your code here
import {format} from 'date-fns'
import './index.css'

const AppointmentItem = props => {
  const {appointmentDetails, toggleIsStarred} = props
  const {id, title, date, isStarred} = appointmentDetails

  const formattedDate = format(new Date(date), 'dd MMMM yyyy, EEEE')

  const onClickStarBtn = () => {
    toggleIsStarred(id)
  }

  const starImgUrl = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  return (
    <li className="appointment-item-container">
      <div className="title-date-container">
        <p className="title">{title}</p>
        <p className="date">Date: {formattedDate}</p>
      </div>
      <button className="star-btn" onClick={onClickStarBtn} data-testid="star">
        <img src={starImgUrl} alt="star" className="star-img" />
      </button>
    </li>
  )
}

export default AppointmentItem
