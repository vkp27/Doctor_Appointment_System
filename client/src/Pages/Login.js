import React from 'react'
import '../Styles/RegisterStyles.css'
import {Form} from 'antd'
import {Link} from 'react-router-dom'


const Login = () => {
  //form handler
  const onFinishHandler = (values) => {
    console.log(values);
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