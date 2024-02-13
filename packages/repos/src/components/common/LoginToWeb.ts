import LoginPOM from "../../poms/LoginPOM";
import { Excel } from "core";

export class LoginToWeb {
  private excelData: any[];
  constructor(testDataPath: string) {
    this.excelData = new Excel(testDataPath).getSheetData("Data");
  }

  public run() {
    console.log("Running to LoginToWeb");
    // Needs to expose a function from core, i.e loadData
    // to get the data from excel sheet

    const loginPOM = new LoginPOM(this.excelData[0]);

    loginPOM.login();
  }
}
