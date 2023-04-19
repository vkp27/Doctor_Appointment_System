import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Layout from '../Components/Layout'
import { Row } from 'antd'
import DoctorsList from '../Components/DoctorsList'

const HomePage = () => {

  const [doctors, setDoctors] = useState([])
  //login user data
  const getUserData = async() => {
    try {
      const res = await axios.get('/api/v1/user/getAllDoctors', 
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

  useEffect(() => {
    getUserData()
  }, [])
  
  return (
    <div>
        <Layout>
          {/* <h1 className='text-center'>Home Page</h1>  */}
          <Row>
            {doctors && doctors.map((doctor) => (
              <DoctorsList doctor={doctor}/>
            ))}
          </Row>
        </Layout>
    </div>
  )
}

export default HomePage