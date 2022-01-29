import React from 'react'
import styles from './animated-image.module.scss'

const RateImage = (props) => {
    // const [translation, setTranslation] = React.useState(1)

    const onAnimationEnd = () => {
        console.log("onAnimationEnd")
        // setTranslation(0)
        props.action({ isAnimationEnd: true })
    }
    return (
        <img
            className={styles.image}
            style={props.style}
            src={props.image}
            alt="randomised!"
            // onDoubleClick={() => setTranslation(1)}
            onAnimationEnd={onAnimationEnd}
            translate={props.visibility}
            visibility={props.visibility}
        />
    )
}
export default RateImage