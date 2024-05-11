import React from 'react'
import { Fragment } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaLocationDot } from "react-icons/fa6";
import { setRest,setCart} from '../Redux/Actions/index';
import { useSelector, useDispatch } from 'react-redux';

const Restaurants = ({ menuData}) => {
    const dispatch = useDispatch();
    const history = useNavigate();
    const restId = useSelector(state => state.restId);
    const onAlert = (id) => {
        if(restId==null){
            dispatch(setRest(id))
            history("/menuData",{state:{id}})
        }
        else if(restId!=id){
            dispatch(setCart(null))
            dispatch(setRest(id))
            history("/menuData",{state:{id}})
        }
        else{
            dispatch(setRest(id))
            history("/menuData",{state:{id}})
        }
    }
    return (
        <div>
            <div className='top-container'>
            <hr />
                <h2 className='h1-container'>Top Retaurants in Pune</h2> 
                <div className=' top-rest'>
                    {menuData.map((curData, i) => {
                        const { _id, name, image, addr } = curData;
                        return (
                            <div key={i} onClick={() => { onAlert(_id) }}>
                                <div className='card1 ' >
                                    <div >
                                        {/* <img src= {image} alt="images" className='card-media' /> */}
                                        <img src={`./images/${image}`} alt="images" className='card-media' />
                                    </div>
                                    <div className='card-body'>
                                        <div className='card-title'> {name}</div>
                                        <div className='card-city'><FaLocationDot className='loc-icon'/>{addr}</div>
                                    </div>
                                </div>
                            </div>
                        )
                    })

                    }
                </div>
            </div>
<hr />
                <h2 className='h1-container'>All Food Deliver Retaurants in Pune</h2>
            <section className='main-card--container'>
                {menuData.map((curElem, i) => {
                    const { _id, name, desc, image, addr } = curElem;
                    return (
                        <Fragment key={i}>
                            <div className='card-container ' onClick={() => { onAlert(_id) }}>
                                <div className='card' >
                                    <div >
                                        {/* <img src={image} alt="images" className='card-media' /> */}
                                        <img src={`./images/${image}`} alt="images" className='card-media' />
                                    </div>
                                    <div className='card-body'>
                                        <div className='card-title'> {name}</div>
                                        <div className='card-city'><FaLocationDot className='loc-icon'/>{addr}</div>
                                    </div>
                                    <div>
                                        <span className='card-description subtile'>{desc}</span>
                                    </div>


                                </div>
                            </div>

                        </Fragment>
                    )
                })}
            </section>
        </div>
    )
}

export default Restaurants
