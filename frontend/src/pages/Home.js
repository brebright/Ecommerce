import React from 'react'
import CategoryList from '../components/CategoryList'
import BannerProduct from '../components/BannerProduct'
import HorizontalCardProduct from '../components/HorizontalCardProduct'
import VerticalCardProduct from '../components/VerticalCardProduct'
const Home = () => {
  return(
    <div>
      <BannerProduct />
      <CategoryList />
      <VerticalCardProduct category={"mobiles"} heading={"Mobiles"} />
      <VerticalCardProduct category={"earphones"} heading={"Earphones"} />
      <VerticalCardProduct category={"Mouse"} heading={"Mouse"} />     
      <HorizontalCardProduct category={"airpodes"} heading={"Airpodes"} />
      <HorizontalCardProduct category={"watches"} heading={"Watches"} />
      <VerticalCardProduct category={"televisions"} heading={"Televisions"} />
      <VerticalCardProduct category={"camera"} heading={"Camera & Photograph equipments"} />
      <VerticalCardProduct category={"speakers"} heading={"Bluetooth Speakers"} />
      {/* <VerticalCardProduct category={"Computers"} heading={"latest Computers"} /> */}
      <VerticalCardProduct category={"trimmers"} heading={"Trimmers"} />
    </div>
  )
}
export default Home

