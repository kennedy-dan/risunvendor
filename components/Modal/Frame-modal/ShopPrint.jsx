import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import styles from "styles/landing-page/frame-modal/frame-modal.module.scss";
import {
	FlutterWaveButton,
	closePaymentModal,
	useFlutterwave,
} from "flutterwave-react-v3";
import { flutterwaveConfig } from "utils/FlutterwaveConfig";
import { checkoutAsset, checkoutPrintAsset } from "store/slice/assetSlice";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import ShopPrintDeliveryModal from "../DeliveryModal/ShopPrintDeliveryModal";

export default function ShopPrint({
	frameSize,
	croppedImg,
	print,
	appendFrame,
	uploadImg,
}) {
	const [open, setOpen] = useState(false);
	const { user } = useSelector((state) => state.auth);
	const { frameImg, checkoutDetails } = useSelector((state) => state.assets);
	const [processing, setProcessing] = useState("idle");
	const [printSize, setPrintSize] = useState(null);
	const [printType, setPaperType] = useState('');
	const [beginPayment, setBeginPayment] = useState(false);
	const dispatch = useDispatch();
	console.log(printSize)
	let customDetails = {
		title: "Shop Print",
		description: "Puchase a shop print",
		tx_ref: checkoutDetails.printResult?.transaction?.tx_ref,
		amount: checkoutDetails.printResult?.transaction?.amount,
		
		remarks: checkoutDetails.printResult?.transaction?.remarks,
	};

	let image_url = print?.meta?.images?.[0]?.public_url
		? print?.meta?.images?.[0]?.public_url
		: frameImg?.assets?.url;
	let data = {
		asset_id: print?.id,
		sub_purchase: false,
		image_public_id: frameImg?.assets?.public_id,
		image_url,
		size_id: printSize?.id,
		phone_number: user.phone_number,
		gender: user.gender,
		street: user.address.street,
		city: user.address.city,
		state: user.address.state,
		country: user.address.country,
		print_type: printType,
		purchase_print:1,
	};

	let image = print ? print?.meta?.images?.[0]?.public_url : croppedImg;

	appendFrame("");
	const paymentHandler = async () => {
		// if (!printSize) {
		// 	toast.error("Please select a print size");
		// 	return;
		// }
		setProcessing(true);
		dispatch(checkoutPrintAsset(data));
	};

	useEffect(() => {
		if (checkoutDetails.printResult?.transaction?.remarks) {
			setProcessing(false);
		}
	}, [checkoutDetails]);

	const flutterConfig = flutterwaveConfig(
		user,
		closePaymentModal,
		customDetails
	);

	const matType = [
		{
			value: "Photo Paper",
			label: "Photo Paper"
		},
		{
			value: "canvas",
			label: "canvas"
		},
	]

	return (
		<>
			<section>
				<div className="mt-14">
					<h6 className="text-[1.875rem] mt-20">Choose Print size</h6>
					<div className="">
						<Select
							placeholder="Please select a print size"
							options={frameSize?.map((frame) => ({
								value: frame,
								label: `${frame.width}" x ${frame.height}"`,
							}))}
							onChange={(e) => setPrintSize(e.value)}
							classNamePrefix="react-select"
						/>
					</div>
					<div className=" mt-2">
						<Select
							placeholder="Select material types"
							options={matType?.map((frame) => ({
								value: frame.value,
								label: frame.label,
							}))}
							onChange={(e) => setPaperType(e.value)}
							classNamePrefix="react-select"
						/>
					</div>
				</div>

				<div className="flex mt-20 justify-between">
					<div
						className={` ${styles.imgContainer} border border-[#2F4858] rounded-md  w-[30%] mr-7`}
					>
						<img
							src={image}
							className="w-[80%] mx-auto object-cover py-3 rounded-[10px]  h-[90px]"
						/>
					</div>
					<p className="w-[70%] text-[1.4rem] font-bold">
						Our prints are professionally hand - stretched and layered with
						protective ink for a museum grade finish
					</p>
				</div>

				<button
					className="w-full bg-[var(--primaryColor)] text-white mt-20 py-4 rounded-full"
					onClick={() => {
						if(!printSize){
							toast.error("Select a size")
							return
						}
						setOpen(true)
					}}
				>
					Buy
				</button>

				{/* {(processing === "idle" || processing == true) && (
					<button
						className="w-full bg-[var(--primaryColor)] text-white mt-20 py-4 rounded-full"
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
					<button className="w-full bg-[var(--green)] text-white mt-20 py-4 rounded-full">
						<FlutterWaveButton
							text="Click to Make Payment"
							{...flutterConfig}
						/>
					</button>
				)} */}
			</section>
			{open === true ? (
				<ShopPrintDeliveryModal
					print={print}
					croppedImg={croppedImg}
					open={open}
					setopen={setOpen}
					type="ShopPrint"
					printSize={printSize}
					uploadImg={uploadImg}
					printType={printType}
				/>
			) : null}
		</>
	);
}
