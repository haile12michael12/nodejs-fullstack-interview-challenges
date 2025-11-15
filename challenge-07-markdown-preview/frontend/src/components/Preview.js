import React, { useEffect, useState } from 'react';
import { renderMarkdown } from '../api/markdownApi';

function Preview({ markdown }) {
  const [html, setHtml] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!markdown) {
      setHtml('');
      return;
    }

    const fetchPreview = async () => {
      setLoading(true);
      setError('');
      try {
        const result = await renderMarkdown(markdown);
        setHtml(result.html);
      } catch (err) {
        setError(err.message || 'Failed to render markdown');
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(fetchPreview, 300);
    return () => clearTimeout(timer);
  }, [markdown]);

  return (
    <div className="preview">
      <h2>Preview</h2>
      {loading && <div className="loading">Rendering...</div>}
      {error && <div className="error">{error}</div>}
      <div className="preview-content" dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}

export default Preview;