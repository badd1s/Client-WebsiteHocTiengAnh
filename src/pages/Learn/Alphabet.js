import React from "react";
import { Alphabet1, Alphabet2 } from "../../data/Learn/Alphabet";

const Alphabet = () => {
  const part1 = Alphabet2.slice(0, 12);
  const part2 = Alphabet2.slice(12, 20);
  const part3 = Alphabet2.slice(20, 32);
  const part4 = Alphabet2.slice(32, 44);
  return (
    <>
      <div className="container-fluid bg-light">
        <div className="container bg-white p-5 rounded shadow-sm">
          {/* Bảng chữ cái */}
          <div className="py-3">
            <p className="text-center text-white fs-3 mb-4 bg-primary rounded-pill py-2">
              Bảng Chữ Cái
            </p>
            <div className="row g-2">
              {Alphabet1.map((val) => (
                <div key={val.id} className="col-6 col-sm-4 col-md-2">
                  <div className="border rounded text-center p-3 shadow-sm bg-light val-box">
                    <span className="fs-4 fw-bold">{val.value}</span>
                    <p className="mb-0">{val.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Bảng phiên âm */}
          <div className="py-3">
            <p className="text-center text-white fs-3 mb-4 bg-primary rounded-pill py-2">
              Bảng Phiên Âm
            </p>
            <div className="row d-flex">
              <div className="col-1 d-flex align-items-center justify-content-center">
                <p className="rotated-text fs-4 text-primary">Nguyên âm</p>
              </div>
              <div className="col-5 border-end border-2 border-dark">
                <p className="text-center fs-4 text-primary">Nguyên Âm Đơn</p>
                <div className="row d-flex">
                  {part1.map((val) => (
                    <div key={val.id} className="col-md-3 p-2">
                      <div className="border rounded py-3 text-center val-box shadow-sm bg-light">
                        <div className="fs-4">{val.value}</div>
                        <p className="val-text text-secondary">{val.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="col-5">
                <p className="text-center fs-4 text-primary">Nguyên Âm Đôi</p>
                <div className="row">
                  {part2.map((val) => (
                    <div key={val.id} className="col-md-3 p-2">
                      <div className="border rounded py-3 text-center val-box shadow-sm bg-light">
                        <div className="fs-4">{val.value}</div>
                        <p className="val-text text-secondary">{val.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div></div>
              <div className="col-1 d-flex align-items-center justify-content-center">
                <p className="rotated-text fs-4 text-primary">Phụ Âm</p>
              </div>
              <div className="col-5 border-top border-end border-2 border-dark">
                <div className="row">
                  {part3.map((val) => (
                    <div key={val.id} className="col-md-3 p-2">
                      <div className="border rounded py-3 text-center val-box shadow-sm bg-light">
                        <div className="fs-4">{val.value}</div>
                        <p className="val-text text-secondary">{val.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="col-5 border-top border-2 border-dark">
                <div className="row">
                  {part4.map((val) => (
                    <div key={val.id} className="col-md-3 p-2">
                      <div className="border rounded py-3 text-center val-box shadow-sm bg-light">
                        <div className="fs-4">{val.value}</div>
                        <p className="val-text text-secondary">{val.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Bảng phiên âm */}

    </>
  );
};

export default Alphabet;
