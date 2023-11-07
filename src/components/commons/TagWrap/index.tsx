import { Tag } from "antd";
import clsx from "clsx";

import style from './style.module.scss';

const TagWrap: React.FC<any> = ({
	className,
    children,
    width,
    height,
    textColor,
    borderColor,
    backgroundColor,
    fontSize,
    text,
	...props
}) => {
    return (
        <Tag
        className={clsx(style.tag__wrap, className)}
        style={{
            height: height,
            color: textColor,
            borderColor: borderColor,
            background: backgroundColor,
            fontSize: fontSize,
        }}
		{...props}
		>
			{text}
		</Tag>
    );
};

export default TagWrap;