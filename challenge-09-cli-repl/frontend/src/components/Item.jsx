import './Item.css'

const Item = ({ 
  itemKey, 
  item, 
  isEditing, 
  editingValue, 
  onEdit, 
  onSave, 
  onCancel, 
  onDelete, 
  onEditingValueChange 
}) => {
  return (
    <div className="item">
      <div className="item-header">
        <span className="item-key">{itemKey}</span>
        {!isEditing && (
          <div className="item-actions">
            <button onClick={() => onEdit(itemKey, item.value)}>Edit</button>
            <button onClick={() => onDelete(itemKey)} className="danger">Delete</button>
          </div>
        )}
      </div>
      
      {isEditing ? (
        <div className="edit-form">
          <textarea
            value={editingValue}
            onChange={(e) => onEditingValueChange(e.target.value)}
          />
          <div className="edit-actions">
            <button onClick={onSave}>Save</button>
            <button onClick={onCancel}>Cancel</button>
          </div>
        </div>
      ) : (
        <>
          <div className="item-value">{item.value}</div>
          <div className="item-meta">
            <div>Created: {new Date(item.createdAt).toLocaleString()}</div>
            <div>Updated: {new Date(item.updatedAt).toLocaleString()}</div>
          </div>
        </>
      )}
    </div>
  )
}

export default Item