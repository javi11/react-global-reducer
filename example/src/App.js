import React from 'react';

import Counter, { CounterProvider } from './Counter';
import PersonForm, { PersonProvider } from './PersonForm';

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
