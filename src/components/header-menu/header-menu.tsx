import React, { useState, useContext } from 'react'
import { Menu } from 'antd'
import config from 'core/config'
import { Link, useHistory } from 'react-router-dom'
import css from './header-menu.scss'
import AppContext from 'app-context'

const HeaderMenu = () => {
	const history = useHistory()
	const { setToken } = useContext(AppContext)
	const [pathName, setPathName] = useState(history.location.pathname)

	history.listen((location) => {
		setPathName(location.pathname)
	})

	const handleLogoutClicked = () => {
		setToken(null)
		window.localStorage.removeItem('admin.please.token')
	}

	return (
		<Menu mode='horizontal' theme='dark' selectedKeys={[pathName]}>
			{
				config.menu.map((menuItem: ConfigMenuItem) => (
					<Menu.Item key={menuItem.pathname}>
						<Link to={menuItem.pathname}>
							{menuItem.title}
						</Link>
					</Menu.Item>
				))
			}
			<Menu.Item className={css.logout} onClick={handleLogoutClicked}>
				Logout
			</Menu.Item>
		</Menu>
	)
}

export default HeaderMenu
