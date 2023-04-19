import React from 'react'
import Layout from '../Components/Layout'
import { message, Tabs } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { showLoading, hideLoading } from '../Redux/Features/alertSlice'



const NotificationPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {user} = useSelector((state) => state.user)

    //handle read notification
    const handleMarkAllRead = async () => {
        try {
            dispatch(showLoading());
            const res = await axios.post(
              "/api/v1/user/get-all-notification",
              {
                userId: user._id,
              },
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              }
            );
            dispatch(hideLoading());
            if (res.data.success) {
              message.success(res.data.message);
            } else {
              message.error(res.data.message);
            }
        } catch (error) {
            dispatch(hideLoading());
            console.log(error);
            message.error("Somthing went wrong");
        }
    }
    //delete notification
    const handleDeleteAllRead = async () => {
        try {
            
            dispatch(showLoading())
            const res = await axios.post('/api/v1/user/delete-all-notification', 
            {
                userId: user._id
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
            else{
                message.error(res.data.message)
            }
        } catch (error) {
            dispatch(hideLoading())
            console.log(error)
            message.error('Something went wrong!')
        }
    }
  return (
    <Layout>
        {/* <h4 className='p-3 text-center'>Notification Page</h4> */}
        <Tabs>
            <Tabs.TabPane tab="Unread" key={0}>
                <div className='d-flex justify-content-end'>
                    <h5 className='p-2 text-success' onClick={handleMarkAllRead} style={{cursor: 'pointer'}}>Mark All Read</h5>
                </div>
                {
                    user?.notification.map(notificationMsg => (
                        <div className='card m-2' >
                            <div className="card-text p-2 m-1" style= {{cursor: 'pointer'}}onClick={() => navigate(notificationMsg.onClickPath)}>
                                {notificationMsg.message}
                            </div>
                        </div>
                    ))
                }
            </Tabs.TabPane>
            <Tabs.TabPane tab="Read" key={1}>
                <div className='d-flex justify-content-end'>
                    <h5 className='p-2 text-danger' onClick={handleDeleteAllRead} style={{cursor: 'pointer', color: 'red'}}>Delete All Read</h5>
                </div>
                {
                    user?.seennotification.map(notificationMsg => (
                        <div className='card m-2' >
                            <div className="card-text p-2 m-1 text-dark" style= {{cursor: 'pointer'}}onClick={() => navigate(notificationMsg.onClickPath)}>
                                {notificationMsg.message}
                            </div>
                        </div>
                    ))
                }
            </Tabs.TabPane>
        </Tabs>
    </Layout>
  )
}

export default NotificationPage