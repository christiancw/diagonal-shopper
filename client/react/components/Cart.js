import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import localStore from 'store';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';

//TO DO: SELECTED PRODUCT ON STATE

export class Cart extends React.Component {
  constructor(props){
        super(props);
          const thingsInStorage = {};
          localStore.each((value, key) => {
            thingsInStorage[key] = value;
          });

          this.state = {
            thingsInStorage: thingsInStorage
          };
  }

  render() {
    console.log("The current props", this.props)
    const items = this.state.thingsInStorage;
    const itemsArray = Object.keys(items).map(function (key) { return items[key]; })
    return (
      <div>
      <h2>Items in Cart</h2>
      <div>
        {this.props.user ?
          this.props.cart && this.props.cart.orderitems.map(item => {
            return {
              selectedProduct: this.props.products.find(product => +product.id === +item.productId), 
              quantity: item.quantity
              }
            })
            .map(({ selectedProduct, quantity }) => {
              console.log("relevant product", selectedProduct, "quantity", quantity) 
              return (
              
              <GridTile
                linkButton={ true }
                containerElement={<Link to={`/products/${selectedProduct.id}`} />}
                key={selectedProduct.id}
                title={selectedProduct.name + " (Quantity: " + quantity + ")"}
                subtitle={<span>{selectedProduct.description}</span>}
                actionIcon={<IconButton></IconButton>}>
                <img src={selectedProduct.imageURL} />
              </GridTile>
            )})
        :
          itemsArray && itemsArray.map(product => (
          <GridTile
            linkButton={ true }
            containerElement={<Link to={`/products/${product.selectedProduct.id}`} />}
            key={product.selectedProduct.id}
            title={product.selectedProduct.name + " (Quantity: " + product.quantity + ")"}
            subtitle={<span>{product.selectedProduct.description}</span>}
            actionIcon={<IconButton></IconButton>}>
            <img src={product.selectedProduct.imageURL} />
          </GridTile>
        ))}
      </div>
        <FlatButton
          label="Checkout"
          style={{
            backgroundColor: "#6A8EAE",
            color: "white",
            width: '25%',
            height: '50px',
            margin: 12
          }}
          linkButton={ true }
          containerElement={<Link to="/checkout" />}
        />
      </div>

    );
  }
}

const mapState = state => {
  return {
    cart: state.orders.cart,
    products: state.products.allProducts,
    selectedProduct: state.products.selectedProduct,
    user: state.user.id
  };
};

export default connect(mapState)(Cart);