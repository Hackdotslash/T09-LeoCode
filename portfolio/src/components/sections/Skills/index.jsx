import React from "react"
import Style from "./skills.module.scss"
import SkillsItems from "./icons"

export const Skills = ({ duration, anim, easing }) => {
    const anim2 = "slide-up"

    return (
        <div className="main__container">
            <div className={`main__container__title ${Style.container}`}>
                <h2
                    data-sal={anim}
                    data-sal-delay={duration}
                    data-sal-easing={easing}
                >
                    I am made using... 
                </h2>
                <div className={Style.container}>
                    <ul className={Style.skills}>
                        {SkillsItems.map((item, index) => {
                            return (
                                <li
                                    className={Style.skills__list__item}
                                    data-sal={anim2}
                                    key={index}
                                    data-sal-delay={250 + 50 * index}
                                    data-sal-easing={easing}
                                >
                                    {item}
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        </div>
    )
}
