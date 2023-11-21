import React from 'react'
import '../styles/contactus.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faEnvelope, faLocationDot, faPhone } from '@fortawesome/free-solid-svg-icons'
function ContactUs() {
  return (
    <div className='contactus'>
         <h4 className='contactus-title'>Contact Us </h4>
         <div className='contactus-content'>
         <p>E-mail <FontAwesomeIcon icon={faEnvelope}/> : naagajewellers@gmail.com</p>
         <p>Phone <FontAwesomeIcon icon={faPhone}/> : 044 123456</p>
         <p>Address <FontAwesomeIcon icon={faLocationDot}/> : No-1,T-Nagar,Chennai.</p>
         </div>
</div>
  )
}

export default ContactUs