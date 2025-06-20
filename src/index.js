import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from './App';
import Home from './components/Home';
import Transcription from './features/Transcription';
import TextToSpeech from './features/TextToSpeech';
import SignLanguage from './features/SignLanguage';


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />, // Top-level layout
    children: [
      { path: '', element: <Home /> }, // Renders at "/"
      { path: 'transcription', element: <Transcription /> },
      { path: 'text-to-speech', element: <TextToSpeech /> },
      { path: 'sign-language', element: <SignLanguage /> },
    ],
  },
]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
