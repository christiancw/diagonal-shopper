import React from 'react';
import { Link } from 'react-router';
import localStore from 'store';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';


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
    <h2>THIS IS THE CART</h2>
    <div>
      <h2>{console.log("hi ho items", itemsArray)}</h2>
      {itemsArray && itemsArray.map(product => (
        <GridTile
          linkButton={ true }
          containerElement={<Link to={`/products/${product.id}`} />}
          key={product.selectedProduct.id + product.quantity}
          title={product.selectedProduct.name}
          subtitle={<span>{product.selectedProduct.description}</span>}
          actionIcon={<IconButton></IconButton>}>
          <img src={product.selectedProduct.imageURL} />
          <h4>{product.quantity}</h4>
        </GridTile>
      ))}
    </div>
    </div>

  )
}
}





/*export default function Cart (props) {
console.log("RENDER THE CART", props);
  return (
    <div>
    <h2>THIS IS THE CART</h2>
    <div>
    {localStore.each(item => (
        <h2>{console.log("HEHEHE", item)}{item.quantity}</h2>
    ))}
    </div>
    </div>
  );
}*/

// const mapState = (state) => {
//   return {
//     products: state.products.allProducts
//   };
//   //.filter(p => p.categories.includes(selectedCategory
// };

// const mapDispatch = (dispatch) => {
//   return {
//     setProduct(product) {
//       // browserHistory.push(`/products/${product.id}`)
//       dispatch(selectProduct(product.id));
//     },
//     handleChange(event){
//       //fill in with event for categories
//     }
//   };
// };

// export default connect(mapState, mapDispatch)(Products);
 /*<h2>{value.selectedProduct.id}</h2>
        <GridTile
          linkButton={ true }
          containerElement={<Link to={`/products/${value.selectedProduct.id}`} onClick={() => console.log(value)} />}
          key={value.selectedProduct.id}
          title={value.selectedProduct.name}
          subtitle={<span>{value.selectedProduct.description}</span>}
          actionIcon={<IconButton>wut</IconButton>}>
          <img src={value.selectedProduct.imageURL} />
        </GridTile>*/