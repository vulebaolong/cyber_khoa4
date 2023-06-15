import { Button, Drawer, Space } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { hideDrawerAction } from "../redux/actions/drawerAction";

function DrawerRight() {
    const { open, ComponentDrawer, handleSubmit, title } = useSelector(
        (state) => state.drawerReducer
    );
    const dispatch = useDispatch();
    // const showDrawer =  () => {
    //
    // };
    const onClose = () => {
        dispatch(hideDrawerAction());
    };
    return (
        <>
            {/* <Button style={{ zIndex: 5555 }} type="primary" onClick={showDrawer}>
                New account
            </Button> */}
            <Drawer
                title={title}
                width={720}
                onClose={onClose}
                open={open}
                bodyStyle={{
                    paddingBottom: 80,
                }}
                footer={
                    <Space>
                        <Button onClick={onClose}>Cancel</Button>
                        <Button
                            onClick={() => {
                                handleSubmit();
                            }}
                            type="primary"
                        >
                            Submit
                        </Button>
                    </Space>
                }
            >
                {ComponentDrawer}
            </Drawer>
        </>
    );
}
export default DrawerRight;
