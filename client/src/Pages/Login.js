import React from 'react'
import '../Styles/RegisterStyles.css'
import {Form, message} from 'antd'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { showLoading, hideLoading } from '../Redux/Features/alertSlice'

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  //form handler
  const onFinishHandler = async (values) => {
    try {
      
      //to display loading spinner
      dispatch(showLoading())
      const res = await axios.post('/api/v1/user/login', values)
      dispatch(hideLoading())
      if(res.data.success){
        //store token in localstorage
        localStorage.setItem('token', res.data.token)
        message.success('Login Successful!')
        navigate('/')
      }
      else{
        message.error(res.data.message)
      }
    } catch (error) {
      dispatch(hideLoading())
      console.log(error)
      message.error('Something went wrong!!')
    }

  }

  return (
    <>  
      <div className='form-container'>
        <Form layout='vertical' onFinish={onFinishHandler} className='card p-5' >
            <h3 className='text-center'>Login Form</h3>
            <Form.Item label='Email' name='email'>
              <input type='email' required />
            </Form.Item>
            <Form.Item label='Password' name='password'>
              <input type='password' required />
            </Form.Item>
            <button className='btn btn-primary' type='submit'>Login</button>
            <Link to='/register' >Not a user?</Link>
        </Form>
      </div>
    </>
  )
}

export default Login