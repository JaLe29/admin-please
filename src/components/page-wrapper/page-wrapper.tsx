import React from 'react'
import { Card } from 'antd'
import css from './page-wrapper.scss'

interface IProps {
	type?: 'normal' | 'clear'
	title?: string;
	children: React.ReactElement;
}

const PageWrapper = ({ title, children, type }: IProps) => {
	if (type === 'clear') {
		return (
			<section className={css.pageWrapper}>
				{children}
			</section>
		)
	}

	return (
		<Card title={title} className={css.pageWrapper}>
			{children}
		</Card>
	)
}

export default PageWrapper
