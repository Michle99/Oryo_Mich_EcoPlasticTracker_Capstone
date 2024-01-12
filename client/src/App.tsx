// import './App.css'
import Home from './components/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


const App: React.FC = () => {
  // const handleReportSubmission = () => {
  //   console.log("Report submitted successfully");
  // }  

  return (
    <Router>
      <div>
        <Routes>
         <Route path='/' element={<Home/>}/>
        </Routes>
     </div>
    </Router>
  )
}

export default App
