import React from "react"
import Style from "./style.module.scss"

const Contact = ({ duration, anim, easing }) => {
    return (
        <div className="main__container" id="contact">
            <div className={`main__container__title ${Style.container}`}>
                <h2
                    data-sal={anim}
                    data-sal-delay={duration}
                    data-sal-easing={easing}
                >
                    Contact Us
                </h2>
                <div>
                    <div>
                        <p
                            data-sal={anim}
                            data-sal-delay={duration}
                            data-sal-easing={easing}
                            className={Style.desc}
                        >
                            Connect with me, at <a href="mailto:hedwig.software@gmail.com">hedwig.software@gmail.com</a><hr />
                            Together we are on a mission to make this world a better place!
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contact
