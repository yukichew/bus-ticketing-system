import React, { useState, useEffect } from "react";
import CustomButton from "../../../components/common/CustomButton";
import CustomInput from "../../../components/common/CustomInput";
import Card from "../../../components/common/Card";

const RefundForm = ({ operator, onClose }) => {
  const [refundDetails, setRefundDetails] = useState({
    transactionNo: "",
    purchaseAt: "",
    purchaseBy: "",
    paymentType: "",
    amountPaid: "",
    refundReason: "",
  });

  useEffect(() => {
    if (operator) {
      setRefundDetails({
        transactionNo: operator.transactionNo,
        purchaseAt: operator.purchaseAt,
        purchaseBy: operator.purchaseBy,
        paymentType: operator.paymentType,
        amountPaid: operator.amountPaid,
        refundReason: "",
      });
    }
  }, [operator]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setRefundDetails((prevDetails) => ({
      ...prevDetails,
      [id]: value,
    }));
  };

  return (
    <div className="flex flex-col space-y-4 w-full">
      <Card header="Refund Details">
        <div className="pointer-events-none">
          <label
            htmlFor="transactionNo"
            className="block text-sm font-poppins font-medium text-gray-700 pb-2"
          >
            Transaction No
          </label>
          <CustomInput
            placeholder="Transaction No"
            id="transactionNo"
            name="transactionNo"
            type="text"
            value={refundDetails.transactionNo}
            onChange={handleInputChange}
            readOnly
          />
        </div>
        <div className="pointer-events-none">
          <label
            htmlFor="purchaseAt"
            className="block text-sm font-poppins font-medium text-gray-700 pb-2"
          >
            Purchase At
          </label>
          <CustomInput
            placeholder="Purchase At"
            id="purchaseAt"
            name="purchaseAt"
            type="text"
            value={refundDetails.purchaseAt}
            onChange={handleInputChange}
            readOnly
          />
        </div>
        <div className="pointer-events-none">
          <label
            htmlFor="purchaseBy"
            className="block text-sm font-poppins font-medium text-gray-700 pb-2"
          >
            Purchase By
          </label>
          <CustomInput
            placeholder="Purchase By"
            id="purchaseBy"
            name="purchaseBy"
            type="text"
            value={refundDetails.purchaseBy}
            onChange={handleInputChange}
            readOnly
          />
        </div>
        <div className="pointer-events-none">
          <label
            htmlFor="paymentType"
            className="block text-sm font-poppins font-medium text-gray-700 pb-2"
          >
            Payment Type
          </label>
          <CustomInput
            placeholder="Payment Type"
            id="paymentType"
            name="paymentType"
            type="text"
            value={refundDetails.paymentType}
            onChange={handleInputChange}
            readOnly
          />
        </div>
        <div className="pointer-events-none">
          <label
            htmlFor="amountPaid"
            className="block text-sm font-poppins font-medium text-gray-700 pb-2"
          >
            Amount Paid
          </label>
          <CustomInput
            placeholder="Amount Paid"
            id="amountPaid"
            name="amountPaid"
            type="text"
            value={refundDetails.amountPaid}
            onChange={handleInputChange}
            readOnly
          />
        </div>
        <div>
          <label
            htmlFor="refundReason"
            className="block text-sm font-poppins font-medium text-gray-700 pb-2"
          >
            Refund Reason
          </label>
          <CustomInput
            placeholder="Enter refund reason"
            id="refundReason"
            name="refundReason"
            type="text"
            value={refundDetails.refundReason}
            onChange={handleInputChange}
            required
          />
        </div>
        <CustomButton title={"Process Refund"} />
      </Card>
    </div>
  );
};

export default RefundForm;
