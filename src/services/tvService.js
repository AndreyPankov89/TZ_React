export default class TvService{
    constructor(){
        this._base = 'https://epg.domru.ru'
    }

    async getResource(url){
        const resource = await fetch(`${this._base}${url}`);


        if (!resource.ok){
            throw new Error(resource.status);
        }

        return resource.json();
    }

    getChannelsList = async (city)=>{
        const res = await this.getResource(`/channel/list?domain=${city}`);
        return res
    };

    getProgramsList = async (start,finish,city,channel)=>{
        return await this.getResource(`/program/list?domain=${city}&date_from=${start}&date_to=${finish}&xvid=${channel}`)
    };

}