import React, {Component} from 'react';

import {connect} from 'react-redux';
import * as actions from '../../actions';
import {bindActionCreators} from 'redux';

class Header extends Component{


    cities=['perm','nsk','ekat'];

    renderMenu(){
        console.log(this.props);
        return this.cities.map((item,i)=>{
                return(
                    <span key={i} onClick={()=>this.props.citySelect(item)}>{item}</span>
                )
            }
        )
    }

    render(){

        let {city, citiesHide} = this.props;

        //const menu=this.renderMenu();
        let menuClassList = 'city-list';
        menuClassList += citiesHide ? ' hide':'';
        return(
            <div className="row">
                <div className="col-xs-6 col-xs-offset-6 col-md-3 col-md-offset-9">
                    <div className="city-wrapper">
                        <div onClick={()=>this.props.cityClick()} className="city">
                            {city}
                        </div>
                        <div className={menuClassList}>
                            {this.renderMenu()}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state)=>{

    return {...state};
};

const mapDispatchToProps = (dispatch,state)=>{
    const {citySelect,cityClick} = bindActionCreators(actions,dispatch);
    return{
        citySelect: (city)=>{citySelect(city)},
        cityClick: ()=>{cityClick()}
        //channelsLoad: (value)=>{channelsLoad(value)}
    }
};

export default  connect(mapStateToProps,mapDispatchToProps)(Header);
