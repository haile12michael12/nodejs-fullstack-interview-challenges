## Challenge 42 – Internationalization (i18n)

### Overview
Implement internationalization and localization features to support multiple languages and cultural conventions.

### Features
- Multi-language support
- Date, time, and number formatting
- Currency and unit conversion
- Right-to-left (RTL) language support
- Dynamic language switching

### Prerequisites
- Node.js 18+

### Setup
- Backend: `cd backend && npm install`
- Frontend: `cd frontend && npm install`

### Run
- Backend: `npm start` in `backend`
- Frontend: `npm start` in `frontend`

### Environment
- `DEFAULT_LOCALE` (default en-US)
- `SUPPORTED_LOCALES` (default en-US,es-ES,fr-FR,de-DE)
- `PORT` (default 3000)

### Endpoints
- `GET /locales` → List supported locales
- `GET /translations/:locale` → Get translations for locale
- `POST /detect-locale` → Detect user's preferred locale
- `GET /localized-content` → Get content in user's locale

### Testing
- Test language switching functionality
- Verify date/time/number formatting
- Test RTL language support
- Validate translation accuracy

### Notes
- Use ICU message format for complex translations
- Implement lazy loading of translation files
- Handle pluralization and gender-specific translations
- Support locale-specific SEO