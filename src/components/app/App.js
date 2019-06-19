import React, {Component} from 'react';
import Header from '../header/header';
import Menu from '../menu/menu';
import ProgramGuide from '../programGuide/programGuide';
import './App.css';

class App extends Component{



    render(){
        return(
            <>
                <Header/>
                <div className="row center-xs">
                    <Menu/>
                    <ProgramGuide/>
                </div>
            </>
        )
    }
}

export default App;
