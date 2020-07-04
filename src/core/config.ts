import moment from 'moment'

const config = {
	'menu': [
		{
			title: 'Dashboard',
			pathname: '/'
		},
		{
			title: 'Users',
			pathname: '/users'
		},
		{
			title: 'Logs',
			pathname: '/logs'
		}
	],
	dashboard: {
		usersToday: {
			component: 'numberWidget',
		},
		usersTotal: {
			component: 'numberWidget',
		},
		sessionsToday: {
			component: 'numberWidget',
		},
		sessionsTotal: {
			component: 'numberWidget',
		}
	},
	pages: {
		users: {
			dataProviderKey: 'users',
			actions: [
				'create'
			],
			dataDefinition: {
				sessionsCount: {
					type: 'number',
					component: 'input',
					editable: false,
					list: true,
				},
				id: {
					type: 'string',
					component: 'input',
					editable: false,
					list: true,
				},
				password: {
					type: 'string',
					component: 'input',
					editable: true,
					required: true,
				},
				email: {
					type: 'string',
					component: 'input',
					editable: true,
					required: true,
					list: true,
				},
				firstName: {
					type: 'string',
					component: 'input',
					editable: true,
					list: true,
				},
				createdAt: {
					type: 'string',
					component: 'datepicker',
					editable: true,
					render: (v?: string) => v ? moment(v).format('HH:MM DD/MM/YYYY') : v,
					list: true,
				},
				isAdmin: {
					type: 'boolean',
					component: 'switch',
					editable: true,
				},
			}
		},
		logs: {
			dataProviderKey: 'logs',
			dataDefinition: {
				id: {
					type: 'string',
					component: 'input',
					editable: false,
					list: true,
				},
				user: {
					type: 'string',
					component: 'input',
					required: true,
					editable: true,
					list: true,
				},
				action: {
					type: 'string',
					component: 'input',
					editable: true,
					list: true,
				},
				createdAt: {
					type: 'string',
					component: 'datepicker',
					editable: true,
					render: (v?: string) => v ? moment(v).format('HH:MM DD/MM/YYYY') : v,
					list: true,
				}
			}
		}
	}
}

export default config
