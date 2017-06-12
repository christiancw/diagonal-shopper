import React from 'react';
import { Link } from 'react-router';
import localStore from 'store';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';

//TO DO: SELECTED PRODUCT ON STATE

export default class Cart extends React.Component {
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
    const items = this.state.thingsInStorage;
    const itemsArray = Object.keys(items).map(function (key) { return items[key]; })
    return (
      <div>
      <h2>Items in Cart</h2>
      <div>
        <h2>{console.log("hi ho items", itemsArray)}</h2>
        {itemsArray && itemsArray.map(product => (
          <GridTile
            linkButton={ true }
            containerElement={<Link to={`/products/${product.selectedProduct.id}`} />}
            key={product.selectedProduct.id + product.quantity}
            title={product.selectedProduct.name}
            subtitle={<span>{product.selectedProduct.description}</span>}
            actionIcon={<IconButton></IconButton>}>
            <img src={product.selectedProduct.imageURL} />
            <h4>{product.quantity}</h4>
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
