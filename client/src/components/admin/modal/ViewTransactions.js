import React, { useState, useEffect } from "react";
import CustomButton from "../../common/CustomButton";
import CustomInput from "../../common/CustomInput";
import Card from "../../common/Card";

const ViewTransaction = ({ operator, onClose }) => {
  const [transactionDetails, setTransactionDetails] = useState({
    transactionNo: "",
    purchaseAt: "",
    purchaseBy: "",
    paymentType: "",
    amountPaid: "",
    refundReason: "",
    status: "",
  });

  useEffect(() => {
    if (operator) {
      setTransactionDetails({
        transactionNo: operator.transactionNo,
        purchaseAt: operator.purchaseAt,
        purchaseBy: operator.purchaseBy,
        paymentType: operator.paymentType,
        amountPaid: operator.amountPaid,
        refundReason: operator.refundReason,
        status: operator.originalStatus,
      });
    }
  }, [operator]);

  console.log("status:", operator.originalStatus);

  return (
    <div className="flex flex-col space-y-4 w-[400px]">
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
          value={transactionDetails.transactionNo}
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
          value={transactionDetails.purchaseAt}
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
          value={transactionDetails.purchaseBy}
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
          value={transactionDetails.paymentType}
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
          value={transactionDetails.amountPaid}
          readOnly
        />
      </div>

      {transactionDetails.refundReason && (
        <div className="pointer-events-none">
          <label
            htmlFor="refundReason"
            className="block text-sm font-poppins font-medium text-gray-700 pb-2"
          >
            Refund Reason
          </label>
          <CustomInput
            id="refundReason"
            name="refundReason"
            type="text"
            value={transactionDetails.refundReason}
            readOnly
          />
        </div>
      )}
    </div>
  );
};

export default ViewTransaction;
