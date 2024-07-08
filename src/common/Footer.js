import React from "react";

const Footer = () => {
    const today = new Date();
    return (
        <>
            <footer className="footer">
                <div className="container-fluid text-center shadow-sm bg-primary py-3">
                    <div className="container mx-auto row py-2">
                        <p className="col my-auto text-white fs-1">
                            {" "}
                            HỌC, HỌC NỮA, HỌC MÃI{" "}
                        </p>
                        <p className="col my-auto text-white fs-2">
                            {" "}
                            Nỗ lực sẽ thành công{" "}
                        </p>
                        <p className="fs-1 text-white"> HUST</p>
                        <p className="text-white"> Copyright &copy; {today.getFullYear()}</p>
                    </div>
                </div>
            </footer >
        </>
    );
};

export default Footer;
