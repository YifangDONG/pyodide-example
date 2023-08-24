import React, {useEffect} from 'react'

export function PyLoader(props) {
  const {name, age, sex} = props
  // useEffect(() => {}, [])

  return (
    <div>
      <div>{name}:{age} - {sex}</div>
      <div>{`${name}:${age} - ${sex}`}</div>
    </div>
  )
}


