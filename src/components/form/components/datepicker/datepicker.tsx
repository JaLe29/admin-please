import React from 'react'
import { DatePicker as DatePickerAntd } from 'antd'
import moment from 'moment'

// TODO type
interface IProps {
	value?: string;
	disabled: boolean;
	onChange: (nextValue: any) => void;
}

const Datepicker = ({ value, disabled, onChange }: IProps) => {
	return (
		<DatePickerAntd
			showTime
			value={value ? moment(value) : undefined}
			disabled={disabled}
			onChange={(m: any, date: any) => onChange(date)}
		/>
	)
}

export default Datepicker
