//const state

export const reducer = (state= {
    citiesHide:true,
    city:'perm',
    channelId:15,
    channelName:'Первый канал',
    more:true},action)=>{
    switch (action.type){
        case 'channelSelect': {
            console.log(action.channelId);
            return {...state,channelId:action.channelId,channelName:action.channelName};
        }
        case 'channelsLoad': {
            return {...state,channels:action.channels};
        }
        case 'citySelect':{
            return {...state,city:action.city, citiesHide:true};
        }
        case 'cityClick':{
            return {...state, citiesHide:false};
        }
        case 'showProgramDesc':{
            return {...state,desc:action.desc, showDesc:true};
        }
        case 'closeDesc':{
            return {...state, showDesc:false};
        }
        case 'programLoad':{
            return {...state, programs:action.programs,more:true};
        }
        case 'moreClick':{
            return {...state,more: !state.more}
        }

    }
}