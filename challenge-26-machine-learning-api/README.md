## Challenge 26 – Machine Learning Model API

### Overview
Serve machine learning models through a REST API with preprocessing, prediction, and postprocessing capabilities.

### Features
- Model loading and inference
- Input preprocessing and validation
- Batch prediction support
- Model versioning
- Performance monitoring

### Prerequisites
- Node.js 18+
- Python 3.8+ (for ML models)

### Setup
- Backend: `cd backend && npm install`
- Frontend: `cd frontend && npm install`

### Run
- Backend: `npm start` in `backend`
- Frontend: `npm start` in `frontend`

### Environment
- `MODEL_PATH` (default ./models)
- `PYTHON_PATH` (default python3)
- `PORT` (default 3000)

### Endpoints
- `POST /predict` → Make a prediction with input data
- `POST /batch-predict` → Make batch predictions
- `GET /models` → List available models
- `POST /models/:name/reload` → Reload a model

### Testing
- Load sample models and make predictions
- Test batch processing performance
- Monitor prediction latency

### Notes
- Use python-shell for Python integration
- Implement model caching for performance
- Add input validation and error handling