import * as xlsx from "xlsx";

class Excel {
  private workbook: xlsx.WorkBook;
  private excelData: Record<string, string>[] = [];

  constructor(filePath: string) {
    this.workbook = xlsx.readFile(filePath);
    this.getSheetData("scripts");
  }

  public getSheetNames(): string[] {
    return this.workbook.SheetNames;
  }

  public getSheetData(sheetName: string): any[] {
    const sheet = this.workbook.Sheets[sheetName];
    this.excelData = xlsx.utils.sheet_to_json(sheet);
    return this.excelData;
  }
  public getColumnData(columnName: string) {
    const desiredRow = this.excelData[0];
    return desiredRow[columnName] || "";
  }
}

export default Excel;
