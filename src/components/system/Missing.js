import { Link } from "react-router-dom"

const Missing = () => {
    return (
        <>
            <div className="container-fluid min-vh bg-light">
                <div className="container bg-white min-vh-100 p-5">
                    <div className="text-center fs-5">
                        <p>Không tìm thấy trang</p>
                        <Link reloadDocument className="fw-semibold text-black link-underline link-underline-opacity-0 link-offset-2 link-underline-opacity-100-hover" to="/">Quay về trang chủ</Link>
                    </div>
                </div>
            </div>

        </>

    )
}

export default Missing