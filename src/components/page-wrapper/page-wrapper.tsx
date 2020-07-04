import React from 'react'
import { Card } from 'antd'
import css from './page-wrapper.scss'

interface IProps {
	title?: string;
	children: React.ReactElement;
}

const PageWrapper = ({ title, children }: IProps) => {
	return (
		<Card title={title} className={css.pageWrapper}>
			{children}
		</Card>
	)
}

export default PageWrapper
