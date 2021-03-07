import { FC } from "react";
import { Dropdown as AntdDropdown } from "antd";
import { Menu, Button } from "antd";

interface DropdownProps {
    options: Array<string>,
    buttonName: string,
    onClick: () => void
}

const DropdownMenu: FC<DropdownProps> = ({
    options,
    buttonName,
    onClick,
    ...otherDropdownProps
}) => (
    <>
        <AntdDropdown
            overlay={(
                <Menu>
                    {options.map(option => {
                        return (
                            <Menu.Item
                                key={option}
                                onClick={onClick}
                            >
                                {option}
                            </Menu.Item>
                        )
                    })}
                </Menu>
            )}
            arrow
            {...otherDropdownProps}
        >
            <Button>
                {buttonName}
            </Button>
        </AntdDropdown>
    </>
    
);
export { DropdownMenu };
