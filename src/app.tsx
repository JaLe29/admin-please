import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import AppRouter from './router'
import LoginForm from 'components/login-form'
import AppContext from 'app-context'
import PageLoader from 'components/page-loader'
import { setToken as setApiToken } from 'core/data-provider'

const AppWithContext = () => {
	const [isInit, setInit] = useState<boolean>()
	const [token, setToken] = useState<string>()

	useEffect(() => {
		const token = window.localStorage.getItem('admin.please.token')
		if (token) {
			setApiToken(token)
			setToken(token)
		}
		setInit(true)
	}, [])

	const handleTokenChanged = (token: string) => {
		setApiToken(token)
		setToken(token)
		window.localStorage.setItem('admin.please.token', token)
	}

	if (!isInit) return <PageLoader />

	return (
		<AppContext.Provider
			value={{
				token,
				setToken: handleTokenChanged,
			}}
		>
			<App token={token} />
		</AppContext.Provider>
	)
}

const App = ({ token }: { token?: string }) => {
	if (!token) {
		return <LoginForm />
	}

	return (
		<Router>
			<AppRouter />
		</Router>
	)
}

export default AppWithContext
