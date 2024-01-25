import React from 'react'
import { Fragment } from 'react'
import { useNavigate } from 'react-router-dom'

const Restaurants = ({ menuData,LogData, Login }) => {
    const history = useNavigate();
    console.log(menuData)
    const onAlert = (name) => {
        history("/menuData",{state:{name,LogData,Login}})
    }
    return (
        <div>
            <div className='top-container'>
            <hr />
                <h1 className='h1-container'>Top Retaurants in Pune</h1> <hr />
                <div className=' top-rest'>
                    {menuData.map((curData, i) => {
                        const { _id, name, desc, image, addr } = curData;
                        return (
                            <div key={i}>
                                <div className='card1 ' >
                                    <div >
                                        <img src={`./images/${image}`} alt="images" className='card-media' />
                                    </div>
                                    <div className='card-body'>
                                        <div className='card-title'> {name}</div>
                                        <div className='card-city'>{addr}</div>
                                    </div>
                                </div>
                            </div>
                        )
                    })

                    }
                </div>
            </div>
<hr />
                <h1 className='h1-container'>All Food Deliver Retaurants in Pune</h1>
            <section className='main-card--container'>
                {menuData.map((curElem, i) => {
                    const { _id, name,email, desc, city, image, addr } = curElem;
                    return (
                        <Fragment key={i}>
                            <div className='card-container ' onClick={() => { onAlert(name) }}>
                                <div className='card ' >
                                    <div >
                                        <img src={`./images/${image}`} alt="images" className='card-media' />
                                    </div>
                                    <div className='card-body'>
                                        <div className='card-title'> {name}</div>
                                        <div className='card-city'>{addr}</div>
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
