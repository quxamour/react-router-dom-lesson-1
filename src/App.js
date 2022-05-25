import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import Filters from './components/Filters/Filters';
import ProductsList from './components/ProductsList/ProductsList';
import AddForm from './components/AddForm/AddForm';
import axios from 'axios';
import Details from './components/Details/Details';
import EditForm from './components/EditForm/EditForm';

function App() {
  const API = "http://localhost:8000/products";

  // ! для хранения полученных продуктов
  const [products, setProducts] = useState([])
  const [oneProduct, setOneProduct] = useState(null)

  // ! create (post request)
  function addProduct (newProduct){
    axios.post(API, newProduct)
  }

  // ! read (get request)
  async function getProducts (){
    let result = await axios.get(API)
    // console.log(result);
    setProducts(result.data)
  }

  // ! delete (delete request)
  async function deleteProduct (id){
    await axios.delete(`${API}/${id}`)
    getProducts()
  }

  // ! get for details && get for edit
  async function getOneProduct (id){
    let result = await axios.get(`${API}/${id}`)
    // console.log(result);
    setOneProduct(result.data)
  }
  // console.log(oneProduct);

  // ! update (patch request)
  async function updateProduct (id, editedProduct){
    await axios.patch(`${API}/${id}`, editedProduct)
    getProducts()
  }


  return (
      <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<> <Filters /> <ProductsList getProducts={getProducts} products={products} deleteProduct={deleteProduct}/> </>} />
        <Route path="/add" element={<AddForm addProduct={addProduct}/>} />
        <Route path="/edit/:id" element={<EditForm getOneProduct={getOneProduct} oneProduct={oneProduct} updateProduct={updateProduct}/>} />
        <Route path="/contacts" element={<h1>Contacts</h1>} />
        <Route path='/details/:id' element={<Details getOneProduct={getOneProduct} oneProduct={oneProduct}/>}/>
      </Routes>
      <h1>Footer</h1>
      </BrowserRouter>
  );
}

export default App;
