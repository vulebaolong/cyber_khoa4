import { Button, Drawer, Space } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { hideDrawerAction, showDrawerAction } from "../redux/actions/drawerAction";
import axios from "axios";

function DrawerRight() {
    const { open, ContentComponentDrawer, handleSubmit } = useSelector(
        (state) => state.drawerReducer
    );
    const dispatch = useDispatch();
    const showDrawer = async () => {
        const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
        const wait = function (second) {
            return new Promise(function (resolve) {
                setTimeout(resolve, second);
            });
        };
        const arrPro = arr.map(() => {
            const pro = wait(1000);
            return pro;
        });

        const allPro = await Promise.all(arrPro);
        console.log("đã ông", allPro);
    };
    const onClose = () => {
        dispatch(hideDrawerAction());
    };
    return (
        <>
            {/* <Button style={{ zIndex: 5555 }} type="primary" onClick={showDrawer}>
                New account
            </Button> */}
            <Drawer
                title="Create a new account"
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
                <ContentComponentDrawer />
            </Drawer>
        </>
    );
}
export default DrawerRight;
