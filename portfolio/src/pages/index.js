import React from "react"
import Home from "../components/sections/Hero"
import Header from "../components/header"
import About from "../components/sections/About"
import "./index.css"
import { Skills } from "../components/sections/Skills"
import Timeline from "../components/sections/Timeline"
import Footer from "../components/sections/Footer"
import Projects from "../components/sections/Projects"
import Contact from "../components/sections/Contact"
import { Helmet } from "react-helmet"
import Logo from "../logo.png"

const IndexPage = () => {
    const duration = "150"
    const anim = "slide-up"
    const easing = "easeInCubic"
    return (
        <>
            <Helmet>
                <link rel="icon" href={Logo} />
            </Helmet>
            <Header />
            <Home />
            <About duration={duration} anim={anim} easing={easing} />
            <Skills duration={duration} anim={anim} easing={easing} />
            <Projects
                duration={duration}
                anim={anim}
                easing={easing}
                isBrief={true}
            />
            <Timeline duration={duration} anim={anim} easing={easing} />
            <Contact duration={duration} anim={anim} easing={easing} />
            <Footer />
        </>
    )
}

export default IndexPage
