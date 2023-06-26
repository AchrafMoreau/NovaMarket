import React from 'react'
import Spline from '@splinetool/react-spline';

export const Modlue3d = () => {

  return (
    <div className="container">
        <div className="col-md-6"></div>
        <div className="col-md-6" style={{height:"80vh", background:"#fff"}}>
            <Spline scene='https://prod.spline.design/JvUw2r1l16nMxAP1/scene.splinecode' />
        </div>
    </div>
  )
}
