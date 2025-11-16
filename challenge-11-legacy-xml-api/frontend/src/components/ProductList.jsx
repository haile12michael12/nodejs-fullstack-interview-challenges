import React from 'react';

const ProductList = ({ products, onDelete, loading }) => {
  if (loading) {
    return <div>Loading products...</div>;
  }

  if (!products || products.length === 0) {
    return <div>No products found.</div>;
  }

  return (
    <div>
      <h2>Products</h2>
      <div style={{ marginTop: '15px' }}>
        {products.map(product => (
          <div key={product.id} style={{ 
            border: '1px solid #ddd', 
            borderRadius: '4px', 
            padding: '15px', 
            marginBottom: '10px',
            backgroundColor: '#f9f9f9'
          }}>
            <h3>{product.name}</h3>
            <p><strong>Price:</strong> ${product.price}</p>
            <p><strong>Category:</strong> {product.category}</p>
            <p><strong>Description:</strong> {product.description}</p>
            {product.created_at && (
              <p><small>Created: {new Date(product.created_at).toLocaleString()}</small></p>
            )}
            <button 
              onClick={() => onDelete(product.id)}
              style={{ backgroundColor: '#dc3545', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '3px' }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;