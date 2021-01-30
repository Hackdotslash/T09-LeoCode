import React, { useRef } from "react"

import { Link as a } from "gatsby"
import Image from "./ProjectImage"
import Style from "./projectitem.module.scss"

const ProjectItemRight = ({
    project,
    duration,
    anim,
    easing,
    id2,
    id,
    visible,
    index,
}) => {
    const {
        title,
        description,
        subTitle,
        image,
        tech_stack,
        is_online,
        source_code,
        online_link,
        is_source_code,
    } = project

    const container = useRef(null)

    return (
        <div
            className={`${Style.container}`}
            ref={container}
            style={{ display: visible ? "block" : "none" }}
            id={id}
        >
            <div className={Style.main}>
                <div
                    className={Style.image__div}
                    data-sal={"fade"}
                    data-sal-delay={duration + 1000}
                    data-sal-easing={easing}
                >
                    <Image filename={image} />
                </div>
                <div
                    className={Style.desc}
                    data-sal={anim}
                    data-sal-delay={duration - 100}
                    data-sal-easing={easing}
                >
                    <div className={Style.title}>
                        <h3>{title}</h3>
                        <h5>{subTitle}</h5>
                        <div className={Style.links}>
                            {is_source_code !== false && (
                                <a href={source_code} target="blank">
                                    Source Code
                                </a>
                            )}
                            {is_online && (
                                <a href={online_link || "/"} target="blank">
                                    View Online
                                </a>
                            )}
                        </div>
                    </div>
                    <p
                        data-sal={anim}
                        data-sal-delay={duration - 100}
                        data-sal-easing={easing}
                    >
                        {description}
                    </p>
                    <div className={Style.categories} id={id2}>
                        {tech_stack.map(item => (
                            <div className="category__item" key={item}>
                                {item}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProjectItemRight
