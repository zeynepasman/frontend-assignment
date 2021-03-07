import { FC } from "react";
import { Space } from 'antd';
import { DropdownMenu } from "../Dropdown/DropdownMenu";

interface FilterProps{
    setFilter: () => void
}
const Filter: FC<FilterProps> = ({ setFilter }) => {
        return (
        <Space>
                <DropdownMenu onClick={setFilter} options={["Currency Exchange Rates"]} buttonName={'Filters'}></DropdownMenu>
        </Space>
    )
}
export { Filter };
