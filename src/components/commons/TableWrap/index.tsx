import { Table } from 'antd';
import clsx from 'clsx';

import style from './style.module.scss';

const TableWrap: React.FC<any> = ({ className, ...props }) => {
	return <Table className={clsx(style.table_wrap, className)} {...props}/>;
};

export default TableWrap;
