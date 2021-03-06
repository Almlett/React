import React from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Products from './components/Products.jsx';
import Header from './components/Header.jsx';
import NewProduct from './components/NewProduct.jsx';
import EditProduct from './components/EditProduct.jsx';


function App() {
  return (
    <Router>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path ="/" component={Products} />
          <Route exact path ="/products/new" component={NewProduct} />
          <Route exact path ="/products/edit/:id" component={EditProduct} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
