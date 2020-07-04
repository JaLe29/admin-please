import React from 'react'
import { Switch, Route } from 'react-router-dom'
import List from 'components/list'
import config from './core/config'
import PageWrapper from 'components/page-wrapper'
import { capitalize } from 'utils/string'
import { Alert } from 'antd'
import Form from 'components/form'
import HeaderMenu from 'components/header-menu'
import Dashboard from 'components/dashboard'

const Router = () => {
	const pageKeys = Object.keys(config.pages)

	return (
		<>
			<HeaderMenu />
			<Switch>
				{
					pageKeys.map((pageKey: string) => (
						<Route
							key={pageKey}
							path={`/${pageKey}/detail/:id?`}
							component={({ match: { params: { id } } }: any) => {
								return (
									<PageWrapper title={capitalize(pageKey)}>
										<Form
											dataProviderKey={config.pages[pageKey].dataProviderKey}
											dataDefinition={config.pages[pageKey].dataDefinition}
											id={id}
										/>
									</PageWrapper>
								)
							}}
						/>
					))
				}

				{
					pageKeys.map((pageKey: string) => (
						<Route
							key={pageKey}
							path={`/${pageKey}`}
							component={() => {
								return (
									<PageWrapper title={capitalize(pageKey)}>
										<List
											dataProviderKey={config.pages[pageKey].dataProviderKey}
											dataDefinition={config.pages[pageKey].dataDefinition}
											actions={config.pages[pageKey].actions || []}
										/>
									</PageWrapper>
								)
							}}
						/>
					))
				}
				<Route route='/' render={() => (
					<PageWrapper type='clear' title={'Dashboard'}>
						<Dashboard />
					</PageWrapper>
				)} />

				<Route render={() => (
					<PageWrapper>
						<Alert
							message='Error'
							description="This component doesn't exist"
							type='error'
							showIcon
						/>
					</PageWrapper>
				)} />
			</Switch>
		</>
	)
}

export default Router
