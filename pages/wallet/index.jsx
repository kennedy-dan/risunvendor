import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { _getContributorData } from "store/slice/contributorSlice";
import { confirmOtp, resendOtp } from "@/services/contributor";
import { LineChart, BarChart } from "@/components/Charts";
import { MoonLoader } from "react-spinners";
import { toast } from "react-toastify";
import axios from "axios";
import { dashboardinfo } from "@/store/slice/dashboardSlice";

import useSWR from "swr";
import NoImagePlaceholder from "@/public/svgs/no-image-placeholder.svg";
import ContributorLayout from "@/components/ContributorLayout";
import Image from "next/image";
import OTPInput from "react-otp-input";
import Info from "@/components/Info";
import Modal from "@/components/Modal";
import styles from "@/styles/contributor/content/earnings.module.scss";
import {
  withdrawreq
} from "@/store/slice/dashboardSlice";
export default function Index() {
  const dispatch = useDispatch();
//   const { data, loading } = useSelector((state) => state.contributor);
let data
let loading 
  const [otp, setOtp] = useState("");
  const [transactionRef, setTransactionRef] = useState("");
  const [balance, setWalletBalance] = useState("");
  const [initializeOtp, setInitializeOtp] = useState(false);
  const { info } = useSelector((state) => state.dashboard);

  const [activeTab, setActiveTab] = useState("earnings");
  const [modalDisplay, setModalDisplay] = useState(false);
  const [amount, setAmount] = useState("");
  const getWithdrawalHistory = (url) =>
    axios.get(url).then(({ data }) => data.data);
  const getEarningsHistory = (url) =>
    axios.get(url).then(({ data }) => data.data);
  // const { data: withdrawalHistory } = useSWR(
  //   // "/contributor/payouts",
  //   getWithdrawalHistory
  // );
  // const { data: earningsHistory } = useSWR(
  //   // "/contributor/earnings",
  //   getEarningsHistory
  // );
  useEffect(() => {
    dispatch(dashboardinfo());
  }, []);

  useEffect(() => {
    if(info?.data?.data?.wallet_balance){
      setWalletBalance(info?.data?.data?.wallet_balance)
    }
  }, [info]);

  let earningsHistory
  let withdrawalHistory
  function initializeWithdrawal(e) {
    e.preventDefault();
    console.log('uhuhu')
    dispatch(withdrawreq({ amount: +amount })).then((response) => {
      console.log(response);
      if (response?.payload?.data?.id) {
        toast.success("request sent successfully");
    // dispatch(profileinfo());

      } else {
        toast.error("request was not sent ");
      }
    })
  }
  // {
  //   pending: "Requesting",
  //   success: {
  //     render({ data }) {
  //       setInitializeOtp(true);
  //       setTransactionRef(data?.data?.data?.tx_ref);
  //     //   dispatch(_getContributorData());
  //       return data?.data.message;
  //     },
  //   },
  // }
  function handleConfirmOtp(e) {
    e.preventDefault();
    toast.promise(confirmOtp({ otp_code: otp, tx_ref: transactionRef }), {
      pending: "Processing",
      success: {
        render() {
        //   dispatch(_getContributorData());
          setModalDisplay(false);
          return data?.data.message;
        },
      },
    });
  }

  function handleResendOtp() {
    toast.promise(resendOtp(transactionRef), {
      pending: "Processing",
      success: {
        render() {
        //   dispatch(_getContributorData());
          setModalDisplay(false);
          return data?.data.message;
        },
      },
    });
  }

  const earnings = (
    <>
      {earningsHistory?.length === 0 && <Info message="No earnings" />}
      {earningsHistory?.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Image</th>
              <th>Product</th>
              <th>Category</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {earningsHistory
              ?.map((data) => (
                <tr key={data.id}>
                  <td>{new Date(data.date_validated).toLocaleDateString()}</td>
                  <td>
                    <Image
                      src={data.asset?.image?.public_url || NoImagePlaceholder}
                      alt="user"
                      width={100}
                      height={100}
                    />
                  </td>
                  <td>{data.asset.title}</td>
                  <td>{data.asset.category}</td>
                  <td>₦{Number(data.purchase_amount).toLocaleString()}</td>
                </tr>
              ))
              .reverse()}
          </tbody>
        </table>
      )}
    </>
  );
  const withdrawals = (
    <>
      {withdrawalHistory?.length === 0 && <Info message="No withdrawals" />}
      {withdrawalHistory?.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Type</th>
              <th>Reference</th>
            </tr>
          </thead>
          <tbody>
            {withdrawalHistory
              ?.map((withdrawal, index) => (
                <tr key={index}>
                  <td>
                    {new Date(withdrawal.created_at).toLocaleDateString()}
                  </td>
                  <td>₦{Number(withdrawal.amount).toLocaleString()}</td>
                  <td>{withdrawal.status}</td>
                  <td>{withdrawal.type}</td>
                  <td className="!lowercase">{withdrawal.tx_ref}</td>
                </tr>
              ))
              .reverse()}
          </tbody>
        </table>
      )}
    </>
  );

  useEffect(() => {
    // dispatch(_getContributorData());
  }, []);

  return (
    <ContributorLayout title="Wallet">
      <div className={styles.container}>
        {loading && !data && (
          <MoonLoader
            color="#2f4858"
            size={22}
            cssOverride={{ margin: "10rem auto" }}
          />
        )}

        {/* {data && ( */}
          <>
            <div className={styles.summary}>
              <h1>Overview</h1>
              <div>
                {earningsHistory?.length > 0 && (
                  <div className={styles.chart}>
                    <LineChart
                      datasetIdKey="pie-chart"
                      data={{
                        labels: earningsHistory.map((data) =>
                          new Date(data.date_validated).toLocaleDateString()
                        ),
                        datasets: [
                          {
                            id: 1,
                            label: "Earnings",
                            data: earningsHistory.map(
                              (data) => data.purchase_amount
                            ),
                            borderColor: "rgb(255, 99, 132)",
                            backgroundColor: "rgba(255, 99, 132, 0.5)",
                          },
                        ],
                      }}
                      options={{
                        plugins: {
                          legend: {
                            position: "top",
                          },
                        },
                      }}
                    />
                  </div>
                )}
                
                <div className={`${styles.withdraw} justify-between `}>
                  <div className="flex flex-col justify-between " >
                  <h5>Wallet balance</h5>
                  <h2>
                    {" "}
                    &#8358;
                    {
                      balance.split('.')[0]
                    }
                  </h2>
                  <button className='mt-20'  onClick={() => setModalDisplay(true)}>
                    Withdraw
                  </button>
                  </div>
                

                  <div>
                    <img src='/images/ebw.png' alt='' />
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.tabs}>
              <div className={styles.title}>
                <h1
                  onClick={() => setActiveTab("earnings")}
                  className={activeTab === "earnings" ? styles.active : null}
                >
                  Payment History
                </h1>
                <h1
                  onClick={() => setActiveTab("withdrawals")}
                  className={activeTab === "withdrawals" ? styles.active : null}
                >
                  Withdrawal History
                </h1>
              </div>
              <div className={styles.table}>
                {activeTab === "earnings" && earnings}
                {activeTab === "withdrawals" && withdrawals}
              </div>
            </div>
          </>
        {/* // )} */}
      </div>
      <Modal display={modalDisplay} close={() => setModalDisplay(false)}>
        {!initializeOtp && (
          <div className="w-[70rem]">
            <div className='flex justify-between items-end' >

              <div>
              <h1 className="mb-1 text-2xl">Withdrawal Request</h1>
            <p className="text-xl">
              Send a withdrawal request to receive your earnings
            </p>
              </div>

              <div>
              <div className={` flex text-white sp justify-between w-[35rem] rounded-2xl px-6 py-3 bg-[#303030] `}>
                  <div className="flex flex-col justify-between " >
                  <h5>Wallet balance</h5>
                  <h2>
                    {" "}
                    &#8358;
                      {
                      balance.split('.')[0]
                    }
                  </h2>
               
                  </div>
                

                  <div>
                    <img src='/images/ebw.png' alt='' />
                  </div>
                </div>
              </div>

            </div>
          
            <form onSubmit={initializeWithdrawal} className="mt-10 space-y-10">
              {/* <fieldset className="">
              <label htmlFor="balance" className="text-[1.3rem] mb-4 block">
                Earning balance
              </label>
              <input
                type="text"
                className="bg-[#F2F2F2] w-full h-14 p-6 font-bold rounded-2xl"
              />
            </fieldset>
            <fieldset>
              <label htmlFor="balance" className="text-[1.3rem] mb-4 block">
                Bank account (Your funds will be withdrawn to this account)
              </label>
              <input
                type="text"
                className="bg-[#F2F2F2] w-full h-14 p-6 font-bold rounded-2xl"
              />
            </fieldset> */}
              <fieldset>
                <label htmlFor="amount" className="text-[1.3rem] mb-4 block">
                  Amount to withdraw
                </label>
                <input
                  type="number"
                  id="amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="bg-[#F2F2F2] w-full h-14 p-6 font-bold rounded-2xl"
                  required
                />
              </fieldset>
              {/* <fieldset>
              <label htmlFor="balance" className="text-[1.3rem] mb-4 block">
                Password
              </label>
              <input
                type="text"
                className="bg-[#F2F2F2] w-full h-14 p-6 font-bold rounded-2xl"
              />
            </fieldset> */}
              <button className="bg-[#2F4858] w-[30rem] py-5 px-12 mx-auto block text-white rounded-lg">
                Send Withdrawal Request
              </button>
            </form>
          </div>
        )}
        {initializeOtp && (
          <div className="w-[40rem]">
            <h1 className="mb-1 text-2xl">Enter OTP</h1>
            <p className="text-xl">
              A six figure one time password was sent to your mail, enter to
              complete transaction.{" "}
              <span
                onClick={handleResendOtp}
                className="font-bold cursor-pointer text-[#2F4858] hover:underline"
              >
                Resend
              </span>
            </p>
            <form onSubmit={handleConfirmOtp}>
              <OTPInput
                value={otp}
                onChange={setOtp}
                numInputs={6}
                renderInput={(props) => <input {...props} />}
                inputStyle="bg-gray-100 !w-20 h-20 rounded-xl mx-2"
                containerStyle="justify-center my-10"
              />
              <button className="bg-[#2F4858] w-[30rem] py-4 px-12 mx-auto block text-white rounded-full">
                Confirm
              </button>
            </form>
          </div>
        )}
      </Modal>
    </ContributorLayout>
  );
}
