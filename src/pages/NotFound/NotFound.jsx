function NotFound(props) {
    console.log(props);
    return (
        <div className="container">
            <h1 className="text-center">NotFound</h1>
            <h2 className="text-center">Không tìm thấy đường dẫn {props.match.url}</h2>
        </div>
    );
}
export default NotFound;
