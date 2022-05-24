import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import Filters from './components/Filters/Filters';
import ProductsList from './components/ProductsList/ProductsList';
import AddForm from './components/AddForm/AddForm';
import axios from 'axios';

function App() {
  const API = "http://localhost:8000/products";

  // ! для хранения полученных продуктов
  const [products, setProducts] = useState([])

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

  return (
      <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<> <Filters /> <ProductsList getProducts={getProducts} products={products} deleteProduct={deleteProduct}/> </>} />
        <Route path="/add" element={<AddForm addProduct={addProduct}/>} />
        <Route path="/edit" element={<h1>Edit form</h1>} />
        <Route path="/contacts" element={<h1>Contacts</h1>} />
      </Routes>
      <h1>Footer</h1>
      </BrowserRouter>
  );
}

export default App;
