import { Input } from 'antd';
import clsx from 'clsx';

import style from './style.module.scss';

const InputWrap: React.FC<any> = ({ className, ...props }) => {
	return <Input className={clsx(style.input__wrap, className)} {...props} />;
};

export default InputWrap;
