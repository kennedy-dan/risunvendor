import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import styles from "styles/contributor/signup.module.scss";

//PAYMENT IMPORTS
import { useDispatch, useSelector } from "react-redux";
import { flutterwaveConfig } from "utils/FlutterwaveConfig";
import {
  FlutterWaveButton,
  closePaymentModal,
  useFlutterwave,
} from "flutterwave-react-v3";
import { checkoutCanvasAsset, clearCheckout } from "store/slice/assetSlice";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import { countryList } from "utils/listOfCountry";
import { PaystackButton } from "react-paystack";
import { payStackConfig } from "utils/paystackConfig";

const DeliveryModal = ({
  open,
  setopen,
  type,
  uploadImg,
  croppedImg,
  print,
  canvasSize,
}) => {
  const closeModal = () => {
    setopen(false);
    dispatch(clearCheckout());
  };
  const [location, setlocation] = useState(null);
  const [address, setAddress] = useState("");
  const [state, setState] = useState("");
  const [data, setData] = useState([]);
  const getData = async () => {
    const { data } = await axios.get(
      `https://api.myartstocks.com/deliveries/destinations`
    );
    setData(data);
  };

  useEffect(() => {
    getData();
  }, []);

  const customStyle = {
    control: (baseStyles, state) => ({
      ...baseStyles,

      padding: "10px 10px",
      backgroundColor: "#F0F0F0",
      borderRadius: "30px",
    }),
  };

  const selectLocation = (cate) => {
    setlocation(cate);
  };
  const selectState = (cate) => {
    setState(cate);
  };

  //PAYMENT  FUNCTIONS
  const dispatch = useDispatch();
  const { frameImg, checkoutDetails } = useSelector((state) => state.assets);
  const [processing, setProcessing] = useState("idle");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [beginPayment, setBeginPayment] = useState(false);
  const { user } = useSelector((state) => state.auth);



  let image_url = print?.meta?.images?.[0]?.public_url
    ? print?.meta?.images?.[0]?.public_url
    : frameImg?.assets?.url;

  let finalData = {
    asset_id: print?.id,
    sub_purchase: false,
    image_public_id: frameImg.assets?.public_id,
    image_url,
    size_id: canvasSize?.id,
    phone_number: user.phone_number,
    gender: user.gender,
    street: street,
    city: city,
    state: state.value,
    country: "Nigeria",
    print_type: "canvas",
    // address: address,
    purchase_print: 1,
    address_id: location?.value?.address_id,
    asset_will_be_delivered: true,
  };

  let image = print ? print?.meta?.images?.[0]?.public_url : croppedImg;

  const paymentHandler = async () => {
    if (!state) {
      toast.error("Please select a state");
      return;
    }

    if (!canvasSize) {
      toast.error("Please select a canvas size");
      return;
    }
    setProcessing(true);
    dispatch(checkoutCanvasAsset(finalData));
  };

  useEffect(() => {
    if (checkoutDetails.canvasResult?.transaction?.remarks) {
      setProcessing(false);
    }
  }, [checkoutDetails]);





  // let stateList = countryList?.countries?.filter((countries) => {
  // 	return countries.country.toLowerCase() == country.toLowerCase();
  // });

  let stateList = countryList?.countries?.filter((countries) => {
    return countries.country === "Nigeria";
  });

  const pd = checkoutDetails.canvasResult?.order?.map(orderDetails => orderDetails.order_items?.map(amount => amount))

  const npd = pd?.map(amount => amount)

  const tt = npd?.map(ttr => ttr.id)
  console.log(tt)

  console.log(npd)
  console.log(pd)

  function getAssetAmounts(npd) {
    let amounts = [];
    npd?.forEach(subArray => {
        subArray.forEach(item => {
            if (item.asset && item.asset.amount) {
                amounts.push(item.asset.amount.replace(',', ''));
            }
        });
    });
    return amounts;
}

let assetAmounts = getAssetAmounts(npd);
console.log(assetAmounts);

  // console.log(checkoutDetails.canvasResult?.order)
  // console.log(checkoutDetails)

 const finalPrice =  assetAmounts.reduce((acc, curr) => acc + parseFloat(curr), 0) + parseFloat(checkoutDetails.canvasResult?.order[0]?.order?.delivery_fee)
 console.log(finalPrice)

 let customDetails = {
  title: "Shop Print",
  description: "Puchase a shop print",
  tx_ref: checkoutDetails.canvasResult?.transaction?.tx_ref,
  amount: finalPrice,
  remarks: checkoutDetails.canvasResult?.transaction?.remarks,
};

 const payConfig = payStackConfig(
  user,
  closePaymentModal,
  customDetails
)


  return (
    <div
      className={
        " fixed overflow-y-auto z-10 bg-gray-900 bg-opacity-25 inset-0 transform ease-in-out " +
        (open
          ? " transition-opacity flex justify-center opacity-100 duration-500 translate-x  "
          : " transition-all delay-500 opacity-0 translate-x-full ")
      }
      id="defaultModal"
      tabIndex="-1"
      aria-hidden="true"
    >
      <div className="absolute flex items-center justify-center h-screen px-4 pt-4 pb-20  text-center items-en sm:p-0 ">
        <div className="inline-block align-bottom bg-white   rounded-2xl text-left shadow-xl transform transition-all sm:my-8 sm:align-middle max-w-[42rem] md:max-w-[70rem] lg:max-w-[103rem] w-screen">
          <div className="flex justify-end px-20 py-10 cursor-pointer">
            <img src="/images/cancelModal.png" onClick={closeModal} />
          </div>
          <div className="justify-between w-full px-10 py-20 md:flex md:items-center md:px-16 lg:px-32">
            <div className="md:w-[47%]">
              <p className="font-bold md:text-5xl text-4xl pb-10 text-[#2F4858]">
                Delivery Location
              </p>
              {/* <p className="mb-1 text-2xl font-bold md:text-3xl">
								A Triumphant Entry
							</p>
							<div className="flex items-center mt-2 text-xl font-semibold md:text-2xl">
								<p>16 X 20</p>
								<div className="bg-[#B20021] h-2 mx-6 w-2 rounded-full"></div>
								<p>Gold Frame</p>
							</div> */}

              <div className={`${styles.dropdown}`}>
                <p className="mb-3 text-2xl font-bold lg:mt-10 md:mt-10 md:text-3xl">
                  State:{" "}
                </p>
                <Select
                  styles={customStyle}
                  id="state"
                  placeholder=""
                  options={stateList?.[0].states?.map((state) => ({
                    value: state,
                    label: state,
                  }))}
                  //   value={[
                  //     {
                  //       value: user?.state,
                  //       label: state,
                  //     },
                  //   ]}
                  isLoading={!user}
                  onChange={(e) => {
                    selectState(e);
                  }}
                  isClearable
                  classNamePrefix="react-select"
                />
              </div>
              <div>
                <p className="mb-3 text-2xl font-bold lg:mt-10 md:mt-10 md:text-3xl">
                  City
                </p>
                <div className="">
                  <input
                    styles={customStyle}
                    placeholder="City"
                    className="rounded-[30px] bg-[#F0F0F0] px-[15px] py-[15px] w-full"
                    value={city}
                    type=""
                    onChange={(e) => setCity(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <p className="mb-3 text-2xl font-bold lg:mt-10 md:mt-10 md:text-3xl">
                  Street
                </p>
                <div className="">
                  <input
                    styles={customStyle}
                    placeholder="Address"
                    className="rounded-[30px] bg-[#F0F0F0] px-[15px] py-[15px] w-full"
                    value={street}
                    type="address"
                    onChange={(e) => setStreet(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="md:w-[47%] md:mt-0 mt-10">
              <img src="/images/maps.png" />

              {location && (
                <>
                  <p className="mt-6 font-bold text-black text:2xl md:text-3xl">
                    Address
                  </p>
                  <p className="text-lg">{`  ${location?.value?.address?.street} ${location?.value?.address?.city} ${location?.value?.address?.state}
									
											`}</p>
                </>
              )}

              {checkoutDetails.canvasResult && (
                <>
                  <p className="font-bold mt-4 text-black">purchased Amount</p>
                  {checkoutDetails.canvasResult?.order.map((amount) => (
                    <p className="text-[#B20021]">
                      ₦{amount?.order_items?.map(orderItems => orderItems?.asset?.amount)}
                    </p>
                  ))}
                </>
              )}

              {checkoutDetails.canvasResult && (
                <>
                  <p className="font-bold mt-4 text-black">Delivery fee</p>
                  {checkoutDetails.canvasResult?.order.map((deliveryFee) => (
                    <p className="text-[#B20021]">
                      ₦{deliveryFee?.order?.delivery_fee}
                    </p>
                  ))}
                </>
              )}

              {checkoutDetails.canvasResult && (
                <>
                  <p className="mt-4 font-bold text-black">Total fee</p>
                  <p className="text-[#B20021]">
                    ₦
                    {assetAmounts.reduce((acc, curr) => acc + parseFloat(curr), 0) + parseFloat(checkoutDetails.canvasResult?.order[0]?.order?.delivery_fee)}
                  </p>
                </>
              )}

              {(processing === "idle" || processing == true) && (
                <button
                  className="w-full bg-[var(--primaryColor)] text-white mt-10 py-4 rounded-full"
                  onClick={paymentHandler}
                >
                  {processing == true && "Processing..."}{" "}
                  {processing == true ? (
                    <ClipLoader color="white" size={15} />
                  ) : (
                    "Buy"
                  )}
                </button>
              )}

              {processing === false && (
                <button className="w-full bg-[var(--green)] text-white mt-10 py-4 rounded-full">
                  <PaystackButton
                    text="Click to Make Payment"
                    {...payConfig}
                  />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryModal;

// <div className={`${styles.dropdown} mb-10`}>
// <Select
//   styles={customStyle}
//   id="location"
//   placeholder="location"
//   options={data?.data?.map((location) => ({
// 	value: location,
// 	label:
// 	  location?.address.street +
// 	  "," +
// 	  location?.address.city +
// 	  " " +
// 	  location?.address.state,
//   }))}
//   isSearchable
//   onChange={(e) => {
// 	selectLocation(e);
//   }}
//   isClearable
//   classNamePrefix="react-select"
// />
// </div>
