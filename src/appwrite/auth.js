import envVars from "../envVars/envVars";
import { Client, Account, ID } from "appwrite";

//Creating an Authorization Service to implement Sign-Up, Sign-in, and Sign-out.
class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(envVars.appWriteURL)
      .setProject(envVars.appWriteProjectID); // Setting up client with the provided appwrite Client module.
    this.account = new Account(this.client); // Setting up account with the provided appwrite Account module.
  }

  //Create Account
  async createAccount({ email, name, password }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        //Call Login method if the user already exists
        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      //Customize handling error if you want
      console.log("Appwrite Service :: createAccount :: error", error);
      throw new Error(error);
    }
  }

  //Login
  async login({ email, password }) {
    try {
      const session = await this.account.createEmailSession(email, password);
      return session;
    } catch (error) {
      //Customize handling error if you want
      console.log("Appwrite Service :: login :: error", error);
      throw new Error(error);
    }
  }

  //Get the current user for a session
  async getCurrentUser() {
    try {
      const user = await this.account.get();
      return user;
    } catch (error) {
      //Customize handling error if you want
      console.log("Appwrite Service :: getCurrentUser :: error", error);
      throw new Error(error);
    }
  }

  //Logout
  async logout() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      //Customize handling error if you want
      console.log("Appwrite service :: logout :: error", error);
      throw new Error(error);
    }
  }
}

const authService = new AuthService();
export default authService;
