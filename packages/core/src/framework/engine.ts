import Excel from "../files/excel";
import Settings from "../files/settings";
import path from "path";

export class Engine {
  private settings: Settings;

  constructor() {
    this.settings = new Settings(
      path.join(process.cwd(), "src", "settings.json")
    );
  }

  public async run() {
    console.log("Engine class running");
    try {
      const dataDirectory = path.join(process.cwd(), "src", "data");
      const masterDriverPath = path.join(dataDirectory, "MasterDriver.xlsx");
      const excel = new Excel(masterDriverPath);

      const scriptsSheetName = "scripts"; // Replace with the desired sheet name
      const sheetData = excel.getSheetData(scriptsSheetName);
      const componentsData = excel.getSheetData("components");

      await this.executeMarkedScripts(sheetData, dataDirectory, componentsData);
    } catch (error) {
      console.error("Error occurred during execution:", error);
    }
  }

  private async executeMarkedScripts(
    sheetData: any[],
    dataDirectory: string,
    componentsData: any[]
  ) {
    for (const row of sheetData) {
      const { Id, Name, Execution, BatchFile } = row;

      if (Execution === "Y") {
        console.log(`Script '${Name}' has been marked for execution`);
        const testDataPath = path.join(
          dataDirectory,
          "test-data",
          `${Id}-${BatchFile}.xlsx`
        );

        await this.executeComponents(componentsData, testDataPath);
      }
    }
  }

  private async executeComponents(sheetData: any[], testDataPath: string) {
    for (const row of sheetData) {
      const keys = Object.keys(row);
      for (const key of keys) {
        if (key.toLowerCase().startsWith("y")) {
          const spilitedKeys = row[key].split(".");
          const componentName = spilitedKeys[spilitedKeys.length - 1];

          // Have to dynamically import the module;
          const importedClass = (await import(`repos`)) as Record<any, any>;
          const desiredClass = importedClass[componentName];
          new desiredClass(testDataPath).run();
        }
      }
    }
  }
}
