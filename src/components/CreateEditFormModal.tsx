import React from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import { Autocomplete } from "@react-google-maps/api";
import { Marker } from "@react-google-maps/api";

const googleMapKey = import.meta.env.VITE_FIREBASE_GOOGLE_MAPS_API_KEY;

const containerStyle = {
  width: "500px",
  height: "500px",
};

const center = {
  lat: -3.745,
  lng: -38.523,
};

interface ICreateEditFormModalProps {
  assetName: string;
  address: string;
  area: string;
  tenant: string;
  rentPaid: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  setAssetName: (assetName: string) => void;
  setAddress: (address: string) => void;
  setArea: (area: string) => void;
  setTenant: (tenant: string) => void;
  setRentPaid: (rentPaid: string) => void;
  setCoordinates: (coordinates: { lat: number; lng: number }) => void;
}

const CreateEditFormModal: React.FC<ICreateEditFormModalProps> = ({
  assetName,
  address,
  area,
  tenant,
  rentPaid,
  coordinates,
  setAssetName,
  setAddress,
  setArea,
  setTenant,
  setRentPaid,
  setCoordinates,
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
        <div className="col-span-8">
          <div className="font-semibold py-2">{address}</div>
          <MiniMap
            address={address}
            coordinates={coordinates}
            setAddress={setAddress}
            setCoordinates={setCoordinates}
          />
        </div>
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

interface IMiniMapProps {
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  setAddress: (address: string) => void;
  setCoordinates: (coordinates: { lat: number; lng: number }) => void;
}

const MiniMap: React.FC<IMiniMapProps> = ({
  address,
  coordinates,
  setAddress,
  setCoordinates,
}) => {
  const [autocomplete, setAutocomplete] = React.useState<any>(null);

  const onLoad = (autocomplete: any) => {
    setAutocomplete(autocomplete);
  };

  const onPlaceChanged = () => {
    if (autocomplete !== null) {
      //es
      setCoordinates(autocomplete.getPlace().geometry.location.toJSON());
      setAddress(autocomplete.getPlace().formatted_address);
    }
  };

  return (
    <LoadScript
      googleMapsApiKey={googleMapKey}
      libraries={["places"]}
      language="en">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={coordinates ? coordinates : center}
        zoom={coordinates ? 8 : 2}>
        {coordinates && <Marker position={coordinates} />}

        <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
          <input
            type="text"
            placeholder="Search for a place"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            style={{
              boxSizing: `border-box`,
              border: `1px solid transparent`,
              width: `30%`,
              height: `32px`,
              padding: `20px`,
              borderRadius: `10px`,
              marginTop: `10px`,
              boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
              fontSize: `14px`,
              outline: `none`,
              textOverflow: `ellipses`,
              position: "absolute",
              left: "40%",
            }}
          />
        </Autocomplete>
      </GoogleMap>
    </LoadScript>
  );
};

export default CreateEditFormModal;
