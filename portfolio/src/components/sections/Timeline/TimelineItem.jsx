import React from "react"
import Style from "./style.module.scss"

const TimelineItem = ({ data, duration, anim, easing }) => {
    return (
        <div
            className={Style.timeline__item}
            data-sal="slide-up"
            data-sal-delay="150"
            data-sal-easing="ease-in"
        >
            <div className={Style.timeline__item__content}>
                <time>{data.date}</time>
                <h3>{data.title}</h3>
                <h5>{data.subtitle}</h5>

                <span className={Style.circle} />
            </div>
        </div>
    )
}

export default TimelineItem
