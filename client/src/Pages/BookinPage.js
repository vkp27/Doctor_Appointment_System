import React, {useState, useEffect} from 'react'
import Layout from './../Components/Layout'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { DatePicker, TimePicker, message } from 'antd'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import { hideLoading, showLoading } from '../Redux/Features/alertSlice'


const BookinPage = () => {
    const {user} = useSelector((state) => state.user)
    const [doctors, setDoctors] = useState([])
    const params = useParams()
    const [date, setDate] = useState("")
    const [time, setTime] = useState()
    const [isAvailable, setIsAvailable] = useState(false)
    const dispatch = useDispatch()

    const getUserData = async() => {
        try {
          const res = await axios.post('/api/v1/doctor/getDoctorById', {doctorId: params.doctorId},
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem('token')
            },
          })
          if(res.data.success){
            setDoctors(res.data.data)
          }
        } catch (error) {
          console.log(error)
        }
      }
    
    /*-----------Handle Booking--------------*/
    const handleBooking = async() => {
        try {
            // setIsAvailable(true)
            if(!date && !time){
                return alert('Date and Time Required')
            }
            dispatch(showLoading())
            const res = await axios.post('/api/v1/user/book-appointment', 
            {
                doctorId: params.doctorId,
                userId: user._id,
                doctorInfo: doctors,
                userInfo: user,
                date: date,
                time: time
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            dispatch(hideLoading())
            if(res.data.success){
                message.success(res.data.message)
            }
        } catch (error) {
            dispatch(hideLoading())
            console.log(error)
        }
    }

    /*--------------handle Availability--------*/
    const handleAvailability = async () => {
        try {
            dispatch(showLoading())
            const res = await axios.post('/api/v1/user/booking-availability',
            {doctorId: params.doctorId, date, time}, 
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            dispatch(hideLoading())
            if(res.data.success){
                setIsAvailable(true)
                message.success(res.data.message)
            }
            else{
                message.error(res.data.message)
            }
        } catch (error) {
            dispatch(hideLoading())
            console.log(error)
        }
    }

    useEffect(() => {
        getUserData()
    }, [])

    return (
        <Layout>
            <h1>Booking Page</h1>
            <div className='container m-2'>
                {doctors && (
                    <div>
                        <h4>
                            Dr. {doctors.firstName} {doctors.lastName}
                        </h4>
                        <h4>Fees: {doctors.feesPerConsultation}</h4>
                        <h4>Timings: {doctors.timings && doctors.timings[0]} -{" "}{doctors.timings && doctors.timings[1]}{" "}</h4>
                        <div className="d-flex flex-column w-50">
                            <DatePicker 
                            aria-required={"true"}
                            className = "m-2" format="DD-MM-YYYY" onChange={(value) => {
                                // set IsAvailable(false),
                                setDate(moment(value).format('DD-MM-YYYY'))
                             } } />
                            <TimePicker
                            aria-required={"true"}
                            format="HH:mm" onChange={(value) =>
                                {
                                    // setIsAvailable(false),
                                    setTime(
                                        moment(value).format('HH:mm')) 
                                }
                            }/>
                            <button className='btn btn-primary mt-2' onClick={handleAvailability}>Check Availability</button>
                            {/* {!isAvailable &&  */}
                                <button className='btn btn-dark mt-2' onClick={handleBooking}>Book Now</button>
                            {/* } */}
                            
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    )
}

export default BookinPage