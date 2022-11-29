import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import DataTable, { defaultThemes } from "react-data-table-component";
import {
  PencilSquareIcon,
  TrashIcon,
  MapPinIcon,
  MagnifyingGlassCircleIcon,
  PlusCircleIcon,
  ArrowDownTrayIcon,
} from "@heroicons/react/24/outline";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import ActionsModal from "../components/ActionsModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  addToDB,
  getAllDataFromCollection,
  deleteLocationId,
  updateLocationById,
} from "../actions/table";
import { v4 as uuidv4 } from "uuid";

export interface ILocation {
  id: string;
  "Asset name": string;
  Address: string;
  Area: string;
  Tenant: string;
  "Rent Paid": string;
}

export enum ACTIONS {
  EDIT = "Edit",
  DELETE = "Delete",
  CREATE = "Create",
}

const collectionName = "locations";
const customStyles = {
  header: {
    style: {
      minHeight: "56px",
    },
  },
  headRow: {
    style: {
      borderTopStyle: "solid",
      borderTopWidth: "1px",
      borderTopColor: defaultThemes.default.divider.default,
    },
  },
  headCells: {
    style: {
      "&:not(:last-of-type)": {
        borderRightStyle: "solid",
        borderRightWidth: "1px",
        borderRightColor: defaultThemes.default.divider.default,
      },
    },
  },
  cells: {
    style: {
      "&:not(:last-of-type)": {
        borderRightStyle: "solid",
        borderRightWidth: "1px",
        borderRightColor: defaultThemes.default.divider.default,
      },
    },
  },
};

