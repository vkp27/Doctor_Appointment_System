import React from 'react'
import '../Styles/RegisterStyles.css'
import {Form, message, Input} from 'antd'
import axios from "axios"
import {Link, useNavigate} from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { showLoading, hideLoading } from '../Redux/Features/alertSlice'

const Register = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  //form handler
  const onFinishHandler = async (values) => {
    try {

      dispatch(showLoading())
      const res = await axios.post('/api/v1/user/register', values)
      dispatch(hideLoading())

      //if success is true
      if(res.data.success){
        message.success('Registered Successfully!!')
        navigate('/login')
      }
      else{
        message.error(res.data.message)
      }

    } catch (error) {

      dispatch(hideLoading())
      console.log(error)
      //antd provides an alert message box
      message.error('Something went wrong')
    }
  }

  return (
    <>
      <div className='form-container'>
        <Form layout='vertical' onFinish={onFinishHandler} className='card p-5'>
            <h3 className='text-center'>Registration Form</h3>
            <Form.Item label='Name' name='name'>
              <Input type='text' required />
            </Form.Item>
            <Form.Item label='Email' name='email'>
              <Input type='email' required />
            </Form.Item>
            <Form.Item label='Password' name='password'>
              <Input type='password' required />
            </Form.Item>
            <button className='btn btn-primary' type='submit'>Register</button>
            <Link to='/login' >Already registered user?</Link>
        </Form>
      </div>
    </>
  )
}

export default Register