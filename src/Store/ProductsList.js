import { useEffect, useState } from "react"
import Product from './Product'
import './ProductsList.css';
export default function ProductList(){
    const [productsList, setProductsList] = useState([])
    const [categoriesList, setCategoriesList] = useState([])
    const [filteredProductsList, setFilteredProductsList] = useState([])
    const getProducts = () => {
        fetch('https://fakestoreapi.com/products')
            .then(response=> response.json())
            .then(response=> setProductsList(response));
    }
    const getCategories = () => {
        fetch('https://fakestoreapi.com/products/categories')
            .then(response=> response.json())
            .then(response=> setCategoriesList(response));
    }
    const displayProducts = (categoriesList) => {
        if(categoriesList.length>0){
            return categoriesList.map((product) => {return <Product product={product} key={product.id} />})
              
          }
        return <h4>No Product Available</h4>
    }
    const displayCategories = ()=>{
        if(categoriesList.length>0)
            return categoriesList.map((category) => { return <button onClick={()=>{handleCategoryFilter(category)}} className="btn btn-secondary"> {category}</button>})
        
    }
    const [search, setSearch]=useState("");
    function handleSearchValue(event){
      setSearch(event.target.value)
    }
    useEffect(()=>{
        getProducts();
        getCategories();
    },[])
    function handleSearch(event){
        event.preventDefault();
        const searchedProducts=[...productsList].filter((product)=>{
          return product.title.toLowerCase().includes(search.toLowerCase());
        })
        setFilteredProductsList(searchedProducts);
    }
    function handleCategoryFilter(category) {
      const filteredCategoriesList = productsList.filter((product) => {
        return product.category.toLowerCase()===(category.toLowerCase());
      });
        setFilteredProductsList(filteredCategoriesList);
    }
    return  ( <div className="container">
    <form className="search-form mb-4" onSubmit={handleSearch}>
      <div className="input-group">
        <input type="text" className="form-control" onChange={handleSearchValue} placeholder="Search products..." />
        <div className="input-group-append">
          <button type="submit" className="btn btn-primary">Search</button>
          <button onClick={()=>displayProducts(productsList)} className="btn btn-outline-primary">Show All</button>
        </div>
      </div>
    </form>
    <div className="row g-3-align-items-center">
      <div className="btn-group" style={{ marginBottom: "40px" }}>
        {displayCategories()}
      </div>
    </div>
    <div className="row">
      {displayProducts(filteredProductsList.length > 0 ? filteredProductsList : productsList)}
    </div>
  </div>
);
}
