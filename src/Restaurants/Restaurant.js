import React, { useEffect, useState } from 'react'
import NavRest from './NavRest'
import { useLocation } from 'react-router-dom'
import "./Restaurant.css"
import Addproduct from './Addproduct'
import Allproduct from './Allproduct'
import Rec_order from './Rec_order'
import Confirm_order from './Confirm-order'
import Cancel_order from './Cancel-order'

const Restaurant = () => {
  const location = useLocation()
  const [navData, setNavData] = useState("rec_order")
  const [name, setName] = useState("")
  const [view, setView] = useState(false)


  useEffect(() => {

    setView(true)
    location.state?.data.map((e) => {
      setName(e.name)
    })
  }, [])
  const Nav_Content = (e) => {
    setNavData(e)
  }

  return (
    <div className='restaurant'>
      <NavRest Nav_Content={Nav_Content} ></NavRest>
      {
        view && <div >
          {

            navData === "rec_order" ? (
              <Rec_order name={name} ></Rec_order>

            ) :
            navData === "confirm-order" ? (
              <Confirm_order></Confirm_order>
            ) :
            navData === "cancel-order" ? (
            <Cancel_order />
            ) :
              navData === "add" ? (
                <Addproduct Name={name} />
              ) :
                (
                  <Allproduct Name={name} />
                )}
        </div>
      }
    </div>


  )
}

export default Restaurant
