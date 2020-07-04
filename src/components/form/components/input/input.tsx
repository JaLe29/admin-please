import React from 'react'
import { Input as AntdInput } from 'antd'

interface IProps {
	placeholder: string;
	value: string;
	disabled: boolean;
	onChange: (nextValue: string) => void;
}

const Input = ({ placeholder, value, disabled, onChange }: IProps) => {
	return (
		<AntdInput
			placeholder={placeholder}
			value={value}
			disabled={disabled}
			onChange={(event: React.ChangeEvent<HTMLInputElement>) => onChange(event.target.value)}
		/>
	)
}

export default Input
