import React from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Icons from "../icons";

const Clientpayment = () => {
  Icons();
  const params = useParams();

  const obj = JSON.parse(params.data);
  console.log(obj);
  obj.pageData.recipientData.name = obj.pageData.recipientData.name.replace(
    /_/g,
    " "
  );
  obj.pageData.recipientData.billing =
    obj.pageData.recipientData.billing.replace(/_/g, " ");

  const renderMaterials = () => {
    const materials = obj.pageData.services.map((item, index) => {
      return (
        <div key={index} className="reciept-for-mats-pay">
          <div>{item.service}</div> <div>{item.price}$ </div>
          <div>{item.qty}</div>
        </div>
      );
    });
    return materials;
  };

  return (
    <div className="client-pay-body">
      <div className="client-pay-app">
        <div className="client-wrapper-pay">
          <h1>O Miller Wielding</h1>

          <h2>Invoice Details</h2>
          <div className="invoice-details">
            <div className="invoice-detail">
              <div className="invoice-date">
                <h4>Invoice Date </h4>
                <p>{obj.pageData.date}</p>
              </div>
              <div className="from-info-pay">
                <h4>Invoice From</h4>
                <div className="from-data-pay">
                  <FontAwesomeIcon icon="briefcase" />
                  <p>O Miller Wielding</p>
                  <FontAwesomeIcon icon="envelope" />
                  <p>O.millerwelding@gmail.com</p>
                  <FontAwesomeIcon icon="phone" />

                  <p>(510)-472-4094</p>
                </div>
              </div>
            </div>

            <div className="invoice-client-expense">
              <h3>Invoice Service Items</h3>

              <div className="client-pay-service-wrapper">
                <div>Service/Material</div> <div>Price</div> <div>Quantity</div>
              </div>
              <div className="expense-wrapper">
                {renderMaterials()}{" "}
                <h5>Subtotal {obj.pageData.total.subTotal}$ </h5>
                <h5>Tax Rate 8% {obj.pageData.total.tax}$</h5>
                <h4>Total {obj.pageData.total.totalExpense}$</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="invoice-to">
        <h6>Invoice to </h6>
        <div className="invoice-to-info">
          {obj.pageData.recipientData.name}
          <FontAwesomeIcon icon="person" />
        </div>
        <div className="invoice-to-info">
          {obj.pageData.recipientData.billing}
          <FontAwesomeIcon icon="location" />
        </div>
        <div className="invoice-to-info">
          {obj.pageData.recipientData.email} <FontAwesomeIcon icon="envelope" />
        </div>
      </div>
    </div>
  );
};

export default Clientpayment;
