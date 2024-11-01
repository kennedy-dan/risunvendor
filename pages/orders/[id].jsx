import React from 'react'
import ContributorLayout from "@/components/ContributorLayout";

const OrderId = () => {
  return (
    <ContributorLayout title="Order details">
            <div>
                <p>Order details</p>

                <div className='flex space-x-6' >
                    <div>
                        <img src='/images/orddet.png' />
                    </div>
                    <div>
                        <p className='2F4858 text-[#2F4858] md:text-[36px] text-[17px] ' >Un-Laughing man Frame</p>
                        <p className='md:text-[20px] text-[16px] mt-6 text-blue-400' >₦22,500</p>

                        <div className='mt-6' >
                            <p className='md:text-[16px] text-[16px] uppercase text-gray-300'>Description</p>
                            <div className='flex md:space-x-20 md:text-[14px] text-[16px]' >
                                <div>
                                <p>Type: <span className='font-semibold text-[#2F4858]' >Painting</span></p>

                                </div>
                                <div>
                                <p>Paint Type: <span className='font-semibold text-[#2F4858]' >Painting</span></p>

                                </div>
                                
                            </div>

                            <div className='flex  md:space-x-20 md:text-[14px] text-[16px] mt-2' >
                                <div>
                                <p>Size: <span className='font-semibold text-[#2F4858]' >12 by 12ft</span></p>

                                </div>
                                <div>
                                <p>request: <span className='font-semibold text-[#2F4858]' >12 by 12ft</span></p>

                                </div>
                                
                            </div>
                        </div>

                        <div>
                            <p className='md:text-[16px] text-[16px] uppercase text-gray-300 mt-8'>Delivery Details</p>
                            <div className='flex md:space-x-20 md:text-[14px] text-[16px]' >
                                <div>
                                <p>Delivery address: <span className='font-semibold text-[#2F4858]' >asherifa, Ogun state</span></p>

                                </div>
                                <div>
                                <p>Phone: <span className='font-semibold text-[#2F4858]' >+234764767367</span></p>

                                </div>
                                
                            </div>

                            <div className='flex md:space-x-20 md:text-[14px] text-[16px] mt-3' >
                                <div>
                                <p>Size: <span className='font-semibold' >12 by 12ft</span></p>

                                </div>
                                <div>
                                <p>Email Address: <span className='font-semibold text-[#2F4858]' >risun@gmail.com</span></p>

                                </div>
                                
                            </div>

                            <div className='mt-12' >
                                <img src='/images/ordstat.png' alt='' />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    </ContributorLayout>
  )
}

export default OrderId