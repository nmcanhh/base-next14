import { Button } from "antd";
import clsx from "clsx";

import style from './style.module.scss';

const ButtonWrap: React.FC<any> = ({
	className,
    children,
	...props
}) => {
    return (
        <Button
        className={clsx(style.button__wrap, props?.type === 'primary' && style.button__wrap__primary, className)}
        style={{
            width: props?.width
        }}
			{...props}
		>
			{children}
		</Button>
    );
};

export default ButtonWrap;