import React from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Icons from "../icons";

const Clientpayment = () => {
  Icons();
  const params = useParams();

  const obj = JSON.parse(params.data);

  obj.pageData.recipientData.name = obj.pageData.recipientData.name.replace(
    /_/g,
    " "
  );
  obj.pageData.recipientData.billing =
    obj.pageData.recipientData.billing.replace(/_/g, " ");
  obj.pageData.notes = obj.pageData.notes.replace(/_/, " ");

  const renderMaterials = () => {
    const materials = obj.pageData.services.map((item, index) => {
      return (
        <div key={index} className="reciept-for-mats-pay">
          <h2>{item.service}</h2> <h2>{item.price}$ </h2>
          <h2>{item.qty}</h2>
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
                <h2>Invoice Date </h2>
                <p>{obj.pageData.date}</p>
              </div>
              <div className="from-info-pay">
                <h2>Invoice From</h2>
                <div className="from-data-pay">
                  <FontAwesomeIcon icon="briefcase" />
                  <h2>O Miller Wielding</h2>
                  <FontAwesomeIcon icon="envelope" />
                  <h2>O.millerwelding@gmail.com</h2>
                  <FontAwesomeIcon icon="phone" />

                  <h2>(510)-472-4094</h2>
                </div>
              </div>
            </div>

            <div className="invoice-client-expense">
              <h3>Invoice Service Items</h3>

              <div className="client-pay-service-wrapper">
                <h1>Service/Material</h1> <h1>Price</h1> <h1>Quantity</h1>
              </div>
              <div className="expense-wrapper">
                {renderMaterials()}
                <h1 className="total">
                  Total {obj.pageData.total.totalExpense}$
                </h1>
                <div>{obj.pageData.notes}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="invoice-to">
        <h2>Invoice to </h2>
        <div className="invoice-to-info">
          <p>{obj.pageData.recipientData.name} </p>
          <FontAwesomeIcon icon="person" />
        </div>
        <div className="invoice-to-info">
          <p>{obj.pageData.recipientData.billing} </p>
          <FontAwesomeIcon icon="location" />
        </div>
        <div className="invoice-to-info">
          <p> {obj.pageData.recipientData.email}</p>{" "}
          <FontAwesomeIcon icon="envelope" />
        </div>
      </div>
    </div>
  );
};

export default Clientpayment;
