declare interface ConfigMenuItem {
	title: string;
	pathname: string;
}

declare interface DataDefinition {
	type: 'string';
	component: 'input';
	editable: boolean;
}


declare interface PageItem {
	[key: string]: {
		type: 'list';
		dataProviderKey: string;
		dataDefinition: { [key: string]: DataDefinition };
	}
}
