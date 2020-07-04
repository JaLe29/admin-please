import React, { useEffect, useState } from 'react'
import { MOCK_PROVIDER } from 'core/data-provider'
import { Spin, Button, Divider, Row, Col, notification, Alert } from 'antd'
import { Link, useHistory } from 'react-router-dom'
import { LoadingOutlined } from '@ant-design/icons'
import css from './form.scss'
import Wrapper from './components/wrapper'

import Input from './components/input'
import DatePicker from './components/datepicker'
import Switch from './components/switch'

const COMPONENTS_MAP = {
	'input': Input,
	'datepicker': DatePicker,
	'switch': Switch,
}

interface IProps {
	id?: string;
	dataProviderKey: string;
	dataDefinition: DataDefinition;
}

const Form = ({ id, dataProviderKey, dataDefinition }: IProps) => {
	const history = useHistory()
	const [isSaving, setSaving] = useState(false)
	const [isLoading, setLoading] = useState(true)
	const [data, setData] = useState({})
	const [localData, setLocalData] = useState({})

	const isCreateAction = !id

	useEffect(() => {
		const fetchData = async () => {
			const fetchedData = await MOCK_PROVIDER[dataProviderKey].detail(id)
			setData(fetchedData)
			setLoading(false)
		}
		if (isCreateAction) {
			setLoading(false)
			return
		}
		fetchData()
	}, [])

	const handleSaveClicked = async (redirect?: boolean) => {
		setSaving(true)

		if (isCreateAction) {
			await MOCK_PROVIDER[dataProviderKey].create(localData)
		} {
			await MOCK_PROVIDER[dataProviderKey].edit(id, localData)
		}

		setData({ ...data, ...localData })
		setLocalData({})

		setSaving(false)

		notification.success({
			message: `${dataProviderKey} has been ${isCreateAction ? 'created' : 'saved'} successfully`,
		})

		if (redirect) history.push(`/${dataProviderKey}`)
	}

	const onValueChange = (key: string, value: any) => {
		const nextLocalData = {
			...localData,
			[key]: value
		}

		console.log({
			next: nextLocalData[key],
			data: data[key],
			cond: nextLocalData[key] === data[key]
		})

		if (nextLocalData[key] === data[key]) {
			// value is same
			delete nextLocalData[key]
		}

		setLocalData(nextLocalData)
	}

	if (isLoading) {
		return (
			<section className={css.formLoadingWrappper}>
				<Spin />
			</section>
		)
	}

	const isSaveDisabled = Object.keys(localData).length === 0

	return (
		<>
			<Button>
				<Link to={`/${dataProviderKey}`}>
					Back
				</Link>
			</Button>
			<Divider />
			<Row gutter={16}>
				{
					Object.keys(dataDefinition).map((key: string) => {
						const TargetComponent = COMPONENTS_MAP[dataDefinition[key].component]

						if (!TargetComponent) {
							console.error(`Missing component ${dataDefinition[key].component}`)
							return (
								<Alert
									message='Error'
									description="This component doesn't exist"
									type='error'
									showIcon
								/>
							)
						}

						return (
							<Col span={6} key={key}>
								<Wrapper name={key} required={dataDefinition[key].required}>
									<TargetComponent
										placeholder={key}
										value={
											dataDefinition[key].type !== 'boolean'
												? localData[key] || data[key] || ''
												: typeof localData[key] === 'boolean' ? localData[key] : data[key]
										}
										disabled={!dataDefinition[key].editable}
										onChange={(value: any) => onValueChange(key, value)}
									/>
								</Wrapper>
							</Col>
						)
					})
				}
			</Row>
			<Divider />
			<div className={css.buttonArea}>
				{
					!isSaving
						? (
							<>
								<Button>
									<Link to={`/${dataProviderKey}`}>
										Cancel
									</Link>
								</Button>
								<Button
									type='primary'
									disabled={isSaveDisabled}
									onClick={() => handleSaveClicked(true)}
								>
									{isCreateAction ? 'Create' : 'Save'} and close
								</Button>
								<Button
									type='primary'
									disabled={isSaveDisabled}
									onClick={() => handleSaveClicked()}
								>
									{isCreateAction ? 'Create' : 'Save'}
								</Button>
							</>
						)
						: <LoadingOutlined spin />
				}

			</div>
		</ >
	)
}

export default Form
