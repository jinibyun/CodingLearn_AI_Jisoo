import { useState } from 'react'

export default function Counter() {
  const [count, setCount] = useState(0)

  const increment = () => setCount(count + 1)
  const decrement = () => setCount(count - 1)

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>카운터</h1>
      <h2>{count}</h2>
      <button onClick={increment} style={{ marginRight: '10px', padding: '10px 20px', fontSize: '16px' }}>
        +
      </button>
      <button onClick={decrement} style={{ padding: '10px 20px', fontSize: '16px' }}>
        -
      </button>
    </div>
  )
}
