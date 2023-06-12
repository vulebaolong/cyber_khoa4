function HeaderMain(props) {
    const { path, title } = props;
    return (
        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <a href="/">Home</a>
                    </li>
                    <li className="breadcrumb-item">
                        <a href="/">Library</a>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                        {path}
                    </li>
                </ol>
            </nav>
            <h2>{title}</h2>
        </div>
    );
}
export default HeaderMain;
