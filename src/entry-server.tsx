import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import App from './App';

export function render(): string {
  return renderToString(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}
