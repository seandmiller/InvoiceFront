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
          <h5>{item.service.replace(/_/g, " ")}</h5> <h5>{item.price}$ </h5>
          <h5>{item.qty}</h5>{" "}
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
    const notesData = document.getElementById("notes");
    const mailBody = {
      mailTo: this.state.recipient["email"],
      pageData: {
        recipientData: this.state.recipient,
        services: this.state.serviceToPurchase,
        total: {
          totalExpense: totalExpense.toFixed(2),
        },
        notes: notesData.value.replace(/ /g, "_"),
        date: new Date().toDateString().replace(/ /g, "-"),
      },
    };

    
    axios
      .post("https://invoiceappnodejs.herokuapp.com/send_mail", mailBody)
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
        <h1>O Miller Welding</h1>

        <h2>Invoice Details</h2>
        <div className="invoice-details">
          <div className="invoice-detail">
            <div className="from-info">
              <div className="from-data">
                <p>
                  <FontAwesomeIcon icon="briefcase" /> O Miller Welding
                </p>
                <p>
                  <FontAwesomeIcon icon="envelope" /> O.millerwelding@gmail.com
                </p>
                <p>
                  <FontAwesomeIcon icon="phone" /> (510)-472-4094
                </p>
              </div>
            </div>
            <div className="invoice-date">
              <h2>Invoice Date </h2>
              <p>{this.state.date.toDateString()}</p>
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
              <h2>Service/Material</h2> <h2>Price</h2> <h2>Quantity</h2>
              <h2>Delete</h2>
            </div>
            <div className="expense-wrapper">
              {this.renderMaterials()}

              <h1 className="total">Total {totalExpense.toFixed(2)}$ </h1>
            </div>

            <div className="add-expense-btn">
              <button onClick={this.addMatItems}>Add Expense</button>
            </div>
          </div>
          <div className="textarea-wrapper">
            <h2>Notes</h2>
            <textarea id="notes" styles="width: 75%; height: 25%;" />
          </div>
        </div>

        {this.state.recipient ? (
          <div className="recipient-wrapper">
            <div>
              <h5>
                Recipient: {this.state.recipient["name"].replace(/_/g, " ")}{" "}
              </h5>
              <h5>
                Address: {this.state.recipient["billing"].replace(/_/g, " ")}
              </h5>
              <h5> Email: {this.state.recipient["email"]} </h5>
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
        </div>
      </div>
    );
  }
}
