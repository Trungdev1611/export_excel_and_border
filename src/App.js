import "./styles.css";

import ExportExcel from "./exportExcel";
import axios from "axios";
import { useEffect, useState } from "react";
export default function App() {
  const [dataRowExcel, setDataRowExcel] = useState([]);
  useEffect(() => {
    async function getDataExcel() {
      try {
        let res = await axios.get("https://retoolapi.dev/ZfWdYC/export_excel");
        let data = res.data;
        console.log("data::", data);
        let datamap =
          data.length > 0 &&
          data.map((ele) => {
            return { ...ele, stt: ele.id };
          });
        setDataRowExcel(datamap);
      } catch (error) {
        throw error;
      }
    }
    getDataExcel();
  }, []);

  return (
    <div className="App">
      <ExportExcel
        dataRowExcel={dataRowExcel}
        sheetname="dataExport"
        filename={"exportExcel.xlsx"}
      />
    </div>
  );
}
