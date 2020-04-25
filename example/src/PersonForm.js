import React from 'react';

import { createGlobalSlice } from 'react-global-reducer';

const [Provider, usePerson, actions] = createGlobalSlice({
  initialValue: { name: 'John', age: 20 },
  reducers: {
    setName: (person, action) => ({ ...person, name: action.payload }),
    setAge: (person, action) => ({ ...person, age: action.payload })
  }
});

export const PersonProvider = Provider;

export default function PersonForm() {
  const [person, dispatch] = usePerson();

  const handler = action => ({ target }) => dispatch(action(target.value));

  return (
    <div>
      <h3>Name</h3>
      <input value={person.name} onChange={handler(actions.setName)} />
      <h3>Age</h3>
      <input value={person.age} onChange={handler(actions.setAge)} />
    </div>
  );
}
