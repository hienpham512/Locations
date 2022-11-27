import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import DataTable, { defaultThemes } from "react-data-table-component";
import {
  PencilSquareIcon,
  TrashIcon,
  MapPinIcon,
  MagnifyingGlassCircleIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import ActionsModal from "../components/ActionsModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export interface ILocation {
  id?: number;
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
    "Asset name": "",
    Address: "",
    Area: "",
    Tenant: "",
    "Rent Paid": "",
  });
  const [dataUpdated, setDataUpdated] = useState<ILocation[]>([]);

  const handleFilter = (text: string) => {
    setFilterText(text);
    const newData = duplicateData.filter((item) =>
      item["Address"].toLowerCase().includes(text.toLowerCase())
    );
    setData(newData);
  };

  const onActions = (action: ACTIONS, attributes?: ILocation) => {
    setIsOpen(false);
    if (action === ACTIONS.DELETE) {
      try {
        let newData = dataUpdated.filter((item) => item.id !== attributes?.id);
        setData(newData);
        setDuplicateData(newData);
        toast.success("Location deleted successfully");
        setIsOpen(false);
      } catch {
        toast.error("Error deleting location, please try again later");
      }
    } else if (action === ACTIONS.EDIT) {
      try {
        let newData = dataUpdated;
        newData.forEach((item) => {
          if (item.id === attributes?.id) {
            item["Asset name"] = attributes!["Asset name"];
            item.Address = attributes!.Address;
            item.Area = attributes!.Area;
            item.Tenant = attributes!.Tenant;
            item["Rent Paid"] = attributes!["Rent Paid"];
          }
        });
        setData(newData);
        setDuplicateData(newData);
        toast.success("Location edited successfully");
        setIsOpen(false);
      } catch {
        toast.error("Error editing location, please try again later");
      }
    } else if (action === ACTIONS.CREATE) {
      try {
        const newData = [
          ...dataUpdated,
          { ...attributes, id: dataUpdated.length + 1 },
        ] as ILocation[];
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
    <div className="flex items-center">
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
        <span className="ml-1">Add new map</span>
      </button>
      <FilterComponent />
    </div>
  );

  const readExcel = () => {
    const url = "../../src/excelFile/location.xlsx";
    const oReq = new XMLHttpRequest();
    oReq.open("GET", url, true);
    oReq.responseType = "arraybuffer";

    oReq.onload = (e) => {
      const arraybuffer = oReq.response;
      const data = new Uint8Array(arraybuffer);
      const arr: any[] = [];
      data.forEach((d, index) => {
        arr[index] = String.fromCharCode(d);
      });
      const bstr = arr.join("");
      const workbook = XLSX.read(bstr, {
        type: "binary",
      });
      const first_sheet_name = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[first_sheet_name];
      setData(
        XLSX.utils.sheet_to_json(worksheet, {
          raw: true,
        })
      );
      setDuplicateData(
        XLSX.utils.sheet_to_json(worksheet, {
          raw: true,
        })
      );
    };
    oReq.send();
  };
  useEffect(() => {
    readExcel();
    setIsLoading(false);
  }, []);
  useEffect(() => {
    let newData = data;
    newData.forEach((item, index) => {
      item.id = index;
      item["Rent Paid"] = item["Rent Paid"].toString();
      item["Area"] = item["Area"].toString();
    });
    setDataUpdated(newData);
    setDuplicateData(newData);
  }, [data]);

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
        data={dataUpdated}
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
