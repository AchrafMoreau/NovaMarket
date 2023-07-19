import React from 'react'
import { useState } from 'react'
export const BestSeller = () => {

    const [hover1, setHover1] = useState(false)
    const [hover3, setHover3] = useState(false)
    const [hover2, setHover2] = useState(false)
    return (
        <>
            <div className="content">
                <div className="prod1"
                    onMouseEnter={()=> setHover1(true)}
                    onMouseLeave={()=> setHover1(false)}
                >
                    <img src="/images/lipstick-removebg-preview.png" className={`img-fluid ${hover1 ? "scalImg" : ""}`} alt="" />
                    <h4>Lipstick</h4>
                    <p className={hover1 ? "activeHover" : ""}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora repellendus ut rem provident quo? A facere eveniet facilis exercitationem et ab dolorum voluptates, odio ullam aliquam, quas consequatur, perspiciatis vel.</p>
                </div>
                <div className="prod2"
                    onMouseEnter={()=> setHover2(true)}
                    onMouseLeave={()=> setHover2(false)}
                >
                    <img src="/images/lipstick-removebg-preview.png" className={`img-fluid ${hover2 ? "scalImg" : ""}`} alt="" />
                    <h4>Lipstick</h4>
                    <p className={hover2 ? "activeHover" : ""}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora repellendus ut rem provident quo? A facere eveniet facilis exercitationem et ab dolorum voluptates, odio ullam aliquam, quas consequatur, perspiciatis vel.</p>
                </div>
                <div className="prod3"
                    onMouseEnter={()=> setHover3(true)}
                    onMouseLeave={()=> setHover3(false)}
                >
                    <img src="/images/lipstick-removebg-preview.png" className={`img-fluid ${hover3 ? "scalImg" : ""}`} alt="" />
                    <h4>Lipstick</h4>
                    <p className={hover3 ? "activeHover" : ""}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora repellendus ut rem provident quo? A facere eveniet facilis exercitationem et ab dolorum voluptates, odio ullam aliquam, quas consequatur, perspiciatis vel.</p>
                </div>
            </div>
        </>
    )
}
