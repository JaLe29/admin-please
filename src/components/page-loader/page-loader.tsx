import React from 'react'
import css from './page-loader.scss'
import { Spin } from 'antd'

const PageLoader = () => {
	return (
		<section className={css.pageLoader}>
			<Spin />
		</section>
	)
}

export default PageLoader
