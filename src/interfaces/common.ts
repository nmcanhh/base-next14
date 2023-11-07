import { HTMLAttributes } from 'react';

export interface ISvg extends HTMLAttributes<SVGElement> {
	fill?: string;
	width?: number;
	height?: number;
	onClick?: () => void;
}
