function Detail(props) {
    console.log(props);
    return (
        <div className="container">
            <h1>params.id: {props.match.params.id}</h1>
            <h1>path: {props.match.path}</h1>
            <h1>url: {props.match.url}</h1>
        </div>
    );
}
export default Detail;
