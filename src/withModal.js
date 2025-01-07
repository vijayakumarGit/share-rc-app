import React, { useRef, useState } from 'react';

const withModal = (WrappedComponent) => {
    const WithModal=(props)=>{
        const [modal,setModal]=useState(false);
        const modalValues=useRef(null)
        const handleOpenModal=(params,opt)=>{
            console.log(params,opt)
            modalValues.current=params;
            setModal(true)
        }
        return (<>
            <WrappedComponent {...props} openModal={handleOpenModal}/>
            {modal && <div>
                This is Modal
                <button onClick={modalValues?.current?.onProcess}>Process</button>
                <button onClick={modalValues?.current?.onCancel}>Cancel</button>
            </div>}
        </>)

    }
    return WithModal
}
export default withModal;