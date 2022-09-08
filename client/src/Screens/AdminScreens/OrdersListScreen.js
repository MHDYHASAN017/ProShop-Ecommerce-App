import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllOrders } from '../../Redux/actions/AdminActions'
import Layout from '../../UI/Layout'


const OrdersListScreen = () => {

    const dispatch = useDispatch()
    const orderReducer = useSelector(state => state.orderReducers)

    console.log(orderReducer);

    useEffect(() => {
        dispatch(getAllOrders())
    },[])

  return (
    <Layout>OrdersListScreen</Layout>
  )
}

export default OrdersListScreen