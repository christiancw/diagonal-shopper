import React from 'react'
import Cart from './Cart'
import { connect } from 'react-redux'
import { Link, browserHistory } from 'react-router'
import { createOrder } from '../../reducer/products';
import { Login, Signup } from './Auth';
import FlatButton from 'material-ui/FlatButton';
import SnackBar from 'material-ui/Snackbar';

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
            },
            loginShowing: false,
            open: false
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleSnackbar = this.handleSnackbar.bind(this)

    }

    handleSnackbar(){
        this.setState({open:true});
    }

    handleChange(event) {
        this.setState({ [event.target.name]: { value: event.target.value, filledIn: true } })
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log("checking handle submit")
        this.props.checkout(this.props.cart);
        console.log('called Checkout')
        // browserHistory.push('/');
    }


    render() {
        console.log("MAI PROPS", this.props)
        console.log("MAI STATE", this.state);
        return (
                <div>
                    { this.props.user && this.props.user.id
                        ? /* IF USER IS LOGGED IN */
                            <div>
                                <form className="form-horizontal" onSubmit={this.handleSubmit}>
                                    <fieldset>
                                        <legend>Order Details</legend>
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
                                                        onClick={this.handleSnackbar}
                                                    >
                                                        Submit Order
                                                    </button>
                                                    <SnackBar
                                                    open={this.state.open}
                                                    autoHideDuration={4000}
                                                    message="Order has been made."
                                                    />
                                            </div>
                                        </div>
                                    </fieldset>
                                </form>
                            </div>
                        : /* IF USER IS NOT LOGGED IN */
                            <div>
                                <FlatButton
                                    label="Already a User?"
                                    labelPosition="before"
                                    style={{
                                        backgroundColor: "#6A8EAE",
                                        color: "white",
                                        width: '25%',
                                        height: '50px',
                                        margin: 12
                                    }}
                                    onClick={ () => { this.setState({ loginShowing: true }) } }
                                    //render <Login />
                                />
                                <FlatButton
                                    label="Guest Signup"
                                    labelPosition="before"
                                    style={{
                                        backgroundColor: "#6A8EAE",
                                        color: "white",
                                        width: '15%',
                                        height: '50px',
                                        margin: 12
                                    }}
                                    onClick={ () => { this.setState({ loginShowing: false }) } }
                                    //render <Signup />
                                />
                                <div>
                                    {this.state.loginShowing
                                        ? <Login noRedirect={true} />
                                        : <Signup noRedirect={true} />
                                    }
                                    <form className="form-horizontal" onSubmit={this.handleSubmit}>
                                        <fieldset>
                                            <legend>Order Details</legend>
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
                                                            disabled
                                                        >
                                                            Submit Order
                                                        </button>
                                                </div>
                                            </div>
                                        </fieldset>
                                    </form>
                                </div>
                            </div>
                    }
                    <h2>Order Details</h2>
                    <div>
                        <table className="table">
                            <tbody>
                                <Cart />
                            </tbody>
                        </table>
                    </div>
                </div>
        );
    }
    }

    const mapStateToProps = (state) => ({
        cart: state.orders.cart,
        user: state.user
    });

    const mapDispatchToProps = (dispatch) => {
    return {
        checkout(order) {
            // dispatch(createOrder(cart))
            const action = createOrder(order);
            dispatch(action);
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)
