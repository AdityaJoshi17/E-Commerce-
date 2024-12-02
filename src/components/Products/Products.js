import ListItem from "./ListItem/ListItem";
import {useEffect,useState} from "react";
import axios from "axios";
import Loader from "../UI/Loader";
import {useHistory, useLocation, useParams} from "react-router-dom";
const Products=({onAddItem, onRemoveItem, eventState})=>{
    // const [items,setItems]=useState([
    //     // {
    //     //     id:0,
    //     //     discountedPrice: 340,
    //     //     price: 450,
    //     //     title:"Title of the Item 1",
    //     //     thumbnail:"download.png"
    //     // },
    //     // {
    //     //     id:1,
    //     //     discountedPrice: 80,
    //     //     price: 180,
    //     //     title:"Title of the Item 2",
    //     //     thumbnail:"download.png"
    //     // },
    //     // {
    //     //     id:2,
    //     //     discountedPrice: 80,
    //     //     price: 180,
    //     //     title:"Title of the Item 3",
    //     //     thumbnail:"download.png"
    //     // },
    //     // {
    //     //     id:3,
    //     //     discountedPrice: 80,
    //     //     price: 180,
    //     //     title:"Title of the Item 4",
    //     //     thumbnail:"download.png"
    //     // }
    // ])
    const [items,setItems] = useState([])
    const [loader,setLoader] = useState(true)
    const params = useParams()
    const history = useHistory()
    const {search}=useLocation()
    const queryParams = new URLSearchParams(search).get("search")

    //const [presentItems,setPresentItems] = useState([])
    useEffect(() => {
        // const result = fetch(`https://e-commerce-website-32b71-default-rtdb.firebaseio.com/items.json`)
        //     .then(response=> response.json())
        //     .then(data => {console.log(data)
        //     })
        //     .catch(error => {
        //         console.log(error)
        //     })

        async function fetchItems(){
            try {
                let slug = `items.json`
                if (params.category){
                    slug =`items-${params.category}.json`

                }
                if(queryParams) {
                    slug += `?search=${queryParams}`
                }
                const response = await axios.get(`https://e-commerce-website-32b71-default-rtdb.firebaseio.com/${slug}`)
                const data = response.data

                if(!data){
                    handleNotFound();
                    return;
                }

                const transformedData = data.map((item, index) => {
                    return {
                        ...item,
                        quantity:0,
                        id: index
                    }
                })
                //setLoader(false)
                setItems(transformedData)
                // console.log(transformedData)
            }
            catch (error){
                //setLoader(false)
                console.log("Error:",error)
                alert("Some error occurred");
            }
            finally {
                setLoader(false)
            }
        }
        fetchItems();

        return()=>{
            setItems([])
            setLoader(true)
        }


    },[params.category,queryParams])

    useEffect(() => {
        if(eventState.id > -1){
            if(eventState.type === 1){
                handleAddItem(eventState.id)

            }
            else if(eventState.type === -1){
                handleRemoveItem(eventState.id)

            }
        }
    },[eventState])

    const handleAddItem = id => {
        //console.log(id)
        // if(presentItems.indexOf(id)>-1){
        //     return;
        // }
        // setPresentItems([...presentItems,id])
        // onAddItem();
        let data=[...items]
        let index = data.findIndex((i=>i.id===id))
        data[index].quantity+=1

        setItems([...data])
        onAddItem(data[index]);
    }

    const handleRemoveItem = id => {
        //console.log(id)
        //onRemoveItem();
        // let index = presentItems.indexOf(id)
        // if(index > -1) {
        //     let items = [...presentItems]
        //     items.splice(index, 1)
        //     setPresentItems([...items]);
        //     onRemoveItem();
        // }
        let data=[...items]
        let index = data.findIndex((i=>i.id===id))
        if(data[index].quantity === 0) {
            data[index].quantity-=1
        }
        setItems([...data])
        onRemoveItem(data[index]);
    }
    const updateItemTitle = async (itemId) => {
        console.log(`Item with ID: ${itemId}`)
        try {
            let title = `Update Title #Item-${itemId}`
            await axios.patch(`https://e-commerce-website-32b71-default-rtdb.firebaseio.com/items/${data.id}.json`, {
                title: title
            })
            let data = [...items]
            let index = data.findIndex(e => e.id === itemId)
            data[index]['title'] = title

            setItems(data)
        }
        catch(error) {
            console.log("Error Updating the data!");
        }
    }
    const handleNotFound = () => {
        history.push("/404")
    }
    return(
        <>
            <div className={"product-list"}>
                <div className={"product-list--wrapper"}>
                    {/*Hard coded cards made in the below code*/}
                    {/*<ListItem data={items[0]}></ListItem>*/}
                    {/*<ListItem data={items[1]}></ListItem>*/}
                    {/*    Below we have used the dynamic approach to make the cards*/}
                    {
                        items.map(item=>{
                            console.log(item)
                            return (<ListItem onAdd={handleAddItem} onRemove={handleRemoveItem} key={item.id} data={item} updateItemTitle={updateItemTitle} />)
                            // updateItemTitle={updateItemTitle} if u want to use update funtion then add this line in the above listitem
                        })
                    }
                    {/*{[<ListItem data={item[0]}/>,<ListItem data={item[1]}/>,<ListItem data={item[2]}/>]}*/}
                </div>
            </div>
            { loader && <Loader/>}
        </>
    )
}

export default Products