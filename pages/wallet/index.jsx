import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { confirmOtp, resendOtp } from "@/services/contributor";
import { MoonLoader } from "react-spinners";
import { toast } from "react-toastify";
import axios from "axios";
import { dashboardinfo, withdrawreq } from "@/store/slice/dashboardSlice";

import ContributorLayout from "@/components/ContributorLayout";
import OTPInput from "react-otp-input";
import Info from "@/components/Info";
import Modal from "@/components/Modal";
import styles from "@/styles/contributor/content/earnings.module.scss";

export default function Index() {
  const dispatch = useDispatch();
  let data;
  let loading;
  
  const [otp, setOtp] = useState("");
  const [transactionRef, setTransactionRef] = useState("");
  const [balance, setWalletBalance] = useState("");
  const [initializeOtp, setInitializeOtp] = useState(false);
  const { info } = useSelector((state) => state.dashboard);
  const [earningsHistory, setEarningsHistory] = useState([]);
  const [activeTab, setActiveTab] = useState("earnings");
  const [modalDisplay, setModalDisplay] = useState(false);
  const [amount, setAmount] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const getWithdrawalHistory = (url) =>
    axios.get(url).then(({ data }) => data.data);
  const getEarningsHistory = (url) =>
    axios.get(url).then(({ data }) => data.data);

  useEffect(() => {
    dispatch(dashboardinfo());
  }, []);

  useEffect(() => {
    if (info?.data?.data?.wallet_balance) {
      setWalletBalance(info?.data?.data?.wallet_balance);
      setEarningsHistory(info?.data?.data?.earnings_history);
    }
  }, [info]);

  let withdrawalHistory;

  async function initializeWithdrawal(e) {
    e.preventDefault();
    
    if (isProcessing) return;
    
    setIsProcessing(true);
    
    try {
      const response = await dispatch(withdrawreq({ amount: +amount })).unwrap();
      
      if (response?.id || response?.data?.id) {
        // Extract tx_ref from response
        const txRef = response?.tx_ref || response?.data?.tx_ref;
        
        if (txRef) {
          setTransactionRef(txRef);
          setInitializeOtp(true);
          setModalDisplay(true);
          toast.success("Withdrawal request sent successfully! Please enter the OTP sent to your email.");
        } else {
          toast.error("No transaction reference received");
        }
      } else {
        toast.error(response?.message || "Request was not sent");
        setModalDisplay(false);
      }
    } catch (error) {
      console.error("Withdrawal error:", error);
      toast.error(error?.response?.data?.message || "Request failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  }

  async function handleConfirmOtp(e) {
    e.preventDefault();
    
    if (!otp || otp.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP");
      return;
    }
    
    try {
      const response = await confirmOtp({ 
        otp_code: otp, 
        tx_ref: transactionRef 
      });
      
      if (response?.status === 200 || response?.success) {
        toast.success(response?.data?.message || "Withdrawal confirmed successfully!");
        setModalDisplay(false);
        setInitializeOtp(false);
        setOtp("");
        setAmount("");
        setTransactionRef("");
        // Refresh dashboard data
        dispatch(dashboardinfo());
      } else {
        toast.error(response?.data?.message || "OTP verification failed");
      }
    } catch (error) {
      console.error("OTP confirmation error:", error);
      toast.error(error?.response?.data?.message || "Failed to verify OTP. Please try again.");
    }
  }

  async function handleResendOtp() {
    try {
      const response = await resendOtp(transactionRef);
      toast.success(response?.data?.message || "OTP resent successfully!");
    } catch (error) {
      console.error("Resend OTP error:", error);
      toast.error(error?.response?.data?.message || "Failed to resend OTP. Please try again.");
    }
  }

  const earnings = (
    <>
      {earningsHistory?.length === 0 && <Info message="No earnings" />}
      {earningsHistory?.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Type</th>
              <th>Category</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {earningsHistory
              ?.map((data) => (
                <tr key={data.id}>
                  <td>{new Date(data.created_at).toLocaleDateString()}</td>
                  <td>{data?.type}</td>
                  <td>{data?.source?.detail?.product}</td>
                  <td>₦{data?.amount}</td>
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

  const closeModal = () => {
    setModalDisplay(false);
    setInitializeOtp(false);
    setOtp("");
    setAmount("");
    setTransactionRef("");
  };

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

        <>
          <div className={styles.summary}>
            <h1>Overview</h1>
            <div>
              <div className={`${styles.withdraw} justify-between `}>
                <div className="flex flex-col justify-between">
                  <h5>Wallet balance</h5>
                  <h2>
                    &#8358;
                    {balance?.split('.')[0]}
                  </h2>
                  <button className='mt-20' onClick={() => setModalDisplay(true)}>
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
      </div>

      <Modal display={modalDisplay} close={closeModal}>
        {!initializeOtp ? (
          <div className="w-[70rem]">
            <div className='flex justify-between items-end'>
              <div>
                <h1 className="mb-1 text-2xl">Withdrawal Request</h1>
                <p className="text-xl">
                  Send a withdrawal request to receive your earnings
                </p>
              </div>

              <div>
                <div className={`flex text-white sp justify-between w-[35rem] rounded-2xl px-6 py-3 bg-[#303030]`}>
                  <div className="flex flex-col justify-between">
                    <h5>Wallet balance</h5>
                    <h2>
                      &#8358;
                      {balance?.split('.')[0]}
                    </h2>
                  </div>
                  <div>
                    <img src='/images/ebw.png' alt='' />
                  </div>
                </div>
              </div>
            </div>

            <form onSubmit={initializeWithdrawal} className="mt-10 space-y-10">
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
                  disabled={isProcessing}
                />
              </fieldset>
              <button 
                type="submit"
                className="bg-[#2F4858] w-[30rem] py-5 px-12 mx-auto block text-white rounded-lg disabled:opacity-50"
                disabled={isProcessing}
              >
                {isProcessing ? "Processing..." : "Send Withdrawal Request"}
              </button>
            </form>
          </div>
        ) : (
          <div className="w-[40rem]">
            <h1 className="mb-1 text-2xl">Enter OTP</h1>
            <p className="text-xl">
              A 6-digit one-time password was sent to your email. Enter it to
              complete the transaction.{" "}
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
              <button 
                type="submit"
                className="bg-[#2F4858] w-[30rem] py-4 px-12 mx-auto block text-white rounded-full"
              >
                Confirm OTP
              </button>
            </form>
          </div>
        )}
      </Modal>
    </ContributorLayout>
  );
}