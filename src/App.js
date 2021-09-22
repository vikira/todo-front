import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { map } from 'lodash';

function App() {
  const [input, setInput] = useState('');
  const [todos, setTodos] = useState([]);

  const getTodos = async () => {
    const result = await axios.get('http://localhost:5000/todos').catch((e) => {
      console.log(e);
    });
    if (result && result.status === 200) {
      setTodos(result.data);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div className='App'>
      <h1>Todo list</h1>

      <Form>
        <Form.Group className='mb-3' controlId='formBasicEmail'>
          <Form.Label>Todo를 입력하는 곳</Form.Label>
          <Form.Control
            type='text'
            placeholder='todo를 입력하세요'
            onChange={(e) => setInput(e.target.value)}
            value={input}
          />
        </Form.Group>

        <Button
          variant='primary'
          type='submit'
          onClick={() => alert('clicked')}
        >
          Submit
        </Button>
      </Form>

      {todos &&
        map(todos, (item) => (
          <Button onClick={() => alert(`${item?.id} clicked`)}>
            {item?.title}
          </Button>
        ))}
    </div>
  );
}

export default App;
