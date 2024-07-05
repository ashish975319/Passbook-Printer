import React from "react";
import { useLocation } from "react-router-dom";

const PassbookData = () => {
  const location = useLocation();
  const { userId, entityId, ...passbookData } = location.state || {};

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-md">
        <h1 className="mb-6 text-2xl font-bold text-center text-gray-800">
          Passbook Data
        </h1>
        <div className="mb-4">
          <p className="text-sm font-medium text-gray-700">
            <span className="font-bold">User ID:</span> {userId}
          </p>
        </div>
        <div className="mb-4">
          <p className="text-sm font-medium text-gray-700">
            <span className="font-bold">Entity ID:</span> {entityId}
          </p>
        </div>
        <div className="mb-4">
          <p className="text-sm font-medium text-gray-700">
            <span className="font-bold">Transaction ID:</span>{" "}
            {passbookData["tran-id"]}
          </p>
        </div>
        <div className="mb-4">
          <p className="text-sm font-medium text-gray-700">
            <span className="font-bold">Primary Account Number:</span>{" "}
            {passbookData["primary-acc-number"]}
          </p>
        </div>
        <div className="mb-4">
          <p className="text-sm font-medium text-gray-700">
            <span className="font-bold">Barcode:</span> {passbookData.barCode}
          </p>
        </div>
        <div className="mb-4">
          <p className="text-sm font-medium text-gray-700">
            <span className="font-bold">Date-Time:</span>{" "}
            {passbookData["date-time"]}
          </p>
        </div>
        <div className="mb-4">
          <p className="text-sm font-medium text-gray-700">
            <span className="font-bold">Process Code:</span>{" "}
            {passbookData.processCode}
          </p>
        </div>
        <div className="mt-6">
          <pre className="text-sm text-gray-600 bg-gray-100 p-4 rounded-md">
            {JSON.stringify(passbookData, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default PassbookData;
