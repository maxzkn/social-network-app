import React from "react";
import {BrowserRouter, Route, withRouter} from "react-router-dom";
import "./App.css";
import { Navbar, News, Music, Settings } from "./components";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import UsersContainer from "./components/Users/UsersContainer";
import LoginPage from "./components/Login/Login";
import {connect, Provider} from "react-redux";
import {compose} from "redux";
import {initializeApp} from "./redux/appReducer";
import Preloader from "./components/common/preloader/Preloader";
import store from "./redux/redux-store";

// const SomeComponent = (props) => {
//   return <Profile posts={props.posts} />
// }

// const App = ({ appState: { profilePage, dialogsPage, sidebar }, store }) => {
class App extends React.Component {
    componentDidMount() {
        this.props.initializeApp();
    }

    render() {
        if (!this.props.initialized) return <Preloader />

        return (
            <div className="app-wrapper">
                <HeaderContainer />
                <Navbar />
                <div className="app-wrapper-content">
                    {/* <Route path='/profile' component={Profile} />
                    <Route exact path='/dialogs' component={Dialogs} /> */}
                    {/* <Route path='/profile' component={ SomeComponent } /> */}
                    {/* <Route path='/profile' component={ () => SomeComponent } /> */}
                    {/* <Route path='/profile' component={ () => <Profile posts={props.posts} /> } /> */}
                    {/* <Route path='/profile' render={ () => <Profile profilePage={props.state.profilePage} dispatch={props.dispatch} /> } /> */}
                    <Route path='/profile/:userId?' render={ () => <ProfileContainer /> } />
                    {/* <Route exact path='/dialogs' render={ () => <Dialogs dialogsPage={props.state.dialogsPage} dispatch={props.dispatch} /> } /> */}
                    <Route exact path='/dialogs' render={ () => <DialogsContainer /> } />
                    <Route path='/news' component={News} />
                    <Route path='/music' component={Music} />
                    <Route path='/settings' component={Settings} />
                    <Route path='/users' render={ () => <UsersContainer /> } />
                    <Route path='/login' render={ () => <LoginPage /> } />
                </div>
            </div>
        );
    }
};

const mapStateToProps = (state) => ({
    initialized: state.app.initialized
})

const AppContainer = compose(
    withRouter,
    connect(mapStateToProps, {initializeApp})
)(App);

const MyApp = () => (
    <BrowserRouter>
      <Provider store={store}>
        <AppContainer />
      </Provider>
    </BrowserRouter>
)

export default MyApp;
