import { Select } from "antd";
const onChange = (value) => {
    console.log(`selected ${value}`);
};
const onSearch = (value) => {
    console.log("search:", value);
};
const option = [
    {
        value: "jack",
        label: "Jack",
    },
    {
        value: "lucy",
        label: "Lucy",
    },
];

function Selectt() {
    return (
        <div style={{ zIndex: 99999, position: "relative" }}>
            <Select
                showSearch
                placeholder="Select a person"
                optionFilterProp="children"
                onChange={onChange}
                onSearch={onSearch}
                filterOption={(input, option) =>
                    (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
                }
                options={option}
            />
        </div>
    );
}
export default Selectt;
