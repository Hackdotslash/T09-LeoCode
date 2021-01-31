module.exports = {
    siteMetadata: {
        title: `Rohit Chaudhari`,
        description: `Personal portfolio of Rohit Chaudhari. He is a software developer and studies computer engineering at College of Engineering, Pune (CoEP).`,
        author: `Rohit Chaudhari`,
        keywords: [
            "Rohit",
            "Rohit Chaudhari",
            "CoEP",
            "College of Engineering, Pune",
            "Web Portfolio",
        ],
    },
    plugins: [
        `gatsby-plugin-react-helmet`,
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `images`,
                path: `${__dirname}/src/images`,
            },
        },
        {
            resolve: "gatsby-source-filesystem",
            options: {
                path: `${__dirname}/gatsby-config.js`,
            },
        },
        {
            resolve: `gatsby-plugin-scroll-reveal`,
            options: {
                threshold: 0.5, // Percentage of an element's area that needs to be visible to launch animation
                once: true, // Defines if animation needs to be launched once
                disable: false, // Flag for disabling animations

                // Advanced Options
                selector: "[data-sal]", // Selector of the elements to be animated
                animateClassName: "sal-animate", // Class name which triggers animation
                disabledClassName: "sal-disabled", // Class name which defines the disabled state
                rootMargin: "0% 50%", // Corresponds to root's bounding box margin
                enterEventName: "sal:in", // Enter event name
                exitEventName: "sal:out", // Exit event name
            },
        },
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: `Rohit Chaudhari`,
                short_name: `Rohit Chaudhari`,
                start_url: `/`,
                background_color: `#181818`,
                theme_color: `#5ec4ac`,
                display: `standalone`,
                orientation: "portrait",
                icon: "src/logo.png",
            },
        },
        `gatsby-plugin-sass`,
        `gatsby-transformer-sharp`,
        `gatsby-plugin-sharp`,
    ],
}
