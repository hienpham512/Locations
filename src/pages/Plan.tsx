import React, { useEffect } from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import { InfoWindow } from "@react-google-maps/api";
import { getAllDataFromCollection } from "../actions/table";
import { ILocation } from "./Table";
import { Marker } from "@react-google-maps/api";

const googleMapKey = import.meta.env.VITE_FIREBASE_GOOGLE_MAPS_API_KEY;
const collectionName = import.meta.env.VITE_FIREBASE_COLLECTION_LOCATIONS;

const divStyle = {
  background: `white`,
  border: `1px solid #ccc`,
  padding: 15,
};

const containerStyle = {
  width: "100%",
  height: "100%",
};

const center = {
  lat: -3.745,
  lng: -38.523,
};

interface ILocationWithShowInfo extends ILocation {
  showInfo: boolean;
}

const Plan: React.FC = () => {
  const onLoad = (infoWindow: any) => {
    console.log("infoWindow: ", infoWindow);
  };
  const [data, setData] = React.useState<ILocationWithShowInfo[]>([]);
  const [duplicateData, setDuplicateData] = React.useState<
    ILocationWithShowInfo[]
  >([]);
  const [filterText, setFilterText] = React.useState<string>("");
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  const getData = async () => {
    const newData: ILocationWithShowInfo[] = (await getAllDataFromCollection(
      collectionName
    )) as ILocationWithShowInfo[];
    newData.forEach((item) => (item = { ...item, showInfo: false }));
    setData(newData);
    setDuplicateData(newData);
  };

  const handleFilter = (text: string) => {
    setFilterText(text);
    const newData = duplicateData.filter((item) =>
      item["Address"].toLowerCase().includes(text.toLowerCase())
    );
    setData(newData);
  };

  const handleShowInfo = (index: number) => {
    const newData = [...data];
    newData[index].showInfo = !newData[index].showInfo;
    setData(newData);
  };

  const onClose = (index: number) => {
    const newData = [...data];
    newData[index].showInfo = false;
    setData(newData);
  };

  useEffect(() => {
    getData();
    setIsLoading(false);
  }, []);

  return (
    <LoadScript
      googleMapsApiKey={googleMapKey}
      libraries={["places"]}
      language="en">
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={2}>
        {data.map((location, index) => {
          return location.showInfo ? (
            <InfoWindow
              onLoad={onLoad}
              onCloseClick={() => onClose(index)}
              position={location.coordinates}
              key={index}>
              <div className="flex flex-col justify-center items-start space-y-2">
                <span className="font-bold">{location["Asset name"]}</span>
                <p className="flex space-x-4">
                  <span>Address:</span>
                  <span>{location["Address"]}</span>
                </p>
                <p className="flex space-x-4">
                  <span>Area:</span>
                  <span>{location["Area"]}</span>
                </p>
                <p className="flex space-x-4">
                  <span>Tenant:</span>
                  <span>{location["Tenant"]}</span>
                </p>
                <p className="flex space-x-4">
                  <span>Rent Paid:</span>
                  <span>{location["Rent Paid"]}</span>
                </p>
              </div>
            </InfoWindow>
          ) : (
            <Marker
              position={location.coordinates}
              onClick={() => handleShowInfo(index)}
            />
          );
        })}

        <input
          type="text"
          placeholder="Search for a place"
          onChange={(e) => handleFilter(e.target.value)}
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
            // marginLeft: "-120px",
          }}
        />
      </GoogleMap>
    </LoadScript>
  );
};

export default React.memo(Plan);
