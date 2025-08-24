import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AdminDashboard from './pages/AdminDashboard';
import InterviewerPage from './pages/InterviewerPage';
import LoginPage from './pages/LoginPage';
import Navbar from './components/Navbar';

function App() {
    return (
        <Router>
            <Navbar />
            <Switch>
                <Route path="/" exact component={LoginPage} />
                <Route path="/admin" component={AdminDashboard} />
                <Route path="/interviewer" component={InterviewerPage} />
            </Switch>
        </Router>
    );
}

export default App;