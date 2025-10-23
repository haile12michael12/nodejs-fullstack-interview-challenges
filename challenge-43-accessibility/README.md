## Challenge 43 – Accessibility (a11y)

### Overview
Ensure web applications meet accessibility standards (WCAG) with proper semantic markup, keyboard navigation, and screen reader support.

### Features
- WCAG 2.1 AA compliance
- Semantic HTML structure
- Keyboard navigation support
- Screen reader compatibility
- ARIA attributes and landmarks

### Prerequisites
- Node.js 18+

### Setup
- Backend: `cd backend && npm install`
- Frontend: `cd frontend && npm install`

### Run
- Backend: `npm start` in `backend`
- Frontend: `npm start` in `frontend`

### Environment
- `PORT` (default 3000)

### Testing
- Use axe-core for automated accessibility testing
- Test with screen readers (NVDA, JAWS, VoiceOver)
- Verify keyboard navigation
- Check color contrast ratios
- Validate ARIA attributes

### Notes
- Implement skip navigation links
- Use proper heading hierarchy
- Provide alternative text for images
- Ensure form labels are associated correctly
- Test with accessibility tools like Lighthouse