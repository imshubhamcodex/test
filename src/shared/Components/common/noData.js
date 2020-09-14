import React,{Component} from 'react';

const NoData = (props) => {
        return (
            <div className="container">
                <div style={{
                    transform:"translate(-50%,-50%)",position:"fixed",
                    top:"50%",left:"50%",padding:"20px",fontSize:"20px",
                    background:"#efefef",padding:"25px"}}>
                    {props.message}</div>
            </div>
        )
    }

export default NoData;