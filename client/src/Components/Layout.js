import React from 'react'
import '../Styles/Layoutstyles.css'
import { userMenu, adminMenu } from '../Data/data'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {message, Badge} from 'antd'

const Layout = ({children}) => {
    const location = useLocation()
    const navigate = useNavigate()
    const {user} = useSelector((state) => state.user)

    //logout function
    const handleLogout = () => {
        localStorage.clear()
        message.success('Logged out successfully!')
        navigate('/login')
    }
    //rendering menu list
    //user?. - if user exists
    const SidebarMenu = user?.isAdmin ? adminMenu : userMenu
  return (
    <>
        <div className="main">
            <div className="layout">
                <div className="sidebar">
                    <div className="logo">
                        <h6>DOC APP</h6>
                        <hr />
                    </div>
                    <div className="menu">
                        {SidebarMenu.map(menu => {
                            const isActive = location.pathname === menu.path
                            return(
                                <>
                                    <div className={`menu-item ${isActive && 'active'}`}>
                                        <i className={menu.icon}></i>
                                        <Link to={menu.path}>{menu.name}</Link>
                                    </div>
                                </>
                            )
                        })}
                        <div className={`menu-item`} onClick={handleLogout}>
                                        <i className='fa-solid fa-right-from-bracket'></i>
                                        <Link to='/login'>Logout</Link>
                                    </div>
                    </div>
                </div>
                <div className="content">
                    <div className="header">
                        <div className="header-content">
                            <Badge count={user?.notification.length}>
                                <i class="fa-solid fa-bell"></i>
                            </Badge>
                            <Link to='/profile'>{user?.name}</Link>
                        </div>
                    </div>
                    <div className="body">{children}</div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Layout