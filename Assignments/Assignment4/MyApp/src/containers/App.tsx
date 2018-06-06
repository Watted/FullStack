import * as React from 'react'
import './App.css';
import Left from "./Left";
import Right from "./Right";



class App extends React.Component {

    public render() {
        return (
            <div className="App">
                <h1>Chat Management</h1>
                <div className="context">
                    <Left/>
                    <Right/>
                </div>
            </div>
        );
    }
}


export default App;