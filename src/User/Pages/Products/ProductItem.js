import React from "react";
import { Link } from "react-router-dom";

import LineImage from "assets/images/lines.png";

const ProductItem = ({ list }) => {
  return (
    <React.Fragment>
      <section className="our-products details">
        <div className="container">
          <div className="similar-items">
            <p className="similar mb-0">Similar items you might like</p>
            <p className="small mb-0">Based on what customers bought</p>
          </div>

          <div className="row water product-detail">
            <div className="container">
              <div className="Product-heading text-center">
                <h1 className="text-center mb-0">Our Products</h1>
                <img src={LineImage} alt="" className="img-fluid" />
              </div>
              <div className="row">
                {list.map((item, idx) => (
                  <div key={idx} className="col-md-4">
                    <div className="box">
                      <div className="product-center text-center">
                        <img
                          src={item?.image}
                          alt=""
                          className="setbottleheight img-fluid"
                        />
                        <p className="first">{item?.title}</p>
                        <p className="first third">{item?.description}</p>
                        <div className="contact">
                          <div className="clip">
                            <div className="round"></div>
                            <Link to={`/products/?id=${item.id}`}>View</Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default ProductItem;
