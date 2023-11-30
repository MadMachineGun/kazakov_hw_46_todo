import Header from './components/MainHeader/Header';
import TodoApp from './components/ToDo/TodoApp';

function App() {

  return (
    <>
      <Header />
      <div className='main'>
        <TodoApp />
      </div>
    </>
  );
}

export default App;
