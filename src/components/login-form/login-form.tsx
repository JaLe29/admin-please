import React, { useState, useContext } from 'react'
import css from './login-form.scss'
import { Input, Button, Card, notification } from 'antd'
import { MOCK_PROVIDER } from 'core/data-provider'
import AppContext from 'app-context'

const LoginForm = () => {
	const { setToken } = useContext(AppContext)
	const [isLoading, setLoading] = useState(false)
	const [name, setName] = useState('')
	const [psw, setPsw] = useState('')

	const handleButtonClicked = async () => {
		setLoading(true)
		try {
			const loginResponse = await MOCK_PROVIDER.adminPleaseSystemAuth.login(name, psw)
			setToken(loginResponse.token)
		} catch (e) {
			console.error(e)
			notification.error({
				message: 'Login failed',
			})
		}
		setLoading(false)
	}

	const loginBtnDisabled = name.length === 0 || psw.length === 0

	return (
		<Card className={css.loginForm}>
			<h3>
				Name
			</h3>
			<Input
				value={name}
				onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
			/>

			<h3>
				Password
			</h3>
			<Input
				type='password'
				value={psw}
				onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPsw(e.target.value)}
			/>
			<Button
				loading={isLoading}
				type='primary'
				onClick={handleButtonClicked}
				disabled={loginBtnDisabled}
			>
				Login
			</Button>
		</Card>
	)
}

export default LoginForm
