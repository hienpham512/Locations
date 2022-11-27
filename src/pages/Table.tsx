import React, { useEffect } from "react";
import * as XLSX from "xlsx";
import DataTable, { defaultThemes } from "react-data-table-component";
import {
  PencilSquareIcon,
  TrashIcon,
  MapPinIcon,
  MagnifyingGlassCircleIcon,
} from "@heroicons/react/24/outline";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
interface ILocation {
  "Asset name": string;
  Address: string;
  Area: number;
  Tenant: string;
  "Rent Paid": number;
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

const Table = () => {
  const [data, setData] = React.useState<ILocation[]>([]);
  const [duplicateData, setDuplicateData] = React.useState<ILocation[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [filterText, setFilterText] = React.useState("");

  const handleFilter = (text: string) => {
    setFilterText(text);
    const newData = duplicateData.filter((item) =>
      item["Address"].toLowerCase().includes(text.toLowerCase())
    );
    setData(newData);
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
      selector: () => (
        <div className="flex space-x-3">
          <button className="rounded-lg bg-blue-600 text-white py-1 px-2 flex items-center hover:scale-110 duration-300 my-2 mx-1">
            <PencilSquareIcon className="h-5" />
            <span>Edit</span>
          </button>
          <button className="rounded-lg bg-red-600 text-white py-1 px-2 flex items-center hover:scale-110 duration-300 my-2 mx-1">
            <TrashIcon className="h-5" />
            <span>Edit</span>
          </button>
          <button className="rounded-lg bg-green-600 text-white py-1 px-2 flex items-center hover:scale-110 duration-300 my-2 mx-1">
            <MapPinIcon className="h-5" />
            <span>Map</span>
          </button>
        </div>
      ),
      width: "280px",
    },
  ];

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
  React.useEffect(() => {
    readExcel();
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
        subHeaderComponent={<FilterComponent />}
        customStyles={customStyles}
        columns={columns}
        data={data}
      />
    </div>
  );
};

export default Table;
