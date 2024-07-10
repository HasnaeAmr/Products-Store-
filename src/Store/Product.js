import React from 'react';
import Rating from './Rating';
export default function Product({product}){
    return(
      <div className="col-md-4 mb-4" key={product.id}>
      <div className="card h-100">
      <img src={product.image} className="card-img-top img-fluid" alt={product.title} />
        <div className="card-body">
          <h5 className="card-title">{product.title}</h5>
          <p className="card-price">{product.price} MAD</p>
          <p className="card-text">{product.description}</p>
          <p className="card-text"><small className="text-muted">Category: {product.category}</small></p>
        </div>
      </div>
    </div>)
}