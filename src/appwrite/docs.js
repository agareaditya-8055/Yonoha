// Importing necessary modules and configuration
import { Client, Databases, ID, Query } from "appwrite";
import conf from "../conf/conf";

// DocumentService class
export class DocumentService {
  // Initializing client and databases
  client = new Client();
  databases;
  constructor() {
    // Setting endpoint and project for the client
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);

    // Creating a new Databases instance with the client
    this.databases = new Databases(this.client);
  }

  // Method to create cart items
  async createCartItems({
    id,
    name,
    price,
    defaultPrice,
    description,
    imageId,
    userId,
  }) {
    try {
      // Creating a new document in the database
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        id,
        {
          name,
          price,
          defaultPrice,
          description,
          imageId,
          userId,
        }
      );
    } catch (error) {
      throw error;
    }
  }

  // Method to show cart items
  async showCartItems(userId) {
    try {
      // Listing documents in the database that match the query
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        [Query.equal("userId", userId)]
      );
    } catch (error) {
      throw error;
    }
  }

  // Method to delete cart items
  async deleteCartItems(itemId) {
    try {
      // Deleting a document from the database
      return await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        itemId
      );
    } catch (error) {
      throw error;
    }
  }
}

// Creating a new DocumentService instance
const docService = new DocumentService();

// Exporting the DocumentService instance
export default docService;
