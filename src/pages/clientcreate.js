import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

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
      btnText: "Send Email",
    };

    this.makePayment = this.makePayment.bind(this);
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

  makePayment = (token) => {
    const apiProducts = this.state.products;
    const headers = {
      "Content-Type": "application/json",
    };
    return fetch("http://localhost:8282/payment", {
      method: "POST",
      headers,
      body: JSON.stringify({ token, apiProducts }),
    })
      .then((response) => {
        console.log(response);
        var { status } = response;
        console.log(status);
      })
      .catch((err) => console.log(err));
  };

  renderMaterials = () => {
    const materials = this.state.serviceToPurchase.map((item, index) => {
      return (
        <div key={index} className="reciept-for-mats">
          <div>{item.service}</div> <div>{item.price}$ </div>
          <div>{item.qty}</div>
        </div>
      );
    });
    return materials;
  };

  addMatItems = () => {
    this.setState({
      serviceToPurchase: this.state.serviceToPurchase.concat({
        service: this.state.service,
        price: parseInt(this.state.price),
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
    console.log("running");
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
      },
    };
    const headers = {
      "Content-Type": "application/json",
    };
    fetch("http://localhost:8282/send_mail", {
      method: "POST",
      headers,
      body: JSON.stringify({ mailBody }),
    })
      .then((response) => {
        this.setState({
          btnText: "Email Sent",
        });
      })
      .catch((error) => console.log(error));
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
              <input id="Recipient" placeholder="Add Recipient" />
              <input id="Name" placeholder="first and last name" />
              <input id="Billing-Address" placeholder="address" />
            </div>
            <button onClick={this.handleRecipient}>Add Recipient</button>
          </div>
        )}
        <div className="send-wrapper">
          <button onClick={this.handleEmail}>{this.state.btnText}</button>
        </div>
      </div>
    );
  }
}