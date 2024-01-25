import { Fragment, useState } from 'react'
import Cart from './Cart'
import "./style.css"
import { useNavigate } from "react-router-dom"
import { BiRupee } from 'react-icons/bi';
import { BsFillCartPlusFill } from 'react-icons/bs';
import Navbar from './Navbar';

const MenuCard = ({ menuData,LogData,Login,restName }, props) => {
    const navigate = useNavigate();
    const [cart, setCart] = useState([])
    const [btn, setBtn] = useState(false)
    const [apiData, setapiData] = useState(menuData)
    const uniqueList = ["All",
        ...new Set(menuData.map((curElem) => curElem.category)),

    ];
    console.log(uniqueList)
    
    const onOrder = (id,name, price, image) => {
        setCart((prevCart) => {
            return [
                ...prevCart,
                {   
                    id:id,
                    name: name,
                    price: price,
                    image: image,
                    quantity:1,
                }
            ]
        })
        setBtn(true)
    }
    const onCart = () => {
        const state = {
            restName:restName,
            cart: cart,
            Login: Login,
            LogData: LogData
          };
        if(Login===true){
            
            navigate("/cart", { state: state })
        }
        else{
            alert("login first")
        }
    }

    const filterItem = (category) => {
        if (category == "All") {
            setapiData(menuData);

            return;

        }

        const updatedList = menuData.filter((curElem) => {
            return curElem.category === category;
        });

        setapiData(updatedList);
    };


    return (
        <>
            <div className='menucard-container'>
                <div className='sidebar'>
                    <Navbar filterItem={filterItem} menuList={uniqueList} />
                </div>
                <div>
                    <section className='menu-container'>
                        {apiData.map((curElem, i) => {
                            const { id, name, description, image, price } = curElem;
                            return (
                                <Fragment key={i}>
                                    <div className='card-menu' >
                                        <div className='menu-content'>
                                            <img src={`./images/${image}`} alt="images" className='card-media' /> 
                                           
                                        </div>
                                        <div className='' >
                                            <div className=''>
                                            <span className='card-title'> {name}</span>

                                            </div>
                                            <div  >
                                                {description}
                                                
                                            </div>
                                            <div className=''>
                                            <span  className='menu-price subtile'>{price}<BiRupee /></span>
                                            <button className='menu-btn .card-author ' onClick={() => onOrder(id,name, price, image)}>Add to Cart</button>
                                            </div>

                                        </div>
                                    </div>

                                </Fragment>
                            )
                        })}
                    </section>
                </div>
            </div>

            {
                btn && <button className='cart' onClick={onCart}><BsFillCartPlusFill/></button>
            }

        </>
    )
}

export default MenuCard
