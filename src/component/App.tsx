import React from 'react';
import './App.css';
import { MasterWrapper } from './master/MasterWrapper/MasterWrapper';

export function App(): JSX.Element {
  return <MasterWrapper data-testid="master-wrapper" />;
}
