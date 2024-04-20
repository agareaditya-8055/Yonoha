// Importing necessary modules and configuration
import { ID, Client, Account } from "appwrite";
import conf from "../conf/conf";

// AuthService class
export class AuthService {
  // Initializing client and account
  client = new Client();
  account;

  constructor() {
    // Setting endpoint and project for the client
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);

    // Creating a new account with the client
    this.account = new Account(this.client);
  }

  // Method to create a new account
  async createAccount({ email, password, name }) {
    try {
      // Creating a new user account
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );

      // If account creation is successful, log the user in
      if (userAccount) {
        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      throw error;
    }
  }

  // Method to log in a user
  async login({ email, password }) {
    try {
      // Creating a new email session for the user
      const login = await this.account.createEmailSession(email, password);
      return login;
    } catch (error) {
      throw error;
    }
  }

  // Method to get the current user
  async getCurrentUser() {
    try {
      // Getting the current user
      return await this.account.get();
    } catch (error) {
      throw error;
    }
  }

  // Method to log out a user
  async logout() {
    try {
      // Deleting all sessions for the user
      return await this.account.deleteSessions();
    } catch (error) {
      throw error;
    }
  }
}

// Creating a new AuthService instance
const authService = new AuthService();

// Exporting the AuthService instance
export default authService;
