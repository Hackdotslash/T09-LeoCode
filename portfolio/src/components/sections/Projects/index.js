import React, { useState } from "react"
import ProjectItem from "./ProjectItem"

import ProjectData from "./data.json"
import Style from "./projectitem.module.scss"
import { Link } from "gatsby"

const Projects = ({ duration, anim, easing }) => {
    const projectLength = 4
    const [isSeeMoreEnabled, setSeeMoreEnabled] = useState(false)

    return (
        <div className="main__container" id="projects">
            <div className="main__container__title">
                <h2
                    data-sal={anim}
                    data-sal-delay={duration}
                    data-sal-easing={easing}
                >
                    Products
                </h2>
                <div className={Style.project__container}>
                    {ProjectData.map((item, index) => {
                        return (
                            <ProjectItem
                                project={item}
                                key={index}
                                duration={duration}
                                anim={anim}
                                easing={easing}
                                animate={index < projectLength}
                                visible={
                                    isSeeMoreEnabled || index < projectLength
                                }
                                index={ProjectData.length - index + 1}
                                id={
                                    index === projectLength
                                        ? "first-item"
                                        : "item"
                                }
                                id2={
                                    index === projectLength - 2
                                        ? "last-brief-item"
                                        : "item"
                                }
                            />
                        )
                    })}
                </div>
                <div className={Style.see_more_link}>
                    <div
                        data-sal={anim}
                        data-sal-delay={duration}
                        data-sal-easing={easing}
                        className={Style.resume__link}
                        id="see-more"
                    >
                        <Link
                            to={
                                isSeeMoreEnabled
                                    ? "#last-brief-item"
                                    : "#first-item"
                            }
                            onClick={() => {
                                setSeeMoreEnabled(prev => !prev)
                            }}
                        >
                            {isSeeMoreEnabled ? "See less" : "See more"}
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Projects
