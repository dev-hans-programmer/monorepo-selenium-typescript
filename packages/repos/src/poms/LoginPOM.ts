const Cols = {
  USERNAME: "Username",
  PASSWORD: "Password",
};
class LoginPOM {
  constructor(private data: Record<string, string>) {}

  public login() {
    console.log("Login is happening updated", this.data);
  }
}

export default LoginPOM;
