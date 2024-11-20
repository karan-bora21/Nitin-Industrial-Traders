import { BrowserRouter, Routes, Route } from 'react-router-dom';
//pages and components
import Home from './pages/home';
import ViewBill from './pages/ViewBill';
import CreateBill from './pages/CreateBill';
import ExcelBill from './pages/ExcelBill';
import SearchBill from './pages/SearchBill';
import AddParty from './pages/AddParty';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className='pages'>
          <Routes>
            <Route 
              path="/"
              element = {<Home />}
            />
            <Route 
              path='/viewBill'
              element = {<ViewBill />}
            />
            <Route 
              path='/createBill'
              element = {<CreateBill />}
            />
            <Route 
              path='/excelBill'
              element = {<ExcelBill />}
            />
            <Route 
              path='/searchBill'
              element = {<SearchBill />}
            />
            <Route 
              path='/addParty'
              element = {<AddParty />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
