import React, { useEffect } from "react";

import { ILocation, ACTIONS } from "../pages/Table";
import {
  ArrowPathIcon,
  ExclamationTriangleIcon,
  PlusCircleIcon,
  MapIcon,
} from "@heroicons/react/24/outline";
import CreateEditFormModal from "./CreateEditFormModal";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import { Marker } from "@react-google-maps/api";

interface IActionsModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  action: ACTIONS;
  location: ILocation;
  onActions: (action: ACTIONS, attributes: ILocation) => void;
}

const ActionsModal: React.FC<IActionsModalProps> = ({
  isOpen,
  setIsOpen,
  action,
  location,
  onActions,
}) => {
  const [assetName, setAssetName] = React.useState<string>(
    location["Asset name"]
  );
  const [address, setAddress] = React.useState<string>(location.Address);
  const [area, setArea] = React.useState<string>(location.Area);
  const [tenant, setTenant] = React.useState<string>(location.Tenant);
  const [rentPaid, setRentPaid] = React.useState<string>(location["Rent Paid"]);
  const [coordinates, setCoordinates] = React.useState<any>(
    location.coordinates
  );

  useEffect(() => {
    setAssetName(location["Asset name"]);
    setAddress(location.Address);
    setArea(location.Area);
    setTenant(location.Tenant);
    setRentPaid(location["Rent Paid"]);
    setCoordinates(location.coordinates);
  }, [location]);

  return (
    <div className={`${isOpen ? "block" : "hidden"}`}>
      <div className="relative z-10">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      </div>

      <div className="fixed inset-0 z-20 overflow-y-auto ">
        <div className="flex min-h-full justify-center items-center">
          <div className="bg-gray-50  flex flex-col justify-between w-[70%] rounded-lg">
            <div className="flex items-center space-x-2 font-semibold border-b p-5">
              {action === ACTIONS.EDIT ? (
                <ArrowPathIcon className="h-10 text-blue-600" />
              ) : action === ACTIONS.CREATE ? (
                <PlusCircleIcon className="h-10 text-green-600" />
              ) : action === ACTIONS.DELETE ? (
                <ExclamationTriangleIcon className="h-12 text-red-600" />
              ) : (
                <MapIcon className="h-10 text-green-600" />
              )}
              <span className="text-3xl">{action}</span>
            </div>
            <div className="p-5">
              {action === ACTIONS.DELETE ? (
                "Are you sure you want to deactivate your account? All of your data will be permanently removed. This action cannot be undone."
              ) : action === ACTIONS.MAP ? (
                <MiniMap location={location} />
              ) : (
                <CreateEditFormModal
                  assetName={assetName}
                  address={address}
                  area={area}
                  tenant={tenant}
                  rentPaid={rentPaid}
                  coordinates={coordinates}
                  setAssetName={setAssetName}
                  setAddress={setAddress}
                  setArea={setArea}
                  setTenant={setTenant}
                  setRentPaid={setRentPaid}
                  setCoordinates={setCoordinates}
                />
              )}
            </div>
            <div className="flex border-t p-2 space-x-2 justify-end">
              {action !== ACTIONS.MAP && (
                <button
                  onClick={() =>
                    onActions(action, {
                      id: location.id,
                      "Asset name": assetName,
                      Address: address,
                      Area: area,
                      Tenant: tenant,
                      "Rent Paid": rentPaid,
                      coordinates: coordinates,
                    })
                  }
                  className={`border p-2 w-16 rounded-lg ${
                    action === ACTIONS.EDIT
                      ? "bg-blue-600"
                      : action === ACTIONS.DELETE
                      ? "bg-red-600"
                      : action === ACTIONS.CREATE
                      ? "bg-green-600"
                      : ""
                  } text-white hover:scale-110 duration-300`}>
                  {action}
                </button>
              )}
              <button
                onClick={() => setIsOpen(false)}
                className="border p-2 w-16 rounded-lg bg-slate-400 text-white  hover:scale-110 duration-300">
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface IMapModalProps {
  location: ILocation;
}
const googleMapKey = import.meta.env.VITE_FIREBASE_GOOGLE_MAPS_API_KEY;

const containerStyle = {
  width: "500px",
  height: "500px",
};

const center = {
  lat: -3.745,
  lng: -38.523,
};

const MiniMap: React.FC<IMapModalProps> = ({ location }) => {
  return (
    <div className="flex space-x-4">
      <LoadScript
        googleMapsApiKey={googleMapKey}
        libraries={["places"]}
        language="en">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={location.coordinates ? location.coordinates : center}
          zoom={location.coordinates ? 8 : 2}>
          {location.coordinates && <Marker position={location.coordinates} />}
        </GoogleMap>
        <div className="flex flex-col space-y-6 h-full">
          <p className="flex space-x-4">
            <span className="font-bold">Asset name:</span>
            <span>{location["Asset name"]}</span>
          </p>
          <p className="flex space-x-4">
            <span className="font-bold">Address:</span>
            <span>{location["Address"]}</span>
          </p>
          <p className="flex space-x-4">
            <span className="font-bold">Area:</span>
            <span>{location["Area"]}</span>
          </p>
          <p className="flex space-x-4">
            <span className="font-bold">Tenant:</span>
            <span>{location["Tenant"]}</span>
          </p>
          <p className="flex space-x-4">
            <span className="font-bold">Rent Paid:</span>
            <span>{location["Rent Paid"]}</span>
          </p>
        </div>
      </LoadScript>
    </div>
  );
};

export default ActionsModal;
