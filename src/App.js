import React from "react";
import {BrowserRouter, Redirect, Route, Switch, withRouter} from "react-router-dom";
import "./App.css";
import {Navbar, News, Music, Settings} from "./components";
// import DialogsContainer from "./components/Dialogs/DialogsContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
// import ProfileContainer from "./components/Profile/ProfileContainer";
import UsersContainer from "./components/Users/UsersContainer";
import LoginPage from "./components/Login/Login";
import {connect, Provider} from "react-redux";
import {compose} from "redux";
import {initializeApp} from "./redux/appReducer";
import Preloader from "./components/common/preloader/Preloader";
import store from "./redux/redux-store";

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'))
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'))

// const SomeComponent = (props) => {
//   return <Profile posts={props.posts} />
// }

// const App = ({ appState: { profilePage, dialogsPage, sidebar }, store }) => {
class App extends React.Component {
    componentDidMount() {
        this.props.initializeApp();
        // window.addEventListener("unhandledrejection", this.catchAllUnhandledErrors)
    } // после того как компонента вмонтировалась она оставляет за собой мусор в качестве addEventListener
      // поэтому если в методах жизненного цикла работаем с таким делом как листенеры их всегда нужно подчищать
    // componentWillUnmount() {
    //     window.removeEventListener("unhandledrejection", this.catchAllUnhandledErrors)
    // }
    //
    // catchAllUnhandledErrors = (promiseRejectionEvent) => {
    //     alert("Some error occured");
    // }

    render() {
        if (!this.props.initialized) return <Preloader/>

        return (
            <div className="app-wrapper">
                <HeaderContainer/>
                <Navbar/>
                <div className="app-wrapper-content">
                    <React.Suspense fallback={<Preloader/>}> {/* for lazy loading */}
                        <Switch> {/* instead of Route exact (/login/facebook - exact /login) */}
                            <Redirect exact from="/" to="/profile" />
                            {/* <Route path='/profile' component={Profile} />
                        <Route exact path='/dialogs' component={Dialogs} /> */}
                            {/* <Route path='/profile' component={ SomeComponent } /> */}
                            {/* <Route path='/profile' component={ () => SomeComponent } /> */}
                            {/* <Route path='/profile' component={ () => <Profile posts={props.posts} /> } /> */}
                            {/* <Route path='/profile' render={ () => <Profile profilePage={props.state.profilePage} dispatch={props.dispatch} /> } /> */}
                            <Route path='/profile/:userId?' render={() => <ProfileContainer/>}/>
                            {/* <Route exact path='/dialogs' render={ () => <Dialogs dialogsPage={props.state.dialogsPage} dispatch={props.dispatch} /> } /> */}
                            <Route exact path='/dialogs' render={() => <DialogsContainer/>}/>
                            <Route path='/news' component={News}/>
                            <Route path='/music' component={Music}/>
                            <Route path='/settings' component={Settings}/>
                            <Route path='/users' render={() => <UsersContainer/>}/>
                            <Route path='/login' render={() => <LoginPage/>}/>
                            <Route path='*' render={() => <div>404 NOT FOUND</div>}/>
                        </Switch>
                    </React.Suspense>
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
            <AppContainer/>
        </Provider>
    </BrowserRouter>
)

export default MyApp;
