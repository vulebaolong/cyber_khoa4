import {
    DeleteOutlined,
    EditOutlined,
    PlusOutlined,
    SearchOutlined,
} from "@ant-design/icons";
import {
    AutoComplete,
    Avatar,
    Button,
    Input,
    Popconfirm,
    Popover,
    Space,
    Table,
    Tag,
    Tooltip,
} from "antd";
import { useEffect, useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import { useDispatch, useSelector } from "react-redux";
import {
    addUserProjectAction,
    deleteProjectAction,
    deleteUserProjectAction,
    getAllProjectsAction,
    getUserSearchAction,
    initProjectEditAction,
} from "../../../redux/actions/jiraAction";
import { showDrawerAction } from "../../../redux/actions/drawerAction";
import FormEditProject from "../Form/FormEditProject/FormEditProject";
import { NavLink } from "react-router-dom";

function ContentProjectManager() {
    const [value, setValue] = useState("");
    const { projects } = useSelector((state) => state.projectReducer);
    const { userSearch } = useSelector((state) => state.userReducer);
    const dispatch = useDispatch();
    const [searchText, setSearchText] = useState("");
    const [searchedColumn, setSearchedColumn] = useState("");
    const searchInput = useRef(null);
    const searchRef = useRef(null);

    const handleEdit = (record) => {
        dispatch(initProjectEditAction(record));
        dispatch(
            showDrawerAction({
                title: "Edit project",
                ComponentDrawer: <FormEditProject />,
            })
        );
    };

    useEffect(() => {
        dispatch(getAllProjectsAction());
    }, []);

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };
    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText("");
    };
    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({
            setSelectedKeys,
            selectedKeys,
            confirm,
            clearFilters,
            close,
        }) => (
            <div
                style={{
                    padding: 8,
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) =>
                        setSelectedKeys(e.target.value ? [e.target.value] : [])
                    }
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: "block",
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({
                                closeDropdown: false,
                            });
                            setSearchText(selectedKeys[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Filter
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? "#1677ff" : undefined,
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{
                        backgroundColor: "#ffc069",
                        padding: 0,
                    }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ""}
                />
            ) : (
                text
            ),
    });
    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
            width: "10%",
            ...getColumnSearchProps("id"),
            sorter: (item2, item1) => item2.id - item1.id,
        },
        {
            title: "projectName",
            key: "projectName",
            width: "20%",
            ...getColumnSearchProps("projectName"),
            sorter: (item2, item1) => {
                let projectName1 = item1.projectName.trim().toLowerCase();
                let projectName2 = item2.projectName.trim().toLowerCase();
                if (projectName2 < projectName1) return -1;
                return 1;
            },
            render: (text, itemProjectColName, index) => {
                const { projectName } = itemProjectColName;
                return (
                    <NavLink to={`/projectdetail/${itemProjectColName.id}`}>
                        {projectName}
                    </NavLink>
                );
            },
        },
        {
            title: "creator",
            key: "creator",
            ...getColumnSearchProps("creator"),
            sorter: (item2, item1) => {
                let creator1 = item1.creator.name.trim().toLowerCase();
                let creator2 = item2.creator.name.trim().toLowerCase();
                if (creator2 < creator1) return -1;
                return 1;
            },
            render: (text, record, index) => {
                const { creator } = record;
                return <Tag color="volcano">{creator.name}</Tag>;
            },
        },
        {
            title: "categoryName",
            key: "categoryName",
            ...getColumnSearchProps("categoryName"),
            sorter: (item2, item1) => {
                let categoryName1 = item1.categoryName.trim().toLowerCase();
                let categoryName2 = item2.categoryName.trim().toLowerCase();
                if (categoryName2 < categoryName1) return -1;
                return 1;
            },
            render: (text, record, index) => {
                const { categoryName, categoryId } = record;
                let color = "";
                if (categoryId === 1) color = "red";
                if (categoryId === 2) color = "gold";
                if (categoryId === 3) color = "green";
                return <Tag color={color}>{categoryName}</Tag>;
            },
        },
        // {
        //     title: "description",
        //     dataIndex: "description",
        //     key: "description",
        //     ...getColumnSearchProps("description"),
        //     sorter: (a, b) => a.description.length - b.description.length,
        //     sortDirections: ["descend", "ascend"],
        //     render: (text, record, index) => {
        //         // console.log("text: ", text);
        //         // console.log("record: ", record);
        //         // console.log("index: ", index);
        //         const textJsx = parse(text);
        //         return textJsx;
        //     },
        // },
        {
            title: "Members",
            key: "members",
            render: (_, itemProject) => {
                const { members } = itemProject;
                const membersSource = members.map((item, index) => {
                    return { ...item, key: index };
                });
                const columnsDeleteMember = [
                    {
                        title: "ID",
                        dataIndex: "userId",
                        key: "userId",
                    },
                    {
                        title: "Avatar",
                        dataIndex: "avatar",
                        key: "avatar",
                        render: (text) => (
                            <Avatar src={<img src={text} alt="avatar" />} />
                        ),
                    },
                    {
                        title: "Name",
                        dataIndex: "name",
                        key: "name",
                    },
                    {
                        title: "Action",
                        dataIndex: "action",
                        key: "action",
                        render: (_, itemMember) => {
                            return (
                                <Button
                                    type="text"
                                    danger
                                    onClick={() => {
                                        const data = {
                                            projectId: itemProject.id,
                                            userId: itemMember.userId,
                                        };
                                        dispatch(deleteUserProjectAction(data));
                                    }}
                                >
                                    Delete
                                </Button>
                            );
                        },
                    },
                ];
                const contentAvatar = members.map((item) => {
                    return (
                        <Tooltip key={item.userId} title={item.name} placement="top">
                            <Avatar src={<img src={item.avatar} alt="avatar" />} />
                        </Tooltip>
                    );
                });
                const autoComplete = (
                    <AutoComplete
                        style={{ width: "100%" }}
                        onSearch={(value) => {
                            if (searchRef.current) {
                                clearTimeout(searchRef.current);
                            }
                            searchRef.current = setTimeout(() => {
                                dispatch(getUserSearchAction(value));
                            }, 300);
                        }}
                        value={value}
                        options={userSearch.map((item) => {
                            return { label: item.name, value: `${item.userId}` };
                        })}
                        onChange={(text) => {
                            setValue(text);
                        }}
                        onSelect={(valueSelect, option) => {
                            setValue(option.label);
                            const data = {
                                projectId: itemProject.id,
                                userId: valueSelect,
                            };
                            dispatch(addUserProjectAction(data));
                        }}
                        placeholder="Search members"
                    />
                );
                const contentDeleteMember = (
                    <div style={{ width: "400px" }}>
                        <Table
                            dataSource={membersSource}
                            columns={columnsDeleteMember}
                            scroll={{ x: 240, y: 300 }}
                        />
                    </div>
                );
                return (
                    <div
                        className={`d-flex align-items-center ${
                            members.length !== 0 ? "gap-2" : ""
                        }`}
                    >
                        <Popover
                            placement="bottom"
                            title="Delete member"
                            content={() => {
                                return contentDeleteMember;
                            }}
                            trigger="click"
                        >
                            <div style={{ cursor: "pointer" }}>
                                <Avatar.Group
                                    maxCount={2}
                                    maxStyle={{
                                        color: "#f56a00",
                                        backgroundColor: "#fde3cf",
                                    }}
                                    style={{ cursor: "pointer" }}
                                >
                                    {contentAvatar}
                                </Avatar.Group>
                            </div>
                        </Popover>
                        <Popover
                            placement="bottom"
                            title="Add members"
                            content={() => {
                                return autoComplete;
                            }}
                            trigger="click"
                        >
                            <Button
                                style={{
                                    borderRadius: "50%",
                                    padding: "0px",
                                    width: "34px",
                                    height: "34px",
                                }}
                                className="d-flex align-items-center justify-content-center"
                            >
                                <PlusOutlined />
                            </Button>
                        </Popover>
                    </div>
                );
            },
        },
        {
            title: "Action",
            key: "action",
            width: "10%",
            render: (_, record) => {
                return (
                    <Space size="middle">
                        <Button
                            type="text"
                            className="d-flex gap-1 align-items-center justify-content-center"
                            onClick={() => {
                                handleEdit(record);
                            }}
                        >
                            <EditOutlined />
                        </Button>
                        <Popconfirm
                            title="Delete the project"
                            description="Are you sure to delete this project?"
                            onConfirm={() => {
                                dispatch(deleteProjectAction(record.id));
                            }}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button
                                type="text"
                                className="d-flex gap-1 align-items-center justify-content-center"
                            >
                                <DeleteOutlined />
                            </Button>
                        </Popconfirm>
                    </Space>
                );
            },
        },
    ];

    return <Table rowKey={"id"} theme={"dark"} columns={columns} dataSource={projects} />;
}
export default ContentProjectManager;
