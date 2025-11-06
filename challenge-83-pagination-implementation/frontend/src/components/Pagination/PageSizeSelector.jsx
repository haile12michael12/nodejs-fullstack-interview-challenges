import React from 'react';

const PageSizeSelector = ({ 
  currentLimit, 
  onLimitChange,
  options = [10, 20, 50, 100]
}) => {
  return (
    <div className="flex items-center">
      <label htmlFor="page-size" className="mr-2 text-sm text-gray-700">
        Items per page:
      </label>
      <select
        id="page-size"
        value={currentLimit}
        onChange={(e) => onLimitChange(parseInt(e.target.value))}
        className="rounded-md border border-gray-300 bg-white py-2 px-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
      >
        {options.map((size) => (
          <option key={size} value={size}>
            {size}
          </option>
        ))}
      </select>
    </div>
  );
};

export default PageSizeSelector;