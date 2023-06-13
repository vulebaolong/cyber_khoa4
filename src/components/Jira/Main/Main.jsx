import style from "./Main.module.css";

function Main({ children }) {
    return <div className={style.main}>{children}</div>;
}
export default Main;
