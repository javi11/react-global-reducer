import React from 'react';
import { useGlobalPerson } from './hooks';

export default function PersonForm() {
  const [person, , { setName }] = useGlobalPerson();
  return (
    <div>
      <h3>Name</h3>
      <input
        value={person.name}
        onChange={({ target }) => setName(target.value)}
      />
    </div>
  );
}
