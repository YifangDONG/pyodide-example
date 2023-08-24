import React from 'react';
import { addIndex } from '../utils/getFunc';

export type Person = { name: string, sex: number, age?: number };

const john = {
  type: "Person",
  data: {
    name: 'John',
    sex: 1,
    age: 42,
  }
}

export function PyLoader2(props: Person) {
  // let x: boolean;
  // x = 1;
  const { name, age, sex } = props;

  // useEffect(() => {}, [])
  return (
    <div>
      <div>{name}:{age ? addIndex(age) : "x"} - {sex}</div>
      <div>{`${name}:${age} - ${sex + 2}`}</div>
    </div>
  );
}
