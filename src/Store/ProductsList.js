import { useEffect, useState } from "react"
import Product from './Product'
import './ProductsList.css';
export default function ProductList(){
    const [productsList, setProductsList] = useState([])
    const [filteredProductsList, setFilteredProductsList] = useState([])
    const getProducts = () => {
        fetch('https://fakestoreapi.com/products')
            .then(response=> response.json())
            .then(response=> setProductsList(response));
    }
    const displayProducts = (productsList) => {
        if(productsList.length>0)
            return productsList.map((product) => {return <Product product={product} key={product.id} />})
        return <tr><td>No Products Available</td></tr>
    }
    const [search, setSearch]=useState("");
    function handleSearchValue(event){
      setSearch(event.target.value)
    }
    useEffect(()=>{
        getProducts()
    },[])
    function handleSearch(event){
        event.preventDefault();
        const searchedProducts=[...productsList].filter((product)=>{
          return product.title.toLowerCase().includes(search.toLowerCase());
        })
        setFilteredProductsList(searchedProducts)
    }
    
    return  ( <div className="container">
    <form className="search-form mb-4" onSubmit={handleSearch}>
      <div className="input-group">
        <input type="text" className="form-control" onChange={handleSearchValue} placeholder="Search products..." />
        <div className="input-group-append">
          <button type="submit" className="btn btn-primary">Search</button>
        </div>
      </div>
    </form>

    <div className="row">
      {displayProducts(filteredProductsList.length > 0 ? filteredProductsList : productsList)}
    </div>
  </div>
);
}