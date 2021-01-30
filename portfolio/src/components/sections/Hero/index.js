import React, { useEffect, useRef } from "react"
import Style from "./style.module.scss"
import anime from "animejs"

export default function Home() {
    const titleRef = useRef(null)
    const linkRef = useRef(null)
    useEffect(() => {
        anime({
            targets: titleRef.current.querySelectorAll(".animate"),
            translateY: ["200%", 0],
            easing: "easeInOutQuad",
            duration: 800,
            delay: anime.stagger(350, { start: 150 }),
        })
        anime({
            targets: linkRef.current,
            opacity: [0, 1.0],
            easing: "easeInOutQuad",
            duration: 800,
            delay: anime.stagger(350, { start: 1350 }),
        })
    })
    return (
        <div className={`main__container ${Style.hero}`} ref={titleRef}>
            <div className="main__container__title" style={{ width: "100%" }}>
                <div className={Style.inner}>
                    <div>
                        <h1
                            style={{
                                color: "white",
                                fontWeight: "bold",
                                marginBottom: "2px",
                            }}
                            className="animate"
                        >
                            Welcome!
                            <hr />
                            I'm Hedwig CO2 reducer
                        </h1>
                    </div>
                </div>
            </div>
        </div>
    )
}
