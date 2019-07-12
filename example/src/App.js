import React from 'react';

import { CounterProvider, PersonProvider } from './hooks';
import Counter from './Counter';
import PersonForm from './PersonForm';

function App() {
  return (
    <CounterProvider>
      <PersonProvider>
        <Counter name="Counter 1" />
        <PersonForm />
        <Counter name="Counter 2" />
        <PersonForm />
      </PersonProvider>
    </CounterProvider>
  );
}

export default App;
