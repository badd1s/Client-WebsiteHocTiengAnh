import { useNavigate } from "react-router-dom"

const Unauthorized = () => {
    const navigate = useNavigate();

    const goBack = () => navigate(-1);

    return (
        <section>
            <h1>Chưa xác thực</h1>
            <br />
            <p>Bạn không có quyền truy cập trang này.</p>
            <div>
                <button onClick={goBack}>Quay về</button>
            </div>
        </section>
    )
}

export default Unauthorized