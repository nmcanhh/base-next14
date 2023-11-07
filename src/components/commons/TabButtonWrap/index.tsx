import clsx from 'clsx';

import style from './style.module.scss';

interface ITabButton {
	className?: string;
	enabled: boolean;
	index: number;
	text: string;
	onClick: any;
}

const TabButtonWrap: React.FC<ITabButton> = ({
	className,
	enabled,
	index,
	text,
	onClick,
}) => {
	return (
		<div
			className={clsx(style.tabButtonWrap, className, {
				[style.nthBtn]: index !== 1,
				[style.btnEnable]: enabled,
				[style.btnDisable]: !enabled,
			})}
			onClick={onClick}
		>
			<span
				className={clsx({
					[style.textEnable]: enabled,
					[style.textDisable]: !enabled,
				})}
			>
				{text}
			</span>
		</div>
	);
};

export default TabButtonWrap;
