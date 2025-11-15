import { useState } from 'react'
import './ItemList.css'
import Item from './Item'

const ItemList = ({ items, onUpdate, onDelete }) => {
  const [editingKey, setEditingKey] = useState(null)
  const [editingValue, setEditingValue] = useState('')

  const handleEdit = (key, value) => {
    setEditingKey(key)
    setEditingValue(value)
  }

  const handleSave = () => {
    if (editingKey && editingValue) {
      onUpdate(editingKey, editingValue)
      setEditingKey(null)
      setEditingValue('')
    }
  }

  const handleCancel = () => {
    setEditingKey(null)
    setEditingValue('')
  }

  return (
    <div className="item-list">
      <h2>Items</h2>
      {Object.keys(items).length === 0 ? (
        <p>No items found</p>
      ) : (
        Object.entries(items).map(([key, item]) => (
          <Item
            key={key}
            itemKey={key}
            item={item}
            isEditing={editingKey === key}
            editingValue={editingValue}
            onEdit={handleEdit}
            onSave={handleSave}
            onCancel={handleCancel}
            onDelete={onDelete}
            onEditingValueChange={setEditingValue}
          />
        ))
      )}
    </div>
  )
}

export default ItemList