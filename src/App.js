import Header from './components/MainHeader/Header';
import TodoApp from './components/ToDo';

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
