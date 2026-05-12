import React, { useEffect, useState } from "react";
import ContributorLayout from "@/components/ContributorLayout";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { orderinfoId } from "@/store/slice/dashboardSlice";
import axios from "axios";
import { 
  ShoppingBag, 
  Truck, 
  CreditCard, 
  MapPin, 
  Mail, 
  Phone,
  CheckCircle,
  Clock,
  Package,
  ArrowLeft
} from "lucide-react";

const OrderId = () => {
  const router = useRouter();
  const { orderId } = useSelector((state) => state.dashboard);
  const { id } = router.query;
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [completingOrder, setCompletingOrder] = useState(false);
  const [showCompleteModal, setShowCompleteModal] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(orderinfoId(id));
      setLoading(false);
    }
  }, [id]);

  const orderData = orderId?.data?.data;
  const orderItems = orderData?.order_items_detailed || orderData?.order_items || [];

  const getStatusColor = (status) => {
    switch(status?.toLowerCase()) {
      case 'paid':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'completed':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  const handleCompleteOrder = async () => {
    if (!id) return;
    
    setCompletingOrder(true);
    try {
   
      const response = await axios.post(
        `/vendor/orders/${id}/complete`
      );
      
      if (response.data.success) {
        // Refresh order data
        await dispatch(orderinfoId(id));
        setShowCompleteModal(false);
        // Show success message (you can add a toast notification here)
      }
    } catch (error) {
      console.error('Error completing order:', error);
      // Handle error (you can add error toast notification here)
    } finally {
      setCompletingOrder(false);
    }
  };

  const OrderSummary = () => (
    <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-6 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="flex items-center space-x-3">
          <div className="bg-white p-3 rounded-full shadow-md">
            <Package className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Order ID</p>
            <p className="font-semibold text-gray-800">#{orderData?.sku?.slice(0, 8)}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="bg-white p-3 rounded-full shadow-md">
            <CreditCard className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Amount</p>
            <p className="font-bold text-xl text-purple-600">{formatPrice(orderData?.total_amount)}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="bg-white p-3 rounded-full shadow-md">
            {orderData?.status === 'paid' ? (
              <CheckCircle className="w-6 h-6 text-green-600" />
            ) : orderData?.status === 'completed' ? (
              <CheckCircle className="w-6 h-6 text-blue-600" />
            ) : (
              <Clock className="w-6 h-6 text-yellow-600" />
            )}
          </div>
          <div>
            <p className="text-sm text-gray-500">Status</p>
            <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(orderData?.status)}`}>
              {orderData?.status?.toUpperCase()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  const DeliveryInfo = () => (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
      <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
        <Truck className="w-5 h-5 mr-2 text-purple-600" />
        Delivery Information
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-start space-x-3">
          <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
          <div>
            <p className="text-sm text-gray-500">Delivery Address</p>
            <p className="text-gray-800">
              {orderData?.billing_address?.street}, {orderData?.billing_address?.city}, 
              {orderData?.billing_address?.state}, {orderData?.billing_address?.country}
            </p>
          </div>
        </div>
        <div className="flex items-start space-x-3">
          <Mail className="w-5 h-5 text-gray-400 mt-0.5" />
          <div>
            <p className="text-sm text-gray-500">Email Address</p>
            <p className="text-gray-800">{orderData?.email}</p>
          </div>
        </div>
        <div className="flex items-start space-x-3">
          <Phone className="w-5 h-5 text-gray-400 mt-0.5" />
          <div>
            <p className="text-sm text-gray-500">Phone Number</p>
            <p className="text-gray-800">{orderData?.phone_number || 'Not provided'}</p>
          </div>
        </div>
      </div>
    </div>
  );

  const CompleteOrderModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">Complete Order</h3>
        <p className="text-gray-600 mb-6">
          Are you sure you want to mark this order as completed? This action cannot be undone.
        </p>
        <div className="flex space-x-4">
          <button
            onClick={() => setShowCompleteModal(false)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleCompleteOrder}
            disabled={completingOrder}
            className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {completingOrder ? 'Processing...' : 'Yes, Complete Order'}
          </button>
        </div>
      </div>
    </div>
  );

  const renderAssetItem = (item) => (
    <div className="flex flex-col md:flex-row justify-between items-start gap-6 p-6 bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
      <div className="flex flex-col md:flex-row gap-6 w-full">
        <div className="md:w-48 h-48 rounded-xl overflow-hidden bg-gray-100">
          <img
            src={item?.asset?.meta?.images[0]?.public_url || item?.asset?.images[0]?.public_url}
            className="w-full h-full object-cover"
            alt={item?.asset?.title}
          />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-800 mb-2">{item?.asset?.title}</h3>
          <div className="space-y-2">
            <p className="text-gray-600">
              <span className="font-medium">Category:</span> {item?.asset?.meta?.category || item?.asset?.category?.title}
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Author:</span> {item?.asset?.user?.first_name} {item?.asset?.user?.last_name}
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Asset Type:</span> {item?.asset?.meta?.asset_type}
            </p>
          </div>
        </div>
      </div>
      <div className="text-left md:text-right w-full md:w-auto">
        <p className="text-2xl font-bold text-purple-600">{formatPrice(item?.asset?.pricing)}</p>
      </div>
    </div>
  );

  const renderPrintItem = (item) => (
    <div className="flex flex-col md:flex-row justify-between items-start gap-6 p-6 bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
      <div className="flex flex-col md:flex-row gap-6 w-full">
        <div className="md:w-48 h-48 rounded-xl overflow-hidden bg-gray-100">
          <img
            src={item?.deliverable_item_details[0]?.image_url}
            className="w-full h-full object-cover"
            alt={item?.canvas?.title}
          />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-800 mb-2">{item?.canvas?.title}</h3>
          <div className="space-y-2">
            <p className="text-gray-600">
              <span className="font-medium">Print Type:</span> {item?.canvas?.type}
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Size:</span> {item?.deliverable_item_details[0]?.size?.size || 
                `${item?.deliverable_item_details[0]?.size?.height} × ${item?.deliverable_item_details[0]?.size?.width}`}
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Quantity:</span> {item?.deliverable_item_details[0]?.quantity}
            </p>
          </div>
        </div>
      </div>
      <div className="text-left md:text-right w-full md:w-auto">
        <p className="text-2xl font-bold text-purple-600">{formatPrice(item?.purchase_price)}</p>
      </div>
    </div>
  );

  const renderFrameItem = (item) => (
    <div className="flex flex-col md:flex-row justify-between items-start gap-6 p-6 bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
      <div className="flex flex-col md:flex-row gap-6 w-full">
        <div className="relative md:w-48 h-48">
          <div className="relative w-full h-full">
            <img
              src={item?.frame?.image_url}
              className="absolute inset-0 w-full h-full object-cover rounded-xl z-0"
              alt={item?.frame?.title}
            />
            <div className="absolute inset-2 z-10 rounded-lg overflow-hidden">
              <img
                src={item?.deliverable_item_details[0]?.image_url}
                className="w-full h-full object-cover"
                alt="Frame content"
              />
            </div>
          </div>
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-800 mb-2">{item?.frame?.title}</h3>
          <div className="space-y-2">
            <p className="text-gray-600">
              <span className="font-medium">Frame Size:</span> {item?.deliverable_item_details[0]?.size?.size}
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Orientation:</span> {item?.deliverable_item_details[0]?.orientation || 'Standard'}
            </p>
            <p className="text-gray-600">
              <span className="font-medium">With Mat:</span> {item?.deliverable_item_details[0]?.add_mat ? 'Yes' : 'No'}
            </p>
          </div>
        </div>
      </div>
      <div className="text-left md:text-right w-full md:w-auto">
        <p className="text-2xl font-bold text-purple-600">{formatPrice(item?.purchase_price)}</p>
      </div>
    </div>
  );

  const renderCanvasItem = (item) => (
    <div className="flex flex-col md:flex-row justify-between items-start gap-6 p-6 bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
      <div className="flex flex-col md:flex-row gap-6 w-full">
        <div className="md:w-48 h-48 rounded-xl overflow-hidden bg-gray-100 relative transform rotate-3">
          <img
            src={item?.deliverable_item_details[0]?.image_url}
            className="w-full h-full object-cover"
            alt={item?.canvas?.title}
          />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-800 mb-2">{item?.canvas?.title}</h3>
          <div className="space-y-2">
            <p className="text-gray-600">
              <span className="font-medium">Canvas Type:</span> {item?.canvas?.type}
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Size:</span> {item?.deliverable_item_details[0]?.size?.size}
            </p>
          </div>
        </div>
      </div>
      <div className="text-left md:text-right w-full md:w-auto">
        <p className="text-2xl font-bold text-purple-600">{formatPrice(item?.purchase_price)}</p>
      </div>
    </div>
  );

  return (
    <ContributorLayout title="Order details">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.back()}
            className="flex items-center space-x-2 text-gray-600 hover:text-purple-600 transition-colors mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Orders</span>
          </button>
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Order Details</h1>
              <p className="text-gray-500 mt-2">View and track your order information</p>
            </div>
            {orderData?.status === 'paid' && (
              <button
                onClick={() => setShowCompleteModal(true)}
                className="px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors flex items-center space-x-2"
              >
                <CheckCircle className="w-5 h-5" />
                <span>Mark as Completed</span>
              </button>
            )}
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
          </div>
        ) : (
          <>
            {/* Order Summary */}
            <OrderSummary />

            {/* Delivery Information */}
            <DeliveryInfo />

            {/* Order Items */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <ShoppingBag className="w-6 h-6 mr-2 text-purple-600" />
                Order Items ({orderItems.length})
              </h2>
              <div className="space-y-6">
                {orderItems?.map((item, index) => (
                  <div key={index}>
                    {item?.product_type === "Asset" && renderAssetItem(item)}
                    {item?.product_type === "Print" && renderPrintItem(item)}
                    {item?.product_type === "Frame" && renderFrameItem(item)}
                    {item?.product_type === "Canvas" && renderCanvasItem(item)}
                  </div>
                ))}
              </div>
            </div>

            {/* Order Timeline */}
            {orderData?.updated_at && (
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Order Timeline</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">Order Placed</p>
                      <p className="text-sm text-gray-500">
                        {new Date(orderData?.updated_at).toLocaleDateString()} at {new Date(orderData?.updated_at).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                  {orderData?.dispatched_at && (
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <Truck className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">Order Dispatched</p>
                        <p className="text-sm text-gray-500">
                          {new Date(orderData?.dispatched_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  )}
                  {orderData?.delivered_at && (
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                        <Package className="w-4 h-4 text-purple-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">Order Delivered</p>
                        <p className="text-sm text-gray-500">
                          {new Date(orderData?.delivered_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  )}
                  {orderData?.completed_at && (
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">Order Completed</p>
                        <p className="text-sm text-gray-500">
                          {new Date(orderData?.completed_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Complete Order Modal */}
      {showCompleteModal && <CompleteOrderModal />}
    </ContributorLayout>
  );
};

export default OrderId;