import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import axios from "axios";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      service: "",
      price: 0,
      serviceToPurchase: [],
      recipient: "",
      quantity: 1,
      date: new Date(),
      err: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.renderMaterials = this.renderMaterials.bind(this);
    this.addMatItems = this.addMatItems.bind(this);
    this.handleRecipient = this.handleRecipient.bind(this);
    this.subTotal = this.subTotal.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
  }

  subTotal = () => {
    let total = 0;
    this.state.serviceToPurchase.map((item) => (total += item.price));
    return total;
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  renderMaterials = () => {
    const materials = this.state.serviceToPurchase.map((item, index) => {
      return (
        <div key={index} className="reciept-for-mats">
          <div>{item.service.replace(/_/g, " ")}</div> <div>{item.price}$ </div>
          <div>{item.qty}</div>{" "}
          <button
            style={{
              backgroundColor: "transparent",
              color: "rgba(62, 111, 245, 0.938)",
              fontSize: "150%",
            }}
            onClick={(index) => {
              this.state.serviceToPurchase.pop(index);
              this.setState({
                serviceToPurchase: this.state.serviceToPurchase,
              });
            }}
          >
            <FontAwesomeIcon icon="trash" />
          </button>
        </div>
      );
    });
    return materials;
  };

  addMatItems = () => {
    let thePrice = parseInt(this.state.price);

    if (isNaN(thePrice)) {
      thePrice = 0;
    }
    this.setState({
      serviceToPurchase: this.state.serviceToPurchase.concat({
        service: this.state.service.replace(/ /g, "_"),
        price: thePrice,
        qty: this.state.quantity,
      }),
      service: "",
      price: 0,
      quantity: 1,
    });
  };

  handleRecipient = () => {
    const recipientEmail = document.getElementById("Recipient");
    const recipientName = document.getElementById("Name");
    const recipientBilling = document.getElementById("Billing-Address");
    const reciObj = {
      name: recipientName.value.replace(/ /g, "_").toUpperCase(),
      email: recipientEmail.value,
      billing: recipientBilling.value.replace(/ /g, "_").toUpperCase(),
    };

    this.setState({
      recipient: reciObj,
    });
  };

  handleEmail = () => {
    let totalExpense = this.subTotal();
    const mailBody = {
      mailTo: this.state.recipient["email"],
      pageData: {
        recipientData: this.state.recipient,
        services: this.state.serviceToPurchase,
        total: {
          tax: totalExpense * 0.08,
          subTotal: totalExpense,
          totalExpense: totalExpense * 0.08 + totalExpense,
        },
        date: new Date().toDateString().replace(/ /g, "-"),
      },
    };
    const headers = {
      "Content-Type": "application/json",
    };
    //"https://invoiceappnodejs.herokuapp.com/send_mail"
    axios
      .post("https://git.heroku.com/invoiceappnodejs.git/send_mail", mailBody)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
        this.setState({ err: true });
      });
  };

  render() {
    let totalExpense = this.subTotal();
    return (
      <div className="App">
        <h1>O Miller Wielding</h1>

        <h2>Invoice Details</h2>
        <div className="invoice-details">
          <div className="invoice-detail">
            <div className="invoice-date">
              <h4>Invoice Date </h4>
              <p>{this.state.date.toDateString()}</p>
            </div>
            <div className="from-info">
              <h4>Invoice From</h4>
              <div className="from-data">
                <p>
                  <FontAwesomeIcon icon="briefcase" /> O Miller Wielding
                </p>
                <p>
                  <FontAwesomeIcon icon="envelope" /> O.millerwelding@gmail.com
                </p>
                <p>
                  <FontAwesomeIcon icon="phone" /> (510)-472-4094
                </p>
              </div>
            </div>
          </div>

          <div className="invoice-material-detail">
            <h3>Invoice Service Items</h3>

            <div className="material-cost">
              <h4>Materials</h4>

              <h4>Price </h4>

              <h4>Qty</h4>

              <input
                type="text"
                name="service"
                value={this.state.service}
                onChange={(e) => this.handleChange(e)}
                placeholder="Add Service"
              />
              <input
                type="text"
                name="price"
                value={this.state.price}
                onChange={(e) => this.handleChange(e)}
                placeholder="Add Cost of Service"
              />
              <div className="qty-wrapper">
                <button
                  onClick={() =>
                    this.setState({ quantity: this.state.quantity - 1 })
                  }
                >
                  -
                </button>
                <h2> {this.state.quantity} </h2>
                <button
                  onClick={() =>
                    this.setState({ quantity: this.state.quantity + 1 })
                  }
                >
                  +
                </button>
              </div>
            </div>
            <div className="service-wrapper">
              <div>Service/Material</div> <div>Price</div> <div>quantity</div>
            </div>
            <div className="expense-wrapper">
              {this.renderMaterials()} <h5> Subtotal {totalExpense}$ </h5>
              <h5>Tax 8% {totalExpense * 0.08}$ </h5>
              <h4>Total {totalExpense * 0.08 + totalExpense}$ </h4>
            </div>

            <div className="add-expense-btn">
              <button onClick={this.addMatItems}>Add Expense</button>
            </div>
          </div>
        </div>

        {this.state.recipient ? (
          <div className="recipient-wrapper">
            <div>
              <p>
                Recipient: {this.state.recipient["name"].replace(/_/g, " ")}{" "}
              </p>
              <p>
                Address: {this.state.recipient["billing"].replace(/_/g, " ")}
              </p>
              <p> Email: {this.state.recipient["email"]} </p>
            </div>
            <button
              className="mistake-btn"
              onClick={() => {
                this.setState({
                  recipient: "",
                });
              }}
            >
              Made A Mistake
            </button>
          </div>
        ) : (
          <div className="recipient-wrapper">
            <div className="inp-wrapper">
              <input id="Recipient" placeholder="Email Address" />
              <input id="Name" placeholder="first and last name" />
              <input id="Billing-Address" placeholder="address" />
            </div>
            <button onClick={this.handleRecipient}>Add Recipient</button>
          </div>
        )}
        <div className="send-wrapper">
          <button onClick={this.handleEmail}>Send Email</button>

          <div> {this.state.err ? <div>An Error </div> : null} </div>
        </div>
      </div>
    );
  }
}
