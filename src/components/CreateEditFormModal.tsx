import React from "react";

interface ICreateEditFormModalProps {
  assetName: string;
  address: string;
  area: string;
  tenant: string;
  rentPaid: string;
  setAssetName: (assetName: string) => void;
  setAddress: (address: string) => void;
  setArea: (area: string) => void;
  setTenant: (tenant: string) => void;
  setRentPaid: (rentPaid: string) => void;
}

const CreateEditFormModal: React.FC<ICreateEditFormModalProps> = ({
  assetName,
  address,
  area,
  tenant,
  rentPaid,
  setAssetName,
  setAddress,
  setArea,
  setTenant,
  setRentPaid,
}) => {
  return (
    <div className="grid gap-2 col-span-4">
      <div className="grid grid-cols-12 items-center">
        <span className="col-span-2">Asset name</span>
        <span className="col-span-2">:</span>
        <input
          className="border-2 p-2 text-sm rounded-lg col-span-8"
          type="text"
          value={assetName}
          placeholder="Asset name"
          onChange={(e) => {
            setAssetName(e.target.value);
          }}
        />
      </div>
      <div className="grid grid-cols-12 items-center">
        <span className="col-span-2">Address</span>
        <span className="col-span-2">:</span>
        <input
          className="border-2 p-2 text-sm rounded-lg col-span-8"
          type="text"
          value={address}
          placeholder="Address"
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-12 items-center">
        <span className="col-span-2">Area</span>
        <span className="col-span-2">:</span>
        <input
          className="border-2 p-2 text-sm rounded-lg col-span-8"
          type="number"
          min={0}
          value={area}
          placeholder="Area"
          onChange={(e) => setArea(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-12 items-center">
        <span className="col-span-2">Tenant</span>
        <span className="col-span-2">:</span>
        <input
          className="border-2 p-2 text-sm rounded-lg col-span-8"
          type="text"
          value={tenant}
          placeholder="Tenant"
          onChange={(e) => setTenant(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-12 items-center">
        <span className="col-span-2">Rent Paid</span>
        <span className="col-span-2">:</span>
        <input
          className="border-2 p-2 text-sm rounded-lg col-span-8"
          type="number"
          step="0.01"
          min={0}
          value={rentPaid}
          placeholder="Rent Paid"
          onChange={(e) => setRentPaid(e.target.value)}
        />
      </div>
    </div>
  );
};

export default CreateEditFormModal;
