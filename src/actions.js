
export const channelSelect = (channelId,channelName)=>{return {type:'channelSelect', channelId,channelName}};
export const channelsLoad = (channels)=>{return{type:'channelsLoad',channels}};
export const citySelect = (city)=>{return{type:'citySelect', city}};
export const cityClick = ()=>{return{type:'cityClick'}};
export const showProgramDesc = (desc)=>{return{type:'showProgramDesc',desc}};
export const closeDesc = ()=>{return{type:'closeDesc'}};
export const programLoad = (programs)=>{return {type:'programLoad',programs}};
export const moreClick = ()=>{return{type:'moreClick'}};
