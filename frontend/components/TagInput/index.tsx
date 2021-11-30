import ReactTagInput from "@pathofdev/react-tag-input";

interface Props {
    tags: string[],
    onChange: (tags: any) => void
}

const TagInput = ({ tags, onChange }: Props) => {
    return (
        <span>
            <label style={{ fontSize: '1.8rem' }} >Tags:</label>
            <ReactTagInput
                tags={tags}
                onChange={onChange}
            />
        </span>
    )
}

export default TagInput