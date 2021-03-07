import { ComponentProps, FC } from "react";
import { Tag as AntdTag } from "antd";
const { CheckableTag } = AntdTag;

interface TagProps extends ComponentProps<typeof CheckableTag>{
    tagsData: Array<string>,
    selectedTags: Array<string>,
    checked:boolean,
    handleChange: (checked: boolean, tag: string) => void,
    listTitle: string
}

const TagList: FC<TagProps> = ({
    tagsData,
    selectedTags,
    handleChange,
    checked,
    listTitle,
    ...otherTagProps
}) => {
    return (
        <>
            <span style={{ marginRight: 8 }}>{listTitle}</span>
            {tagsData.map(tag => {
                return (
                    <CheckableTag
                        key={tag}
                        checked={selectedTags.indexOf(tag) > -1}
                        onChange={(checked) => { handleChange(checked, tag) }}
                        {...otherTagProps}
                    >
                        {tag}
                    </CheckableTag>
                )
            })}
            <br />
        </>
    )
}
export { TagList };
