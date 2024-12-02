import ReactDom from 'react-dom'

export const Backdrop = props => {
    const handleClick = () => {
        if(props.onClose) {
            props.onClose();
        }
    }

    return (
        <div onClick={handleClick} className="loader-overlay"></div>
    )
}

const Loader = () => {
    return (
        <>
            <div className={"loader-overlay"}></div>
            <div className="loading-dots">
                <div>Loading</div>
                <div className={"loading-dots--dot"}></div>
                <div className={"loading-dots--dot"}></div>
                <div className={"loading-dots--dot"}></div>
            </div>
        </>
    )
}

export default Loader