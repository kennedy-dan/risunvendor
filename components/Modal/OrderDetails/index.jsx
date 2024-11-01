import React from "react";

export default function OrderDetails({ details }) {
  const { order_items, order } = details;
  const image = order_items?.[0]?.asset?.image?.public_url;
  const title = order_items?.[0]?.asset?.title;
  const category = order_items?.[0]?.asset?.category;
  const subCategory = order_items?.[0]?.asset?.subCategory;
  const assetprice = parseFloat(order_items?.[0]?.purchase_amount);
  const deliveryPrice = parseFloat(order?.delivery_fee);
  const price = assetprice + deliveryPrice;

  const totalPrice = assetprice + deliveryPrice;
  const orderNum = order?.sku;
  const dateSplit = order?.completed_at?.split(" ");
  const orderDate = dateSplit?.[0];
  const orderTime = dateSplit?.[1];
  return (
    <section className="lg:w-[93%] md:w-[93%] w-full mt-10 mx-auto">
      <section className="flex  gap-x-2">
        <div className="w-[40%]">
          <img src={image} alt="title" className="w-[100%] rounded-lg" />
        </div>

        <div className="bg-[#F6F8FC] text-left rounded-lg w-[60%] p-7 ">
          <p className="text-[#2F4858] lg:text-4xl md:text-4xl text-2xl font-semiibold ">
            {title}
          </p>

          <p className="pt-4 text-lg font-semibold">Category: {category}</p>
          <p className="pt-1 text-lg font-semibold">
            Sub-category: {subCategory}
          </p>
        </div>
      </section>

      <section className="  ">
        <p className="mt-4 text-[var(--grey)] lg:text-lg md:text-lg text-sm ">
          INVOICE DETAILS
        </p>
        <div className="flex justify-between shadow-sm lg:px-8 md:px-8 mx-1 rounded-lg py-4">
          <div className="flex flex-col">
            <h4 className="text-[var(--grey)] text-lg ">Invoice Number:</h4>
            <p className="text-black font-semibold lg:text-lg md:text-lg text-sm mt-1">
              {orderNum}
            </p>
          </div>

          <div className="flex flex-col">
            <h4 className="text-[var(--grey)] text-lg ">Date of purchase:</h4>
            <p className="text-black font-semibold lg:text-lg md:text-lg text-sm mt-1">
              {orderDate}
            </p>
          </div>

          <div className="flex flex-col">
            <h4 className="text-[var(--grey)] text-lg ">Time of purchase:</h4>
            <p className="text-black font-semibold lg:text-lg md:text-lg text-sm mt-1">
              {orderTime}
            </p>
          </div>
        </div>
      </section>

      <section className="mt-4">
        <div className="flex justify-between text-[#2F4858] text-lg py-4 ">
          <h4 className="w-[40%]">CATEGORY</h4>

          <h4 className="w-[30%] ">QTY</h4>
          <h4 className="w-[30%] ">PRICE</h4>
          <h4 className="w-[30%] ">TOTAL</h4>
        </div>

        <div className="flex font-semibold justify-between bg-[#EBEFF6] text-lg py-8 rounded-lg px-4 text-center">
          <p className="w-[40%] text-left">{category}</p>
          <p className="w-[30%] text-left">1</p>
          <p className="w-[30%] text-left">₦{price}</p>
          <p className="w-[30%] text-left">₦{totalPrice}</p>
        </div>
      </section>

      <div className="flex  justify-end mt-4">
        <div className="flex flex-col ">
          <p className="text-sm flex  justify-end">TOTAL AMOUNT:</p>
          <p className="text-[2.5rem] font-bold text-[#2F4858] flex  justify-end">
            ₦{totalPrice}
          </p>
        </div>
      </div>
    </section>
  );
}
