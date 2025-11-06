import React, { createContext, useContext, useReducer } from 'react';
import { exportApi } from '../services/exportApi';

const ExportContext = createContext();

const initialState = {
  jobs: [],
  currentJob: null,
  loading: false,
  error: null,
};

const exportReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'CREATE_JOB':
      return {
        ...state,
        jobs: [...state.jobs, action.payload],
        currentJob: action.payload,
        loading: false,
        error: null,
      };
    case 'UPDATE_JOB':
      return {
        ...state,
        jobs: state.jobs.map(job => 
          job.id === action.payload.id ? action.payload : job
        ),
        currentJob: action.payload,
        loading: false,
        error: null,
      };
    case 'SET_JOBS':
      return {
        ...state,
        jobs: action.payload,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

export const ExportProvider = ({ children }) => {
  const [state, dispatch] = useReducer(exportReducer, initialState);

  const createExportJob = async (data) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    
    try {
      const response = await exportApi.createExportJob(data);
      dispatch({ type: 'CREATE_JOB', payload: response });
      return response;
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      throw error;
    }
  };

  const updateJob = (job) => {
    dispatch({ type: 'UPDATE_JOB', payload: job });
  };

  const value = {
    ...state,
    createExportJob,
    updateJob,
  };

  return (
    <ExportContext.Provider value={value}>
      {children}
    </ExportContext.Provider>
  );
};

export const useExport = () => {
  const context = useContext(ExportContext);
  if (!context) {
    throw new Error('useExport must be used within an ExportProvider');
  }
  return context;
};