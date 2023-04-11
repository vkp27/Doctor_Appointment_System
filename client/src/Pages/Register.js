import React from 'react'
import '../Styles/RegisterStyles.css'
import {Form, message} from 'antd'
import axios from "axios"
import {Link, useNavigate} from 'react-router-dom'


const Register = () => {
  const navigate = useNavigate()

  //form handler
  const onFinishHandler = async (values) => {
    try {
      const res = await axios.post('/api/v1/user/register', values)

      //if success is true
      if(res.data.success){
        message.success('Registered Successfully!!')
        navigate('/login')
      }
      else{
        message.error(res.data.message)
      }

    } catch (error) {
      console.log(error)
      //antd provides an alert message box
      message.error('Something went wrong')
    }
  }

  return (
    <>
      <div className='form-container'>
        <Form layout='vertical' onFinish={onFinishHandler} className='card p-5' >
            <h3 className='text-center'>Registration Form</h3>
            <Form.Item label='Name' name='name'>
              <input type='text' required />
            </Form.Item>
            <Form.Item label='Email' name='email'>
              <input type='email' required />
            </Form.Item>
            <Form.Item label='Password' name='password'>
              <input type='password' required />
            </Form.Item>
            <button className='btn btn-primary' type='submit'>Register</button>
            <Link to='/login' >Already registered user?</Link>
        </Form>
      </div>
    </>
  )
}

export default Register