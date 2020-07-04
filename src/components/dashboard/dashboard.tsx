import React, { useEffect, useState } from 'react'
import { MOCK_PROVIDER } from 'core/data-provider'
import config from 'core/config'
import { DownloadOutlined } from '@ant-design/icons'
import { Statistic, Button, Card } from 'antd'
import css from './dashboard.scss'

const Dashboard = () => {
	const [isLoading, setLoading] = useState(true)
	const [data, setData] = useState({})

	const fetchData = async () => {
		setLoading(true)
		const fetchedData = await MOCK_PROVIDER.dashboard.list()
		setData(fetchedData)
		setLoading(false)
	}

	useEffect(() => {
		fetchData()
	}, [])

	return (
		<>
			<div className={css.actionHeader}>
				<div>
					<Button
						loading={isLoading}
						icon={<DownloadOutlined />}
						onClick={fetchData}
					/>
				</div>
			</div>
			<div className={css.dashboard}>
				{
					Object.keys(config.dashboard).map((key: string) => (
						<Card key={key} className={css.card}>
							<Statistic
								title={key}
								value={isLoading ? 'loading' : data[key]}
							/>
						</Card>
					))
				}
			</div>
		</>
	)
}

export default Dashboard
