import React from 'react';

function Editor({ markdown, setMarkdown }) {
  return (
    <div className="editor">
      <h2>Markdown Editor</h2>
      <textarea
        value={markdown}
        onChange={(e) => setMarkdown(e.target.value)}
        placeholder="Enter your markdown here..."
        className="editor-textarea"
      />
    </div>
  );
}

export default Editor;