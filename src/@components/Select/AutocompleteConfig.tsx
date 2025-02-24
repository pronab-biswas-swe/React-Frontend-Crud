import Icon from '@components/Icon';
import { FC } from 'react';
import { DropdownIndicatorProps, StylesConfig, components } from 'react-select';

const colors = {
	primary: '#f1faff',
	secondary: '#efefef',
	success: '#e8fff3',
	danger: '#fff5f8',
	warning: '#fff8dd',
	info: '#f8f5ff',
	dark: '#eff2f5',
	light: '#eff2f5',
};

export const colourStyles = (color): StylesConfig => ({
	control: (styles) => ({
		...styles,
		minHeight: 'calc(1.5em + 1.1rem + 5px)',
		border: '1px solid var(--kt-input-border-color);',
		borderRadius: '0.425rem',
	}),
	singleValue: (styles) => ({ ...styles, color: 'var(--kt-input-color)' }),
	multiValue: (styles) => {
		return {
			...styles,
			backgroundColor: colors[color],
			borderRadius: '8px',
		};
	},
	multiValueLabel: (styles) => ({
		...styles,
		color: 'black',
	}),
	multiValueRemove: (styles) => ({
		...styles,
		color: 'black',
		':hover': {
			backgroundColor: '#e3e3e3',
			color: 'black',
		},
	}),
});

export const DropdownIndicator: FC<DropdownIndicatorProps> = (props) => {
	return (
		<components.DropdownIndicator {...props}>
			<Icon
				icon='manage_search'
				size={20}
			/>
		</components.DropdownIndicator>
	);
};
