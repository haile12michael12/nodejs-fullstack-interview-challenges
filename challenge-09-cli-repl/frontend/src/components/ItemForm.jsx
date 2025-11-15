import { useState } from 'react'
import './ItemForm.css'

const ItemForm = ({ onCreate }) => {
  const [key, setKey] = useState('')
  const [value, setValue] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (key && value) {
      onCreate(key, value)
      setKey('')
      setValue('')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create New Item</h2>
      <div className="form-group">
        <label htmlFor="key">Key:</label>
        <input
          type="text"
          id="key"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="value">Value:</label>
        <textarea
          id="value"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          required
        />
      </div>
      <button type="submit">Create</button>
    </form>
  )
}

export default ItemForm