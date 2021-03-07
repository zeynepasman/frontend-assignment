import { FC } from "react";
import { Space } from 'antd';
import { DropdownMenu } from "../Dropdown/DropdownMenu";

interface FilterProps{
    setFilter: () => void,
    options: Array<string>
}
const Filter: FC<FilterProps> = ({ setFilter, options }) => {

        return (
        <Space>
                <DropdownMenu onClick={setFilter} options={options} buttonName={'Filters'}></DropdownMenu>
        </Space>
    )
}
export { Filter };
