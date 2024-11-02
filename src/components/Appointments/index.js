// Write your code here
import {Component} from 'react'
import {format} from 'date-fns'
import {v4 as uuidv4} from 'uuid'
import AppointmentItem from '../AppointmentItem'
import './index.css'

class Appointments extends Component {
  state = {
    appointmentsList: [],
    title: '',
    date: '',
    isStarredActive: false,
  }

  toggleIsStarred = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(eachItem => {
        if (id === eachItem.id) {
          return {...eachItem, isStarred: !eachItem.isStarred}
        }
        return eachItem
      }),
    }))
  }

  addAppointment = event => {
    event.preventDefault()
    const {title, date} = this.state
    const newAppointment = {
      id: uuidv4(),
      title,
      date,
      isStarred: false,
    }
    this.setState(prevState => ({
      appointmentsList: [...prevState.appointmentsList, newAppointment],
      title: '',
      date: '',
    }))
  }

  onChangeTitle = event => {
    this.setState({title: event.target.value})
  }

  onChangeDate = event => {
    this.setState({date: event.target.value})
  }

  toggleIsStarredActive = () => {
    this.setState(prevState => ({isStarredActive: !prevState.isStarredActive}))
  }

  getFilteredAppointmentsList = () => {
    const {appointmentsList, isStarredActive} = this.state
    if (isStarredActive === true) {
      return appointmentsList.filter(eachItem => eachItem.isStarred === true)
    }
    return appointmentsList
  }

  render() {
    const {title, date, isStarredActive} = this.state
    const filteredAppointmentsList = this.getFilteredAppointmentsList()
    const starredBtnClassName = isStarredActive ? 'starred-active-btn' : ''

    return (
      <div className="appointments-bg-container">
        <div className="appointments-card">
          <h1 className="add-appointment-heading">Add Appointment</h1>
          <div className="add-appointments-container">
            <form onSubmit={this.addAppointment} className="appointments-form">
              <label htmlFor="title" className="label">
                TITLE
              </label>
              <br />
              <input
                type="text"
                id="title"
                className="input-field"
                onChange={this.onChangeTitle}
                value={title}
                placeholder="Title"
              />
              <br />
              <label htmlFor="date" className="label">
                DATE
              </label>
              <br />
              <input
                type="date"
                id="date"
                className="input-field"
                onChange={this.onChangeDate}
                value={date}
              />
              <br />
              <button type="submit" className="add-btn">
                Add
              </button>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
              className="appointments-img"
            />
          </div>
          <hr className="hr-line" />
          <div className="appointments-header-container">
            <h1 className="appointments-heading">Appointments</h1>
            <button
              className={`starred-btn ${starredBtnClassName}`}
              onClick={this.toggleIsStarredActive}
            >
              Starred
            </button>
          </div>
          <ul className="appointments-container">
            {filteredAppointmentsList.map(eachItem => (
              <AppointmentItem
                appointmentDetails={eachItem}
                key={eachItem.id}
                toggleIsStarred={this.toggleIsStarred}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
