import React, { useState, useEffect } from 'react'

function App() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    description: '',
    category: ''
  })

  // Fetch all products
  const fetchProducts = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch('/api/products')
      const text = await response.text()
      
      // Parse XML response
      const parser = new DOMParser()
      const xmlDoc = parser.parseFromString(text, 'application/xml')
      
      const productsNodes = xmlDoc.getElementsByTagName('product')
      const productsArray = []
      
      for (let i = 0; i < productsNodes.length; i++) {
        const productNode = productsNodes[i]
        productsArray.push({
          id: productNode.getElementsByTagName('id')[0]?.textContent,
          name: productNode.getElementsByTagName('name')[0]?.textContent,
          price: productNode.getElementsByTagName('price')[0]?.textContent,
          description: productNode.getElementsByTagName('description')[0]?.textContent,
          category: productNode.getElementsByTagName('category')[0]?.textContent,
          created_at: productNode.getElementsByTagName('created_at')[0]?.textContent
        })
      }
      
      setProducts(productsArray)
    } catch (err) {
      setError('Failed to fetch products: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  // Create new product
  const createProduct = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    
    try {
      // Create XML payload
      const xmlPayload = `
        <product>
          <name>${newProduct.name}</name>
          <price>${newProduct.price}</price>
          <description>${newProduct.description}</description>
          <category>${newProduct.category}</category>
        </product>
      `.trim()
      
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/xml'
        },
        body: xmlPayload
      })
      
      if (response.ok) {
        setNewProduct({ name: '', price: '', description: '', category: '' })
        fetchProducts() // Refresh the list
      } else {
        const text = await response.text()
        throw new Error(`HTTP ${response.status}: ${text}`)
      }
    } catch (err) {
      setError('Failed to create product: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  // Delete product
  const deleteProduct = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return
    
    setLoading(true)
    setError(null)
    
    try {
      const response = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/xml'
        }
      })
      
      if (response.ok) {
        fetchProducts() // Refresh the list
      } else {
        const text = await response.text()
        throw new Error(`HTTP ${response.status}: ${text}`)
      }
    } catch (err) {
      setError('Failed to delete product: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <h1>Legacy XML API Client</h1>
      <p>All requests and responses use XML format only.</p>
      
      {error && (
        <div style={{ backgroundColor: '#f8d7da', color: '#721c24', padding: '10px', borderRadius: '4px', marginBottom: '20px' }}>
          {error}
        </div>
      )}
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
        {/* Product List */}
        <div>
          <h2>Products</h2>
          <button onClick={fetchProducts} disabled={loading}>
            {loading ? 'Loading...' : 'Refresh'}
          </button>
          
          {products.length === 0 && !loading ? (
            <p>No products found.</p>
          ) : (
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
                  <p><small>Created: {new Date(product.created_at).toLocaleString()}</small></p>
                  <button 
                    onClick={() => deleteProduct(product.id)}
                    style={{ backgroundColor: '#dc3545', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '3px' }}
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Create Product Form */}
        <div>
          <h2>Create New Product</h2>
          <form onSubmit={createProduct}>
            <div style={{ marginBottom: '15px' }}>
              <label>Name:</label>
              <input
                type="text"
                value={newProduct.name}
                onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                required
                style={{ width: '100%', padding: '8px', marginTop: '5px' }}
              />
            </div>
            
            <div style={{ marginBottom: '15px' }}>
              <label>Price:</label>
              <input
                type="number"
                step="0.01"
                value={newProduct.price}
                onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                required
                style={{ width: '100%', padding: '8px', marginTop: '5px' }}
              />
            </div>
            
            <div style={{ marginBottom: '15px' }}>
              <label>Category:</label>
              <input
                type="text"
                value={newProduct.category}
                onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                required
                style={{ width: '100%', padding: '8px', marginTop: '5px' }}
              />
            </div>
            
            <div style={{ marginBottom: '15px' }}>
              <label>Description:</label>
              <textarea
                value={newProduct.description}
                onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                required
                style={{ width: '100%', padding: '8px', marginTop: '5px', height: '80px' }}
              />
            </div>
            
            <button 
              type="submit" 
              disabled={loading}
              style={{ backgroundColor: '#28a745', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '4px' }}
            >
              {loading ? 'Creating...' : 'Create Product'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default App