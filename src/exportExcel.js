import React from "react";
import { columnsExcel } from "./constant";
import ExcelJS from "exceljs";
import FileSaver from "file-saver";
const ExportExcel = ({
  sheetname,
  filename,
  dataRowExcel,
  datacolExcel,
  onClickfn,
}) => {
  async function exportDataExcel() {
    //tạo mới 1 workbook
    const workbook = new ExcelJS.Workbook();
    //tạo mới 1 worksheet tên Mysheet, màu tab sheet, chiều cao hàng
    // const sheet = workbook.addWorksheet("MySheet");
    const sheet = workbook.addWorksheet(`${sheetname}`);

    //đóng băng hàng đầu
    // sheet.views = [
    //   {state: 'frozen'}
    // ];

    //thêm cột cho sheet
    // sheet.columns = [
    //   { header: "Id", key: "id", width: 10 },
    //   { header: "Name", key: "name", width: 12 },
    //   { header: "dob.", key: "dob", width: 20 }
    // ];

    sheet.columns = columnsExcel;
    //thêm các hàng cho sheet (có rất nhiều các thêm xem trong npm docs)
    //C1
    // sheet.addRow({id: 1, name: 'John Doe', dob: new Date(1970,1,1)});
    // sheet.addRow({id: 2, name: 'Jane Doe', dob: new Date(1965,1,7)});

    //C2 - rows các object
    // const rows = [
    //   { id: 1, name: "Barbara", dob: 111111111 },
    //   { id: 2, name: "Barbara", dob: 62222222222 },
    //   { id: 3, name: "Barbara", dob: 3333333333 }
    // ];
    // sheet.addRows(rows);
    sheet.addRows(dataRowExcel);

    //lap qua tat ca nhung o hien hanh cua cot
    for (let i = 1; i <= columnsExcel.length; i++) {
      sheet.getColumn(i).eachCell(function (cell, rowNumber) {
        cell.style.font = { name: "Comic Sans MS" };
        cell.alignment = { vertical: "middle", horizontal: "center" };
        cell.style.border = {
          top: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "thin" },
        };
      });
    }

    //dowload file
    const buffer = await workbook.xlsx.writeBuffer();
    saveFileDowload(buffer);

    // }
  }

  function saveFileDowload(data) {
    let blob = new Blob([data], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;",
    });
    // FileSaver.saveAs(blob, "Myfile.xlsx");
    FileSaver.saveAs(blob, `${filename}`);
  }

  return (
    <button
      onClick={onClickfn ? onClickfn : exportDataExcel}
      sheetname={sheetname}
      filename={filename}
    >
      Export
    </button>
  );
};

export default ExportExcel;
