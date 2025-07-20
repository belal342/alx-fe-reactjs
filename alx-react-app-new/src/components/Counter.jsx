import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div style={{
      textAlign: 'center',
      margin: '20px',
      padding: '20px',
      border: '1px solid blue',
      borderRadius: '8px',
      Width: '100%'
    }}>
      <p style={{
        fontSize: '1.5rem',
        fontWeight: 'bold',
        color: 'darkslategray'
      }}>Current Count: {count}</p>
      
      <div style={{ marginTop: '15px' }}>
        <button 
          onClick={() => setCount(count + 1)}
          style={{
            padding: '8px 15px',
            margin: '0 5px',
            backgroundColor: 'green',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Increment
        </button>
        
        <button 
          onClick={() => setCount(count - 1)}
          style={{
            padding: '8px 15px',
            margin: '0 5px',
            backgroundColor: 'red',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Decrement
        </button>
        
        <button 
          onClick={() => setCount(0)}
          style={{
            padding: '8px 15px',
            margin: '0 5px',
            backgroundColor: 'blue',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default Counter;