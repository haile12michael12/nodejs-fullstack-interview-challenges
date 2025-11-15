import React, { useState } from 'react';
import Editor from './components/Editor';
import Preview from './components/Preview';
import ThemeContext from './context/ThemeContext';
import useDebounce from './hooks/useDebounce';

function App() {
  const [markdown, setMarkdown] = useState('# Welcome to Markdown Preview\n\n## Features\n\nThis custom parser supports:\n\n### Headers\n- H1, H2, and H3 headers\n- Use # for H1, ## for H2, ### for H3\n\n### Lists\n\n#### Unordered Lists\n- Use * for bullet points\n- Or use - for bullet points\n- Each item on a new line\n\n#### Ordered Lists\n1. Use numbers followed by a period\n2. Each item on a new line\n3. Automatic numbering\n\n## Example Content\n\nHere\'s a sample paragraph with some text.\n\n### Another Section\n\nMore content here with another paragraph.\n\n- List item one\n- List item two\n- List item three\n\n1. First numbered item\n2. Second numbered item\n3. Third numbered item');
  const [theme, setTheme] = useState('light');
  const debouncedMarkdown = useDebounce(markdown, 300);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={`app ${theme}`}>
        <header className="app-header">
          <h1>Markdown Preview</h1>
          <button onClick={toggleTheme} className="theme-toggle">
            {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
          </button>
        </header>
        <div className="app-container">
          <Editor markdown={markdown} setMarkdown={setMarkdown} />
          <Preview markdown={debouncedMarkdown} />
        </div>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;