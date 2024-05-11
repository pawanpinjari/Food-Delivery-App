import { Fragment, useState } from 'react'
import Cart from './Cart'
import "./style.css"
import { useNavigate } from "react-router-dom"
import { BiRupee } from 'react-icons/bi';
import { BsFillCartPlusFill } from 'react-icons/bs';
import Navbar from './Navbar';
import { useSelector, useDispatch } from 'react-redux';
import { setCart } from '../Redux/Actions/index';

const MenuCard = ({ menuData, restId }, props) => {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const [btn, setBtn] = useState(false)
    const [apiData, setapiData] = useState(menuData)
    const loginStatus = useSelector(state => state.isLoggedIn);

    const onOrder = (_id, name, price, image) => {
        dispatch(setCart(_id, name, price, image, 1));
        setBtn(true)
    }
    const onCart = () => {
        const state = {
            restId: restId,
        };
        if (loginStatus === true) {

            navigate("/cart", { state: state })
        }
        else {
            alert("login first")
        }
    }

    const uniqueList = ["All",
        ...new Set(menuData.map((curElem) => curElem.category)),

    ];


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
            <div className='menu-box'>
                <div className='menu-side'>
                    <Navbar filterItem={filterItem} menuList={uniqueList} />
                </div>
                <div className='menu-content1'>
                    <p className='menu-title h1-container'>All Products</p>
                    <section className='menu-container'>
                        {apiData.map((curElem, i) => {
                            const { _id, name, description, image, price } = curElem;
                            return (
                                <Fragment key={i}>
                                    <div className='card-menu' >
                                        <div className='menu-content'>
                                            <img src={`${image}`} alt="images" className='card-media1' />
                                        </div>
                                        <div className='' >
                                            <div className='card-header '>
                                                <div className='card-title'> {name}</div>
                                                <div className='menu-price subtile'><BiRupee />{price}</div>
                                            </div>
                                            <div  className='card-desc'>
                                                {description}
                                                   

                                            </div>
                                            <div className=''>
                                                
                                                <button className='menu-btn ' onClick={() => onOrder(_id, name, price, image)}>Add to Cart</button>
                                            </div>

                                        </div>
                                    </div>
                                    <div className='card-menu' >
                                        <div className='menu-content'>
                                            <img src={`${image}`} alt="images" className='card-media1' />
                                        </div>
                                        <div className='' >
                                            <div className='card-header '>
                                                <div className='card-title'> {name}</div>
                                                <div className='menu-price subtile'><BiRupee />{price}</div>
                                            </div>
                                            <div  className='card-desc'>
                                                {description}
                                                   

                                            </div>
                                            <div className=''>
                                                
                                                <button className='menu-btn ' onClick={() => onOrder(_id, name, price, image)}>Add to Cart</button>
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
                btn && <button className='cart' onClick={onCart}><BsFillCartPlusFill /></button>
            }
        </>
    )
}

export default MenuCard
