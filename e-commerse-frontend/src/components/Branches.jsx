import React from 'react';
import '../styles/branches.css';
import { Card } from 'react-bootstrap';
import img1 from '../assets/images/location/location1.png';
import img2 from '../assets/images/location/location2.png';
import img3 from '../assets/images/location/location3.png';
import img4 from '../assets/images/location/location4.png';
import img5 from '../assets/images/location/location5.png';
import img6 from '../assets/images/location/location6.png';
import img7 from '../assets/images/location/location7.png';
import img8 from '../assets/images/location/location8.png';
import img9 from '../assets/images/location/location9.png';
import img10 from '../assets/images/location/location10.png';

function Branches() {
  const images = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10];
  const titles = ["Mumbai", "Delhi", "Bangalore", "Hyderabad", "Lucknow", "Chennai", "Pune", "Kolkata", "Patna", "Jaipur"];

  const cards = images.map((image, index) => (
    <div className='col-md-2' style={{ marginBottom: '10px' }} key={index}>
      <Card className='h-90'>
        <div className='text-center'>
          <Card.Img variant="top" src={image} style={{ width: '100px', height: '130px', padding: '5px' }} />
        </div>
        <Card.Body>
          <Card.Title style={{textAlign:'center'}}>{titles[index]}</Card.Title>
        </Card.Body>
      </Card>
    </div>
  ));

  return (
    <div className='branches'>
      <h2 className='branches-title'>Popular Cities</h2>
      <div className='row'>{cards}</div>
    </div>
  );
}

export default Branches;
