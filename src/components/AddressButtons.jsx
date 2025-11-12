import React from 'react';

const AddressButtons = ({ addresses, onSelectAddress }) => {
  if (!addresses || !Array.isArray(addresses) || addresses.length === 0) {
    return null;
  }

  return (
    <div className=" left-4 bottom-24 z-20">
      <div className="w-64  overflow-y-auto rounded-2xl rounded-tl-sm bg-gray-100 text-gray-800 px-4 py-3 shadow-lg">
        <div className="flex flex-col gap-2">
          {addresses.map((address, index) => {
            // Handle both object format {name: "...", ...} and string format
            // If address is null or empty, show "بدون عنوان"
            let addressName = '';
            if (address === null || address === undefined) {
              addressName = 'بدون عنوان';
            } else if (typeof address === 'string') {
              addressName = address.trim() || 'بدون عنوان';
            } else {
              addressName = address.name || address.title || 'بدون عنوان';
            }
            
            return (
              <button
                key={index}
                onClick={() => onSelectAddress(addressName === 'بدون عنوان' ? '' : addressName)}
                className="w-full text-right px-4 py-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-200 hover:border-gray-400 transition-all duration-200 font-medium text-gray-800 text-sm shadow-sm hover:shadow-md"
              >
                {addressName}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AddressButtons;

