// import woocommercePlaceholder from '../assets/icons/download.png';
import Addtocart from '../../../assets/icons/add_cart.svg';
import {Fragment, useState} from "react";
import Modal from "../../UI/Modal";
import { useDispatch, useSelector } from "react-redux"
import { addItemHandler, removeItemHandler } from "../../../actions"
// import items from "../Products";

const ListItem = ({data,updateItemTitle,onAdd,onRemove}) => {
    // const [message,setMessage] = useState("Not added to the cart yet")

    //let message = "Not added to the cart yet"
    // const handleClick = () => {
    //     setMessage("Added to the Cart ")
    //     console.log("Clicked",message)
    //     //message = "Added to the cart!"
    // }
    // const [counter,setCounter]=useState(0)
    const [showModal, setShowModal] = useState(false)
    const item = useSelector(state => state.items.find(item => item.id === data.id))
    const dispatch = useDispatch()

    const increaseCounterByOne = event => {
        event.stopPropagation()
        // onAdd(data.id)
        dispatch(addItemHandler(data))
        // setCounter(counter + 1)
    }
    const decreaseCounterByOne = event => {
        event.stopPropagation()
        // onRemove(data.id);
        dispatch(removeItemHandler(data.id))

        // if(counter===0){
        //     return;
        // }
        // if(counter===1){
        //     onRemove(data.id);
        // }
        // setCounter(counter - 1)
    }

    const handleModal = () => {
        setShowModal(previousState => !previousState)
    }


    return (
        <Fragment>
            <div onClick={handleModal} className={"item-card"}>
                {/*<img className={"img-fluid"} src={`/assets/${data.thumbnail}`} alt={data.title}/>*/}
                <img
                    src='https://res.cloudinary.com/dsqi0shzq/image/upload/v1711084632/woocommerce-placeholder_nu3apv.png'
                    alt="Some titles"/>
                <div className={"item-card__information"}>
                    <div className={"pricing"}>
                        <span>₹{data.discountedPrice}</span>
                        <small>
                            <strike>₹{data.price}</strike>
                        </small>
                    </div>
                    <div className={"title"}>
                        <h3>{data.title}</h3>
                    </div>
                </div>
                <button onClick={() => updateItemTitle(data.id)}>Update The Title</button>
                {/*<small className={"cart-message"}>{message}</small>*/}
                {/*<button className={"cart-add"} onClick={(handleClick)}>*/}
                {/*    <span>Add to Cart</span>*/}
                {/*    <img src={Addtocart} alt='Cart Icon'/>*/}
                {/*</button>*/}
                {
                    !item || item?.quantity < 1 ?
                        <button className={"cart-add"} onClick={increaseCounterByOne}>
                            <span>Add to Cart</span>
                            <img src={Addtocart} alt="Cart Icon"/>
                        </button>
                        :
                        <div className="cart-addon">
                            <button onClick={decreaseCounterByOne}><span>-</span></button>
                            <span>{item.quantity}</span>
                            <button onClick={increaseCounterByOne}><span>+</span></button>
                        </div>
                }
            </div>
            { showModal &&
                <Modal onClose={handleModal}>
                    <div className="item-card__modal">
                        <div className="img-wrap">
                            <img className={"img-fluid"} src='https://res.cloudinary.com/dsqi0shzq/image/upload/v1711084632/woocommerce-placeholder_nu3apv.png'
                                 alt="Some titles"/>
                        </div>
                        <div className="meta">
                            <h3>{data.title}</h3>
                            <div className={"pricing"}>
                                <span>₹{data.discountedPrice}</span>
                                <small>
                                    <strike>₹{data.price}</strike>
                                </small>
                            </div>
                            <p>{data.description}</p>
                            {
                                !item || item?.quantity < 1 ?
                                    <button className={"cart-add card-add__modal"} onClick={increaseCounterByOne}>
                                        <span>Add to Cart</span>
                                        <img src={Addtocart} alt="Cart Icon"/>
                                    </button>
                                    :
                                    <div className="cart-addon card-addon__modal">
                                        <button onClick={decreaseCounterByOne}><span>-</span></button>
                                        <span>{item.quantity}</span>
                                        <button onClick={increaseCounterByOne}><span>+</span></button>
                                    </div>
                            }
                        </div>
                    </div>
                </Modal>
            }
        </Fragment>
    )
}

export default ListItem;