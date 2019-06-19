import React, {Component} from 'react';
import Descr from '../descr/descr';


import TvService from '../../services/tvService' ;

import {connect} from 'react-redux';
import * as actions from '../../actions';
import {bindActionCreators} from 'redux';

import {removeDuplicate} from "../../common";

class Menu extends Component{

    tvService = new TvService();


    componentDidMount(){
        const city = this.props.city || 'perm';
        this.tvService.getChannelsList(city)
            .then((channels)=>{
                const filteredChannels = channels.filter(
                    (item,index)=>{
                        return channels.indexOf(item.xvid)>=index;
                    });
                this.props.channelsLoad(filteredChannels)
            })
    }

    componentDidUpdate(prewProps){
        const city = this.props.city || 'perm';
        if (city !== prewProps.city){
            this.tvService.getChannelsList(city)
                .then((channels)=>{
                    channels.sort((a,b)=>{return a.xvid-b.xvid});
                    const filteredChannels = removeDuplicate(channels,'xvid');
                    this.props.channelsLoad(filteredChannels)
                })
        }
    }

    renderChannelList(){
        const {channels}= this.props;
        if (channels===undefined){
            return
        }
        return channels.map((item)=>{
            let className = 'menu-item';
            const {channelId} = this.props;
            const {chid,xvid,title,logo,description}=item;
            if (channelId === xvid){
                className += ' select';
            }
            return(
                <li
                    className={className}
                    key={chid}
                    onClick={()=>{
                        this.props.channelSelect(xvid,title)}}>
                    <img src={`http://epg.domru.ru/${logo}`} alt={title}
                         onClick={(e)=>{
                             e.stopPropagation();
                             console.log('lllllll');
                             this.props.showProgramDesc(description)}}/>
                    <span
                    >{title}</span>
                </li>
            )
        })
    }

    render(){
        let dialog = this.props.showDesc?<Descr
        descr={this.props.desc}
        onCloseClick={this.props.closeDesc}
        />:null;
        return(
            <div className="col-xs-10 col-md-4">
                <ul className="menu">
                    {this.renderChannelList()}
                </ul>
                {dialog}
            </div>
        )
    }
}

const mapStateToProps = (state)=>{
    if (state) {
        const {channels, channelId, city} = state;
        return {channels, channelId, city};
    }
    return {}
};

const mapDispatchToProps = (dispatch,state)=>{
    const {channelSelect,channelsLoad,showProgramDesc,closeDesc} = bindActionCreators(actions,dispatch);
    return{
        channelSelect: (id,name)=>{channelSelect(id,name)},
        channelsLoad: (value)=>{channelsLoad(value)},
        showProgramDesc: (value)=>{showProgramDesc(value)},
        closeDesc: ()=>{closeDesc()},
    }
};

export default  connect(mapStateToProps,mapDispatchToProps)(Menu);

//export default Menu