import React from 'react'
import '../Styles/RegisterStyles.css'
import {Form, message} from 'antd'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'

const Login = () => {
  const navigate = useNavigate()

  //form handler
  const onFinishHandler = async (values) => {
    try {
      
      const res = await axios.post('/api/v1/user/login', values)
      if(res.data.success){
        //store token in localstorage
        localStorage.setItem('token', res.data.token)
        message.success('Login Successful!')
        navigate('/')
      }
    } catch (error) {
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