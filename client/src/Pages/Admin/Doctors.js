import React, {useEffect, useState} from 'react'
import Layout from './../../Components/Layout'
import axios from 'axios'
import { Table, message } from 'antd'


const Doctors = () => {
  const [doctors, setDoctors] = useState([])

  //getUsers
  const getDoctors = async () => {
    try {
      const res = await axios.get('/api/v1/admin/getAllDoctors', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      if(res.data.success) {
        setDoctors(res.data.data)
      }
    } catch (error) {
      console.log(error) 
    }
  }

  //handle account status
  const handleAccountStatus = async (record, status) => {
    try {
      const res = await axios.post('/api/v1/admin/changeAccountStatus', 
      {doctorId: record._id, userId: record.userId,  status: status},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      if(res.data.success){
        message.success(res.data.message)
      }
    } catch (error) {
      message.error('Something went wrong!')
    }
  }
  useEffect(() => {
    getDoctors()
  }, [])

  //antD table col
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      render: (text, record) => (
        <span>{record.firstName} {record.lastName}</span>
      )
    },
    {
      title: 'Status',
      dataIndex: 'status'
    },
    {
      title: 'Phone',
      dataIndex: 'phone'
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      render: (text, record) => (
        <div className='d-flex'>
          {
            record.status === 'pending' ? (<button onClick={() => handleAccountStatus(record, 'approved')} className='btn btn-success'>Approve</button>) : (<button className='btn btn-danger'>Reject</button>)
          }
        </div>
      )
    }
  ]

  return (
    <Layout>
      <h1 className='text-center p-2'>Doctors List</h1>
      <Table columns={columns} dataSource={doctors} />
    </Layout>
  )
}

export default Doctors