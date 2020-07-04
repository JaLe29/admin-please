import React from 'react'
import css from './wrapper.scss'

interface IIProps {
	name: string;
	required?: boolean;
	children: React.ReactElement;
}

const Wrapper = ({ required, name, children }: IIProps) => {
	return (
		<div>
			<header className={css.header}>
				<h3>
					{name}
				</h3>
				{required && (
					<span className={css.requiredStar}>
						*
					</span>
				)}
			</header>
			{children}
		</div>
	)
}

export default Wrapper
