import Json from "./json";

class Settings {
  private jsonData: Json;
  constructor(dataPath: string) {
    this.jsonData = new Json(dataPath);
  }

  public getTimestamp() {
    return this.jsonData.get("timestamp");
  }
}

export default Settings;
