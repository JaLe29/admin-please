import React from 'react'
import { Switch as AntdSwitch } from 'antd'

interface IProps {
	value: boolean;
	disabled: boolean;
	onChange: (nextValue: boolean) => void;
}

const Switch = ({ disabled, value, onChange }: IProps) => {
	return (
		<AntdSwitch disabled={disabled} checked={value} onChange={(onChange)} />
	)
}

export default Switch
