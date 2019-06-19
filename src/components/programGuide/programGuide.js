import React, {Component} from 'react';
import Descr from '../descr/descr';

import TvService from '../../services/tvService' ;

import {connect} from 'react-redux';
import * as actions from '../../actions';
import {bindActionCreators} from 'redux';


class ProgramGuide extends Component{

    tvService = new TvService();
    state={
        programs:[],
        descr:"",
        showDesc:false
    };

    componentDidUpdate(prewProps){
        const {channelId,city} =this.props;
        if (prewProps.channelId !== channelId) {
            let today = new Date();
            let tomorrow = new Date();
            today.setHours(today.getHours()-3);
            console.log(today);
            tomorrow.setDate(tomorrow.getDate() + 1);

            const start = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}+${today.getHours()}%3A00%3A00`;
            const finish = `${tomorrow.getFullYear()}-${tomorrow.getMonth() + 1}-${tomorrow.getDate()}+${tomorrow.getHours()}%3A00%3A00`;
            this.props.programLoad(undefined);
            this.tvService.getProgramsList(start, finish, city, channelId)
                .then((programs) => {
                    console.log(programs[channelId]);
                    this.props.programLoad(programs[channelId]);
                })
        }
    }

    renderProgramsList(){
        const {programs,more} = this.props;

        if (programs===undefined){
            return
        }
        const now = new Date();
        let next = '';
        return programs.map((item,i)=>{
            const {start, title,tid,desc,duration} = item;
            let date = new Date(start);

            if ( more && i>10){
                return
            }

            let className = "program"+next;
            next = '';
            if (date<now){
                if (date.getTime()+duration*1000 > now.getTime()){

                    className += ' current';
                    next = ' next'
                }
                else{

                    className += ' ended'
                }
            }

            let options = {
                hour: 'numeric',
                minute: 'numeric'
            };

            const startTime = date.toLocaleString("ru", options);

            return(
                <div
                    className={className}
                    key={tid+startTime+title}
                    onClick={()=>{this.props.showProgramDesc(desc)}}
                >
                    <div className="program-time">{startTime}</div>
                    <div className="program-title">{title}</div>
                </div>
            )

        })
    }
    render(){

        const dialog = this.props.showDesc?<Descr
            descr={this.props.desc}
            onCloseClick={this.props.closeDesc}
        />:null;

        const more = this.props.more ? <More onClick={this.props.moreClick} text="Больше &xvee;"/>: <More onClick={this.props.moreClick} text="Меньше &xwedge;"/>;

        return(
            <div className="col-xs-12 col-md-8">
                <h3 className="channel">
                    {this.props.channelName}
                </h3>
                <div className="program-guide">
                    {this.renderProgramsList()}
                    {dialog}
                </div>
                {more}
            </div>
        )
    }
}

const More = ({onClick, text})=>{
    return (
        <div
            className='program-more'
            onClick={onClick}
            dangerouslySetInnerHTML={{__html: text}}
        >

        </div>
    )
};

const mapStateToProps = (state)=>{

    if (state){
        const {programs,showDesc,desc,channelId,city,channelName,more}=state;
        return {programs,showDesc,desc,channelId,city,channelName,more};
    }
    return {}
};

const mapDispatchToProps = (dispatch,state)=>{
    const {showProgramDesc,closeDesc,programLoad,moreClick} = bindActionCreators(actions,dispatch);
    return{
        showProgramDesc: (value)=>{showProgramDesc(value)},
        closeDesc: ()=>{closeDesc()},
        programLoad:(value)=>{programLoad(value)},
        moreClick:()=>{moreClick()}
    }
};

export default  connect(mapStateToProps,mapDispatchToProps)(ProgramGuide);
