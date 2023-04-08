import React from 'react'
import '../Styles/RegisterStyles.css'
import {Form} from 'antd'
import {Link} from 'react-router-dom'


const Register = () => {
  //form handler
  const onFinishHandler = (values) => {
    console.log(values);
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