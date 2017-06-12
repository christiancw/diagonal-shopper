import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { browserHistory, Link } from 'react-router';
// import muiThemeable from 'material-ui/styles/muiThemeable';
import { selectProduct } from '../../reducer/products';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

// import Product from '/Product';

const styles = {
  root:{
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around'
  },
  gridList: {
    width: '70%',
    height: '50%',
    overflowY: 'auto'
  },
  customWidth: {
    width: '150'
  }
};

const Products = ({ products, setProduct }) => {
  return (
    <div style={styles.root}>
      <SelectField
        floatingLabelText="Categories">
        <MenuItem value={1} primaryText="Wands" />
        <MenuItem value={2} primaryText="Brooms" />
        <MenuItem value={3} primaryText="Potions" />
      </SelectField>
      <GridList
        cellHeight={180}
        style={styles.gridList}>
      <Subheader>Available Products</Subheader>
      {/* We can get category/search term from state?? */}
      {/*<h3>Results for ***Category or search term?***</h3>*/}
      {
        //if category is selected then filter based off category
        // else v
        products && products.map(product => (
        <GridTile
          linkButton={ true }
          containerElement={<Link to={`/products/${product.id}`} />}
          key={product.id}
          title={product.name}
          subtitle={<span>{product.description}</span>}
          actionIcon={<IconButton></IconButton>}>
          <img src={product.imageURL} />
        </GridTile>
      ))}
      </GridList>
    </div>
  );
};
        /*// <Product key={product.id} product={product} />
        /*<Link className="thumbnail" to={`/products/${product.id}`} />
        <div className="col-xs-4" key={product.id}>
          <img src={product.imageURL} />
          <h4>{product.name}</h4>
          <Link to={`/products/${product.id}`} onClick={() => setProduct(product)}>Go To Product Page</Link>
        </div>*/


// or we can filter it here and maintain a list of all products
// e.g. products: products.filter(p => p.category === selectedCategory)

// hardcoding selectedCategory until we set up a reducer for it
// products should be pre-filtered by category before it gets here?
const mapState = (state) => {
  return {
    products: state.products.allProducts
  };
  //.filter(p => p.categories.includes(selectedCategory
};

const mapDispatch = (dispatch) => {
  return {
    setProduct(product) {
      // browserHistory.push(`/products/${product.id}`)
      dispatch(selectProduct(product.id));
    },
    handleChange(event){
      //fill in with event for categories
    }
  };
};

export default connect(mapState, mapDispatch)(Products);

Products.propTypes = {
  products: PropTypes.array
};
