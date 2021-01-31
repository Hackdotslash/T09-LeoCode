import React from "react"
import timelineData from "./timeline.json"
import Style from "./style.module.scss"
import TimelineItem from "./TimelineItem"

const Timeline = ({ duration, anim, easing }) => {
    return (
        <div className="main__container" id="life">
            <div className={`main__container__title ${Style.container}`}>
                <h2
                    data-sal={anim}
                    data-sal-delay={duration}
                    data-sal-easing={easing}
                >
                Timeline
                </h2>
                <div className={Style.timeline__container}>
                    {timelineData.map((data, idx) => (
                        <TimelineItem data={data} key={idx} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Timeline
