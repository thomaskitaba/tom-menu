import React from 'react';
import {Packagejson, Aboutpackage} from './Packagejson';
// import {packagediaspora} from './package-diaspora.jpg';
// import packageDiaspora from './package-diaspora.jpg';

const Package = () => {
  return (
    <>
    <div className="package-header" id="packages">
      <div><h1> Packages </h1></div>
      <div className="about-packages">
        <p>
          {Aboutpackage[0]['general-description']}
        </p>
      </div>

    </div>
    <div className="package-container">

      {Packagejson.map((pkg, index) => (
        <>
        { pkg['package-availability'] === 'available' &&
        <div key={index} className="package-container-content" >
          <img src={pkg['package-image']} alt={pkg['package-name']} className="package-container-images" />
          <h2>{pkg['package-name']}</h2>
          <p>{pkg['package-description']}</p>
          <p><strong>Price:</strong> ${pkg['package-price']}</p>
          <p><strong>Start Date:</strong> {pkg['package-startdate']}</p>
          <p><strong>End Date:</strong> {pkg['package-enddate']}</p>
          <p><strong>Availability:</strong> {pkg['package-availability']}</p>
        </div>
}
        </>
      ))}
    </div>
    </>
  );
}

export default Package;
