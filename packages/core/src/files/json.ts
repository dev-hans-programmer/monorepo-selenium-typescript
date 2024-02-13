import fs from "fs/promises";

class Json {
  private data: Record<string, string>;
  constructor(private dataPath: string) {
    this.data = {};
    this.loadJson();
  }
  private async loadJson() {
    try {
      const jsonData = await fs.readFile(this.dataPath, "utf-8");
      this.data = JSON.parse(jsonData);
    } catch (error) {
      throw new Error(`Error loading JSON file: ${error}`);
    }
  }
  public get(key: string) {
    if (this.data[key]) return this.data[key];
    throw new Error(`No json key found ${key}`);
  }
}

export default Json;
