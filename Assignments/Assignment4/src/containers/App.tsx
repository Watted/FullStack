import * as React from 'react';
import {Switch, Route, Link, Redirect} from "react-router-dom";
import Login from "./login";
import './App.css';
import {stateStoreService} from "../state/StateStore";
import Chat from "./chat";

export enum ERROR_MSG{
    none,
    loggedIn,
    credentials,
}

interface IAppState {
    loggedInUser: {name:string, id:string} | null,
    errorMsg: ERROR_MSG,
    redirectToChat:boolean
}


class App extends React.Component<{}, IAppState> {
    public chatMessagesChild:any;

    constructor(props:{}) {
        super(props);

        this.state = {
            loggedInUser: null,
            errorMsg: ERROR_MSG.none,
            redirectToChat:false,
        };

        stateStoreService.subscribe(() => {
            this.forceUpdate();
        });
    }

    public onLoginSubmitHandler =(user:{name:string, password:string})=>{
        try{
            const userId = stateStoreService.auth(user);

            this.setState({
                loggedInUser: {name: user.name, id:userId},
                errorMsg: ERROR_MSG.loggedIn,
                redirectToChat: true
            })

        }
        catch(error) {
            this.setState((prev) => ({
                loggedInUser: null,
                errorMsg: ERROR_MSG.credentials,
            }));

        }

    };


    public loginRender = (props:any)=>(this.state.redirectToChat ? <Redirect to={{ pathname : '/chat'}} /> : <Login {...props} data={this.state} loginStatus={this.state.errorMsg} onSubmit={this.onLoginSubmitHandler}/>);

    public chatRender = (props:any) => (<Chat ref={instance => {this.chatMessagesChild = instance}} {...props} data={this.state}/>);

    public logOut = () => {
        this.setState({loggedInUser:null, redirectToChat:false, errorMsg: ERROR_MSG.none});
        this.chatMessagesChild.logOut();
    };

    public render() {
        return (
            <div className="App">
                <Route path='/login' render={this.loginRender}/>
                <nav>
                    <div className="Left">
                        <Link to="/login"><button className="logIn">login</button></Link>
                    </div>
                    <div className="Right">
                        <Link to="/chat"><button className="logOut" onClick={this.logOut}>Log out</button></Link>
                    </div>

                </nav>
                <div className="switch">
                    <Switch>
                        <Route exact={true} path='/chat' render={this.chatRender}/>
                        <Route path='/' render={this.chatRender}/>
                    </Switch>
                </div>
            </div>
        );
    }
}

export default App;