// import './App.css'
import ReportForm from './components/ReportForm'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


const App: React.FC = () => {
  const handleReportSubmission = () => {
    console.log("Report submitted successfully");
  }  

  return (
    <Router>
      <div>
        <h1>Welcome to EcoPlasticTracker Web Application</h1>
        <Routes>
          <Route path='/'  element={<ReportForm onSubmitSuccess={handleReportSubmission} />}/>
            
        </Routes>
     </div>
    </Router>
  )
}

export default App
