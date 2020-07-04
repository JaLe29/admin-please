import React, { useEffect, useState, useCallback } from 'react'
import { MOCK_PROVIDER } from 'core/data-provider'
import { Table, Button } from 'antd'
import { useHistory, Link } from 'react-router-dom'
import { DownloadOutlined } from '@ant-design/icons'
import { PlusOutlined } from '@ant-design/icons'
import css from './list.scss'

interface IProps {
	dataProviderKey: string;
	dataDefinition: DataDefinition;
	actions: string[];
}

const List = ({ dataDefinition, dataProviderKey, actions, }: IProps) => {
	const history = useHistory()
	const [isLoading, setLoading] = useState(true)
	const [data, setData] = useState([])

	const hasCreateAction = actions.includes('create')

	const fetchData = async () => {
		setLoading(true)
		const fetchedData = await MOCK_PROVIDER[dataProviderKey].list()
		setData(fetchedData)
		setLoading(false)
	}

	useEffect(() => {
		fetchData()
	}, [])

	const getColumns = useCallback(() => {
		return Object.keys(dataDefinition)
			.filter((definitionItemKey: string) => dataDefinition[definitionItemKey].list) // is in list ?
			.map((definitionItemKey: string, index: number) => (
				{
					title: definitionItemKey,
					dataIndex: definitionItemKey,
					key: `${definitionItemKey}-${index}`,
					render: dataDefinition[definitionItemKey].render
				}
			))
	}, [dataDefinition])

	const handleRowClicked = (id: string) => history.push(`/${dataProviderKey}/detail/${id}`)

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
				{hasCreateAction && (
					<Link to={`/${dataProviderKey}/detail/`}>
						<Button icon={<PlusOutlined />}>
							Create
						</Button>
					</Link>
				)}
			</div>

			<Table
				loading={isLoading}
				dataSource={data}
				columns={getColumns()}
				onRow={(record: { id: string }) => {
					return {
						onClick: () => handleRowClicked(record.id),
					}
				}}
			/>
		</>
	)
}

export default List