const Table: React.FC = () => {
  const [data, setData] = useState<ILocation[]>([]);
  const [duplicateData, setDuplicateData] = useState<ILocation[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [filterText, setFilterText] = useState("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [action, setAction] = useState<ACTIONS>(ACTIONS.CREATE);
  const [location, setLocation] = useState<ILocation>({
    id: "",
    "Asset name": "",
    Address: "",
    Area: "",
    Tenant: "",
    "Rent Paid": "",
  });

  const handleFilter = (text: string) => {
    setFilterText(text);
    const newData = duplicateData.filter((item) =>
      item["Address"].toLowerCase().includes(text.toLowerCase())
    );
    setData(newData);
  };

  const onActions = async (action: ACTIONS, attributes: ILocation) => {
    setIsOpen(false);
    if (action === ACTIONS.DELETE) {
      try {
        await deleteLocationId(collectionName, attributes.id);
        let newData = data.filter((item) => item.id !== attributes.id);
        setData(newData);
        setDuplicateData(newData);
        toast.success("Location deleted successfully");
        setIsOpen(false);
      } catch {
        toast.error("Error deleting location, please try again later");
      }
    } else if (action === ACTIONS.EDIT) {
      try {
        let newData = data;
        newData.forEach((item) => {
          if (item.id === attributes.id) {
            item["Asset name"] = attributes!["Asset name"];
            item.Address = attributes!.Address;
            item.Area = attributes!.Area;
            item.Tenant = attributes!.Tenant;
            item["Rent Paid"] = attributes!["Rent Paid"];
          }
        });
        updateLocationById(collectionName, attributes, attributes.id);
        setData(newData);
        setDuplicateData(newData);
        toast.success("Location edited successfully");
        setIsOpen(false);
      } catch {
        toast.error("Error editing location, please try again later");
      }
    } else if (action === ACTIONS.CREATE) {
      try {
        const newLocation = {
          ...attributes,
        } as ILocation;
        const newData = [...data, newLocation] as ILocation[];
        addToDB(collectionName, newLocation, uuidv4());
        setData(newData);
        setDuplicateData(newData);
        toast.success("Location created successfully");
        setIsOpen(false);
      } catch {
        toast.error("Error creating location, please try again later");
      }
    }
  };

  const FilterComponent: React.FC = () => (
    <div className="flex w-full items-center">
      <input
        type="text"
        value={filterText}
        placeholder="filter by address"
        className="border-2 p-2 text-sm"
        onChange={(e) => handleFilter(e.target.value)}
        autoFocus
      />
      <button className="p-2 bg-cyan-800 text-white rounded-sm">
        <MagnifyingGlassCircleIcon className="h-6" />
      </button>
    </div>
  );

  const columns = [
    {
      name: "Asset name",
      selector: (row: ILocation) => (
        <Tippy content={`${row["Asset name"]}`}>
          <span>{row["Asset name"]}</span>
        </Tippy>
      ),
      sortable: true,
      width: "150px",
    },
    {
      name: "Address",
      selector: (row: ILocation) => (
        <Tippy content={`${row["Address"]}`}>
          <span>{row["Address"]}</span>
        </Tippy>
      ),
      sortable: true,
    },
    {
      name: "Area",
      selector: (row: ILocation) => (
        <Tippy content={`${row["Area"]}`}>
          <span>{row["Area"]}</span>
        </Tippy>
      ),
      sortable: true,
      width: "80px",
    },
    {
      name: "Tenant",
      selector: (row: ILocation) => (
        <Tippy content={`${row["Tenant"]}`}>
          <span>{row["Tenant"]}</span>
        </Tippy>
      ),
      sortable: true,
      width: "150px",
    },
    {
      name: "Rent Paid",
      selector: (row: ILocation) => (
        <Tippy content={`${row["Rent Paid"]}`}>
          <span>{row["Rent Paid"]}</span>
        </Tippy>
      ),
      sortable: true,
      width: "120px",
    },
    {
      name: "Actions",
      selector: (row: ILocation) => (
        <div className="flex space-x-1">
          <button
            onClick={() => {
              setAction(ACTIONS.EDIT);
              setLocation(row);
              setIsOpen(true);
            }}
            className="rounded-lg bg-blue-600 text-white px-2 py-1 flex items-center hover:scale-110 duration-300 my-2 ">
            <PencilSquareIcon className="h-5" />
            <span>Edit</span>
          </button>
          <button
            onClick={() => {
              setAction(ACTIONS.DELETE);
              setLocation(row);
              setIsOpen(true);
            }}
            className="rounded-lg bg-red-600 text-white px-2 py-1 flex items-center hover:scale-110 duration-300 my-2 ">
            <TrashIcon className="h-5" />
            <span>Delete</span>
          </button>
          <button className="rounded-lg bg-green-600 text-white px-2 py-1 flex items-center hover:scale-110 duration-300 my-2">
            <MapPinIcon className="h-5" />
            <span>Map</span>
          </button>
        </div>
      ),
      width: "280px",
    },
  ];

  const SubHeaderComponent: React.FC = () => (
    <div className="flex justify-end flex-col">
      <button
        onClick={() => {
          setAction(ACTIONS.CREATE);
          setLocation({
            id: "",
            "Asset name": "",
            Address: "",
            Area: "",
            Tenant: "",
            "Rent Paid": "",
          });
          setIsOpen(true);
        }}
        className="text-white p-2 rounded-lg bg-green-600 flex items-center justify-center my-2 hover:scale-110 duration-300">
        <PlusCircleIcon className="h-8" />
        <span className="ml-1">Add new location</span>
      </button>
      <button
        onClick={() => {
          writeExcel(data);
        }}
        className="text-white p-2 rounded-lg bg-yellow-600 flex items-center justify-center my-2 hover:scale-110 duration-300">
        <ArrowDownTrayIcon className="h-8" />
        <span className="ml-1">Download xlsx file</span>
      </button>
      <FilterComponent />
    </div>
  );

  const writeExcel = (newData: ILocation[]) => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(newData);
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, "location.xlsx", {
      bookType: "xlsx",
      type: "file",
    });
  };

  const getData = async () => {
    const newData = await getAllDataFromCollection(collectionName);
    setData(newData);
    setDuplicateData(newData);
  };
  useEffect(() => {
    getData();
    setIsLoading(false);
  }, []);
  return (
    <div className="border m-5">
      <DataTable
        title="Location list"
        pagination
        subHeader
        persistTableHead
        striped
        highlightOnHover
        pointerOnHover
        dense
        subHeaderComponent={<SubHeaderComponent />}
        customStyles={customStyles}
        columns={columns}
        data={data}
      />
      <ActionsModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        action={action}
        location={location}
        onActions={onActions}
      />
      <ToastContainer />
    </div>
  );
};

export default Table;
