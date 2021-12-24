import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { Navbar } from './components/Navbar';
import { HomePage } from './components/pages/HomePage';
import { ProfilePage } from './components/pages/ProfilePage';
import { LoginPage } from './components/pages/LoginPage';
import { NewPostPage } from './components/pages/NewPostPage';

function App() {
  return (
    <div className='App'>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/">
            <HomePage/>
          </Route>
          <Route path="/profile">
            <ProfilePage />
          </Route>
          <Route path="/pet/:id">
            <div>Individual Pet Details</div>
          </Route>
          <Route path="/login">
            <LoginPage/>
          </Route>
          <Route path="/new">
            <NewPostPage/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;