import React from "react"
import Img from "gatsby-image"
import { graphql, StaticQuery } from "gatsby"

const Image = props => (
    <StaticQuery
        query={graphql`
            query {
                images: allFile {
                    edges {
                        node {
                            relativePath
                            name
                            childImageSharp {
                                fluid(maxWidth: 600) {
                                    ...GatsbyImageSharpFluid
                                }
                            }
                        }
                    }
                }
            }
        `}
        render={data => {
            const image = data.images.edges.find(n => {
                return n.node.relativePath.includes(props.filename)
            })
            if (!image) {
                return null
            }

            //const imageSizes = image.node.childImageSharp.sizes; sizes={imageSizes}
            return (
                <Img alt={props.alt} fluid={image.node.childImageSharp.fluid} />
            )
        }}
    />
)

export default Image
