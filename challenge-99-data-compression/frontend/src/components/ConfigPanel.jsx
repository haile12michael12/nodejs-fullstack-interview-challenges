import React, { useState } from 'react';

const ConfigPanel = ({ onCompress }) => {
  const [text, setText] = useState('');
  const [algorithm, setAlgorithm] = useState('gzip');

  const handleSubmit = (e) => {
    e.preventDefault();
    onCompress({ text, algorithm });
  };

  return (
    <div className="panel">
      <h2>Compression Configuration</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="text">Text to Compress:</label>
          <textarea
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={5}
            placeholder="Enter text to compress..."
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="algorithm">Compression Algorithm:</label>
          <select
            id="algorithm"
            value={algorithm}
            onChange={(e) => setAlgorithm(e.target.value)}
          >
            <option value="gzip">GZIP</option>
            <option value="brotli">Brotli</option>
          </select>
        </div>
        
        <div className="button-group">
          <button type="submit" className="primary">Compress</button>
        </div>
      </form>
    </div>
  );
};

export default ConfigPanel;