import React from 'react';

const Descr = ({descr, onCloseClick}) =>{
    return(
        <div className='description-wrapper'>

            <div className='description-body'>
                <div className='close' onClick={onCloseClick}>
                    &times;
                </div>
                <div dangerouslySetInnerHTML={{__html: descr}}></div>
            </div>
        </div>
    )
};
export default Descr;