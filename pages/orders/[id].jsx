import React, { useEffect } from "react";
import ContributorLayout from "@/components/ContributorLayout";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { orderinfoId } from "@/store/slice/dashboardSlice";

const OrderId = () => {
  const router = useRouter();
  const { orderId } = useSelector((state) => state.dashboard);
  const { id } = router.query;
  const dispatch = useDispatch();
  useEffect(() => {
    if (id) {
      dispatch(orderinfoId(id));
    }
  }, [id]);

  console.log(orderId.data, "orderId data");

  const orderItems = orderId?.data?.data?.order_items || [];

  console.log(orderItems, "orderItems");

  return (
    <ContributorLayout title="Order details">
      <div>
        <p>Order details</p>
        {orderItems.length > 0 && (
          <div className="flex space-x-6">
            <div>
              <img src="/images/orddet.png" />
            </div>
            <div>
              <p className="2F4858 text-[#2F4858] md:text-[36px] text-[17px] ">
                Un-Laughing man Frame
              </p>
              <p className="md:text-[20px] text-[16px] mt-6 text-blue-400">
                ₦22,500
              </p>

              <div className="mt-6">
                <p className="md:text-[16px] text-[16px] uppercase text-gray-300">
                  Description
                </p>
                <div className="flex md:space-x-20 md:text-[14px] text-[16px]">
                  <div>
                    <p>
                      Type:{" "}
                      <span className="font-semibold text-[#2F4858]">
                        Painting
                      </span>
                    </p>
                  </div>
                  <div>
                    <p>
                      Paint Type:{" "}
                      <span className="font-semibold text-[#2F4858]">
                        Painting
                      </span>
                    </p>
                  </div>
                </div>

                <div className="flex  md:space-x-20 md:text-[14px] text-[16px] mt-2">
                  <div>
                    <p>
                      Size:{" "}
                      <span className="font-semibold text-[#2F4858]">
                        12 by 12ft
                      </span>
                    </p>
                  </div>
                  <div>
                    <p>
                      request:{" "}
                      <span className="font-semibold text-[#2F4858]">
                        12 by 12ft
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <p className="md:text-[16px] text-[16px] uppercase text-gray-300 mt-8">
                  Delivery Details
                </p>
                <div className="flex md:space-x-20 md:text-[14px] text-[16px]">
                  <div>
                    <p>
                      Delivery address:{" "}
                      <span className="font-semibold text-[#2F4858]">
                        asherifa, Ogun state
                      </span>
                    </p>
                  </div>
                  <div>
                    <p>
                      Phone:{" "}
                      <span className="font-semibold text-[#2F4858]">
                        +234764767367
                      </span>
                    </p>
                  </div>
                </div>

                <div className="flex md:space-x-20 md:text-[14px] text-[16px] mt-3">
                  <div>
                    <p>
                      Size: <span className="font-semibold">12 by 12ft</span>
                    </p>
                  </div>
                  <div>
                    <p>
                      Email Address:{" "}
                      <span className="font-semibold text-[#2F4858]">
                        risun@gmail.com
                      </span>
                    </p>
                  </div>
                </div>

                <div className="mt-12">
                  <img src="/images/ordstat.png" alt="" />
                </div>
              </div>
            </div>
          </div>
        )}

           {orderItems?.map((items, index) => (
              <div key={index} className="flex justify-between  ">
                {items?.product_type === "Asset" && (
                  <>
                    <div className="flex h-full  mb-[70px] ">
                      <div className="w-[5]">
                        <img
                          src={items?.asset?.meta?.images[0]?.public_url}
                          className="w-[390px] h-[403px] bg-cover "
                          alt=""
                        />
                      </div>

                      <div className="ml-8">
                        <p className="text-[18px] font-bold">
                          {items?.asset?.title}
                        </p>
                        <div>
                          <p className="text-[16px] mt-4 text-gray-700">
                            Category : {items?.asset?.meta?.category}
                          </p>
                        </div>
                        <div className='mt-4' > 
                          {orderId?.data?.data?.status === "paid" ? (
                            <div className="flex space-x-3  items-center">
                              <div>
                                <img src="/images/successch.png" />
                              </div>
                              <p className="text-[16px] text-gray-700">
                                Successful
                              </p>
                            </div>
                          ) : (
                            <p className="text-[16px] mt-4 text-gray-700">
                              status: {orderId?.data?.data?.status}
                            </p>
                          )}
                        </div>
                        {/* <div>
                          <p className="text-[16px] mt-4 text-gray-700">
                            Author
                          </p>
                        </div> */}
                        {/* <div>
                          <p className="text-[16px] mt-4 text-gray-700">
                            Photo Area
                          </p>
                        </div>
                        <div>
                          <p className="text-[16px] mt-4 text-gray-700">
                            Mat Style
                          </p>
                        </div> */}
                        {/* 
                        <div className="flex  items-center pt-[218px]">
                          <img src="/images/sub.png" alt="" />
                          <p className="text-black font-bold px-4 text-[13px]">
                            1
                          </p>
                          <img src="/images/add.png" alt="" />
                        </div> */}
                      </div>
                    </div>
                    <div className="text-right   ">
                      <p className="text-[18px] font-bold">
                        N{items?.asset?.pricing}
                      </p>
                    </div>
                  </>
                )}
                {items?.product_type === "Print" && (
                  <>
                    <div className="flex h-full">
                      <img
                        src={items?.deliverable_item_details[0]?.image_url}
                        className="w-[390px] h-[403px] bg-cover"
                        alt=""
                      />
                      <div className="pl-4">
                        <p className="text-[18px] font-bold">
                          {items?.canvas?.title}
                        </p>
                        <div>
                          <p className="text-[16px] mt-4 text-gray-700">
                            Print Size :{" "}
                            {items?.deliverable_item_details[0]?.size?.height +
                              " * " +
                              items?.deliverable_item_details[0]?.size?.width}
                          </p>
                        </div>
                        <div>
                          <p className="text-[16px] mt-4 text-gray-700">
                            Print Type : {items?.canvas?.type}
                          </p>
                        </div>
                        <div className='mt-4' > 
                          {orderId?.data?.data?.status === "paid" ? (
                            <div className="flex space-x-3  items-center">
                              <div>
                                <img src="/images/successch.png" />
                              </div>
                              <p className="text-[16px] text-gray-700">
                                Successful
                              </p>
                            </div>
                          ) : (
                            <p className="text-[16px] mt-4 text-gray-700">
                              status: {orderId?.data?.data?.status}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-[18px] font-bold">
                        {items?.purchase_price}
                      </p>
                    </div>
                  </>
                )}
                {items?.product_type === "Frame" && (
                  <>
                    <div className="flex h-full mt-8">
                      <div className="">
                        <div className="relative">
                          {items?.frame?.title === "Black frame" && (
                            <img
                              src={"/images/frames1.png"}
                              className={`w-[390px] h-[403px]  `}
                            />
                          )}

                          {items?.frame?.title === "Gold Frame" && (
                            <img
                              src={"/images/goldframe.png"}
                              className={`w-[390px] h-[403px]  `}
                            />
                          )}

                          {items?.frame?.title === "White Frame" && (
                            <img
                              src={"/images/whiteframe.png"}
                              className={`w-[390px] h-[403px]  `}
                            />
                          )}

                          <div className="absolute z-10 top-[4%] left-[6%]  ">
                            <img
                              src={
                                items?.deliverable_item_details[0]?.image_url
                              }
                              className="w-[348px] h-[371px] bg-cover"
                              alt=""
                            />
                          </div>
                        </div>
                      </div>

                      <div className="pl-4">
                        <p className="text-[18px] font-bold">
                          {items?.frame?.title}
                        </p>
                        <div>
                          <p className="text-[16px] mt-4 text-gray-700">
                            Frame Size :{" "}
                            {items?.deliverable_item_details[0]?.size?.height +
                              " * " +
                              items?.deliverable_item_details[0]?.size?.width}
                          </p>
                        </div>
                        <div>
                          <p className="text-[16px] mt-4 text-gray-700">
                            Style : Frame
                          </p>
                        </div>
                        <div className='mt-4' > 
                          {orderId?.data?.data?.status === "paid" ? (
                            <div className="flex space-x-3  items-center">
                              <div>
                                <img src="/images/successch.png" />
                              </div>
                              <p className="text-[16px] text-gray-700">
                                Successful
                              </p>
                            </div>
                          ) : (
                            <p className="text-[16px] mt-4 text-gray-700">
                              status: {orderId?.data?.data?.status}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-[18px] font-bold">
                        {items?.purchase_price}
                      </p>
                    </div>
                  </>
                )}
                {items?.product_type === "Canvas" && (
                  <>
                    <div className="flex h-full mb-[200px] mt-[100px] w-full justify-between ">
                      <div className="">
                        <div className="relative ">
                          <div className="imgconta  ">
                            <img
                              src={
                                items?.deliverable_item_details[0]?.image_url
                              }
                              className="imgg"
                              alt="Dynamic"
                            />
                            <style jsx>{`
                              .imgconta {
                                position: absolute;
                                top: -13px;
                                left: 75px;
                                width: 210px;
                                height: 243px;
                              }

                              .imgg {
                                position: absolute;
                                display: block;
                                width: 210px;
                                height: 243px;
                                transform: rotate(-15deg) skew(16deg)
                                  translate(0, 0);
                                transition: 0.5s;
                                box-shadow: -20px 20px 10px rgba(0, 0, 0, 0.5);
                              }

                              .imgconta::before {
                                content: "";
                                position: absolute;
                                top: 33px;
                                left: -12px;
                                height: 103%;
                                width: 20px;
                                transform: rotate(-31deg) skewY(-30deg);
                                background: url(${items
                                    ?.deliverable_item_details[0]?.image_url})
                                  no-repeat center center;
                                background-size: cover;
                                transition: 0.5s;
                              }

                              .imgconta::after {
                                content: "";
                                position: absolute;
                                bottom: -4px;
                                left: 91px;
                                width: 71%;
                                height: 20px;
                                transform: rotate(30deg) skewY(-45deg);
                                background: url(${items
                                    ?.deliverable_item_details[0]?.image_url})
                                  no-repeat center center;
                                background-size: cover;
                                transition: 0.5s;
                              }
                            `}</style>
                          </div>
                        </div>
                      </div>

                      <div className="w-[64%] ">
                        <p className="text-[18px] font-bold">
                          {items?.canvas?.title}
                        </p>
                        <div>
                          <p className="text-[16px] mt-4 text-gray-700">
                            Frame Size :{" "}
                            {items?.deliverable_item_details[0]?.size?.height +
                              " * " +
                              items?.deliverable_item_details[0]?.size?.width}
                          </p>
                        </div>
                        <div>
                          <p className="text-[16px] mt-4 text-gray-700">
                            Style: {items?.canvas?.type}
                          </p>
                        </div>
                        <div className='mt-4' > 
                          {orderId?.data?.data?.status === "paid" ? (
                            <div className="flex space-x-3  items-center">
                              <div>
                                <img src="/images/successch.png" />
                              </div>
                              <p className="text-[16px] text-gray-700">
                                Successful
                              </p>
                            </div>
                          ) : (
                            <p className="text-[16px] mt-4 text-gray-700">
                              status: {orderId?.data?.data?.status}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="text-right mb-[200px] mt-[100px]">
                      <p className="text-[18px] font-bold">
                        {items?.purchase_price}
                      </p>
                    </div>
                  </>
                )}
              </div>
            ))}
      </div>
    </ContributorLayout>
  );
};

export default OrderId;
