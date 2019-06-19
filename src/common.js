
export const removeDuplicate= (array,key)=>{
    const map = new Map();
    array.map(obj => {
        if (!map.has(obj[key])) {
            map.set(obj[key], obj)
        }
    });
    return [...map.values()]
}
