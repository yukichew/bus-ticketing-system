import React, { useState, useEffect } from "react";
import CustomInput from "../../common/CustomInput";

const ViewTransaction = ({ operator }) => {
  const [transactionDetails, setTransactionDetails] = useState({
    transactionID: "",
    amount: "",
    createdAt: "",
    status: "",
  });

  useEffect(() => {
    if (operator) {
      setTransactionDetails({
        transactionID: operator.transactionID,
        amount: operator.amount,
        createdAt: operator.createdAt,
        status: operator.originalStatus,
      });
    }
  }, [operator]);

  console.log("status:", operator.originalStatus);

  return (
    <div className="flex flex-col space-y-4 w-[400px]">
      <header className="font-poppins font-semibold text-lg text-primary mb-4">
        Transaction ID: {operator.transactionID}
      </header>
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
          value={transactionDetails.transactionID}
          readOnly
        />
      </div>
      <div className="pointer-events-none">
        <label
          htmlFor="amountPaid"
          className="block text-sm font-poppins font-medium text-gray-700 pb-2"
        >
          Amount Paid (RM)
        </label>
        <CustomInput
          placeholder="Amount Paid"
          id="amount"
          name="amount"
          type="text"
          value={transactionDetails.amount}
          readOnly
        />
      </div>
      <div className="pointer-events-none pb-4">
        <label
          htmlFor="createdAt"
          className="block text-sm font-poppins font-medium text-gray-700 pb-2"
        >
          Created At
        </label>
        <CustomInput
          placeholder="Created At"
          id="createdAt"
          name="createdAt"
          type="text"
          value={transactionDetails.createdAt}
          readOnly
        />
      </div>
    </div>
  );
};

export default ViewTransaction;
