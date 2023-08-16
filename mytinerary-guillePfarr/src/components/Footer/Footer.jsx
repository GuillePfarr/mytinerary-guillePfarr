import React from 'react'

import "./footer.css"

const Footer = () => {
    return (

        <div className='container-fluid'>
            <div className='row p-5 bg-secondary text-red'>

                <div className="col-xs-12 col-md-6 col-lg-3">
                    <p className='h5'>Navigate</p>
                </div>
                <div className="col-xs-12 col-md-6 col-lg-3">
                    <p className='h5'>Media</p>
                </div>
                <div className="col-xs-12 col-md-6 col-lg-3">
                    <p className='h5'>Contact</p>
                </div>
                <div className="col-xs-12 col-md-6 col-lg-3">
                    <p className='h3'>Mytineraries</p>
                </div>
            </div>

            {/* <footer className="app-footer">
            <p className="text-center">MindHub AP MERN TN08 - GuillePfarr</p>
        </footer> */}
        </div>
    );
};

export default Footer;