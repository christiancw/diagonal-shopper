import React from 'react'
import Cart from './Cart'
import { connect } from 'react-redux'
import { Link, browserHistory } from 'react-router'
import { createOrder } from '../../reducer/products';

class Checkout extends React.Component {
    
    constructor(props) {
        super(props)
        this.state = {
        name: {
            value: '',
            filledIn: false,
        },
        email: {
            value: '',
            filledIn: false,
        },
        address: {
            value: '',
            filledIn: false,
        }

        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)

    }

    handleChange(event) {
        this.setState({ [event.target.name]: { value: event.target.value, filledIn: true } })
    }

    handleSubmit() {
        this.props.checkout(this.props.cart);
        browserHistory.push('/');
    }


    render() {
        console.log("MAI PROPS", this.props)
        console.log("MAI STATE", this.state)
        return (
                <div>
                    <h2>Order Details</h2>
                    <div>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Item Name</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.props.cart && this.props.cart.map((product) =>
                                    <tr key={product.productId}>
                                        <td>{product.id}</td>
                                    </tr>)
                                }
                            </tbody>
                        </table>
                    </div>

                    <form className="form-horizontal" onSubmit={this.handleSubmit}>
                        <fieldset>
                            <legend>Order Details</legend>
                            <div className="form-group">
                                <label className="col-xs-2 control-label">Name</label>
                                <div className="col-xs-10">
                                    <input
                                        className="form-control"
                                        type="text"
                                        name="name"
                                        onChange={this.handleChange}
                                        value={this.state.name.value}
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-xs-2 control-label">Email</label>
                                <div className="col-xs-10">
                                    <input
                                        className="form-control"
                                        type="text"
                                        name="email"
                                        onChange={this.handleChange}
                                        value={this.state.email.value}
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-xs-2 control-label">Address</label>
                                <div className="col-xs-10">
                                    <input
                                        className="form-control"
                                        type="text"
                                        name="address"
                                        onChange={this.handleChange}
                                        value={this.state.address.value}
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-xs-10 col-xs-offset-2">
                                        <button
                                            type="submit"
                                            className="btn btn-success"
                                        >
                                            Submit Order
                                        </button>
                                </div>
                            </div>
                        </fieldset>
                    </form>

                </div>
        )
    }
    }

    const mapStateToProps = (state) => ({ 
        cart: state.orders.cart,
    });

    const mapDispatchToProps = (dispatch) => {
    return {
        checkout(cart, email, signupOrLogin) {
            // dispatch(createOrder(cart))
            
            dispatch(createOrder(order))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)