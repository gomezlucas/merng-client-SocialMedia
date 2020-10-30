import React, { useState, useContext } from 'react';
import { Menu, Segment } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/auth'

const MenuBar = () => {
    const { user, logout } = useContext(AuthContext)
    const pathName = window.location.pathname

    const path = pathName === '/' ? 'home' : pathName.substr(1)
    const [activeItem, setactiveItem] = useState(path)

    const handleItemClick = ((e, { name }) => {
        setactiveItem(name)
    })

    const menuBar =
        user ?
            (<div>
                <Menu pointing secondary size="massive" color="teal">
                    <Menu.Item
                        name={user.username}
                        as={Link}
                        to="/"
                    />

                    <Menu.Menu position='right'>
                        <Menu.Item
                            name='logout'
                            onClick={logout}
                            as={Link}
                            to="/login"
                        />
                    </Menu.Menu>
                </Menu>
            </div>)
            :
            (<div>
                <Menu pointing secondary size="massive" color="teal">
                    <Menu.Item
                        name='home'
                        active={activeItem === 'home'}
                        onClick={handleItemClick}
                        as={Link}
                        to="/"
                    />

                    <Menu.Menu position='right'>
                        <Menu.Item
                            name='register'
                            active={activeItem === 'register'}
                            onClick={handleItemClick}
                            as={Link}
                            to="/register"
                        />
                        <Menu.Item
                            name='login'
                            active={activeItem === 'login'}
                            onClick={handleItemClick}
                            as={Link}
                            to="/login"
                        />
                    </Menu.Menu>
                </Menu>
            </div>)

    return menuBar

        ;
}

export default MenuBar;