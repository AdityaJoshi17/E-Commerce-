import ListItem from "./components/Products/ListItem/ListItem";
import Products from "./components/Products/Products";
import Header from "./components/Layout/header";
import Subheader from "./components/Layout/Subheader";
import {useState} from "react";
import cart from "./components/Cart";
import {Redirect, Route, Switch} from "react-router-dom";
import AuthIndex from "./components/Auth";

const App = () => {
  const [cartItems,setCartItems]=useState([])
  const [eventQueue,setEventQueue] = useState({
    id:"",
    type:""
  })
  const handleAddItem = item =>{
    let items = [...cartItems]
    let index = items.findIndex(i=>i.id===item.id)
    if(index>-1){
      items[index]=item

    }
    else{
      items.push(item)
    }
    setCartItems([...items])
    // setCartItems(cartItems + 1)
  }
  const handleRemoveItem = item =>{
    let items = [...cartItems]
    let index = items.findIndex(i=>i.id===item.id)
    if(items[index].quantity===0){
      items.splice(index,1)
    }
    else{
      items[index]=item
    }
    setCartItems([...items])
    //setCartItems(cartItems - 1)
  }

  const handleEventQueue = (id,type) => {
    setEventQueue({
      id,
      type
    })
  }


  return (
      <div>
        <Header count={cartItems.length} items={cartItems} onHandleEvent={handleEventQueue}/>
        <Subheader/>
        <Switch>
          <Route path={"/:type(login|signup)"} exact>
            <AuthIndex/>
          </Route>
          <Route path={"/404"} exact>
            <h1>Not Found!</h1>
          </Route>
          <Route exact path="/:category?" >
            <Products onAddItem={handleAddItem} onRemoveItem={handleRemoveItem} eventState={eventQueue}/>
          </Route>
          <Redirect to={"/404"}></Redirect>
        </Switch>
      </div>
  );
}

export default App;