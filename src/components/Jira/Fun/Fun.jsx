import { Button } from "antd";
import axios from "axios";

function Fun() {
    const DOMAIN = "https://casestudy.cyberlearn.vn/api";
    const TOKEN = "access_token";
    const handleEditAllProject = async () => {
        const result = await axios({
            url: `${DOMAIN}/Project/getAllProject`,
            method: "GET",
            headers: { Authorization: `Bearer ${localStorage.getItem(TOKEN)}` },
        });
        const data = result.data.content;
        console.log(data);
        const arrPro = data.map((item) => {
            const id = item.id;
            const payload = {
                id: id,
                projectName: "Vũ Lê Bảo Long Đẹp Trai Nhất Vũ Trụ",
                description: "Vũ Lê Bảo Long Đẹp Trai",
                categoryId: 1,
            };
            const proMise = axios({
                url: `${DOMAIN}/Project/updateProject?projectId=${id}`,
                method: "PUT",
                data: payload,
                headers: { Authorization: `Bearer ${localStorage.getItem(TOKEN)}` },
            });
            return proMise;
        });
        const proAll = await Promise.all(arrPro);
        console.log("Đã hoàn thành", proAll);
        // for (let index = 0; index < data.length; index++) {
        //     console.log(data[index].id);
        //     const id = data[index].id;
        //     const payload = {
        //         id: id,
        //         projectName: "Vũ Lê Bảo Long Đẹp Trai",
        //         description: "Vũ Lê Bảo Long Đẹp Trai",
        //         categoryId: 1,
        //     };
        //     axios({
        //         url: `${DOMAIN}/Project/updateProject?projectId=${id}`,
        //         method: "PUT",
        //         data: payload,
        //         headers: { Authorization: `Bearer ${localStorage.getItem(TOKEN)}` },
        //     });
        // }
    };
    const handleCreateProject = () => {
        for (let index = 0; index < 1000; index++) {
            const data = {
                projectName: "Vũ Lê Bảo Long Đẹp Trai Nhất Vũ Trụ",
                description: "Vũ Lê Bảo Long Đẹp Trai Nhất Vũ Trụ",
                categoryId: Math.floor(Math.random() * 3) + 1,
            };
            axios({
                url: `${DOMAIN}/Project/createProjectAuthorize`,
                method: "POST",
                data,
                headers: { Authorization: `Bearer ${localStorage.getItem(TOKEN)}` },
            });
        }
    };
    return (
        <>
            <Button
                style={{ zIndex: 99999 }}
                type="primary"
                onClick={() => {
                    handleEditAllProject();
                }}
            >
                Edit All Project
            </Button>
            <Button
                style={{ zIndex: 99999 }}
                type="primary"
                onClick={() => {
                    handleCreateProject();
                }}
            >
                Create 1000 Project
            </Button>
        </>
    );
}
export default Fun;
