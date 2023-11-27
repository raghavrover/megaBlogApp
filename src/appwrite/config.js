import envVars from "../envVars/envVars";
import { Client, ID, Databases, Storage, Query } from "appwrite";

//Creating Database and Storage Services to implement CRUD operations and retrieve Files from storage buckets.
class Service {
  client = new Client();
  databases;
  storage;

  constructor() {
    this.client
      .setEndpoint(envVars.appWriteURL)
      .setProject(envVars.appWriteProjectID); // Setting up client with the provided appwrite Client module.
    this.databases = new Databases(this.client); // Setting up a database with the provided appwrite Database module.
    this.storage = new Storage(this.client); // Setting up a storage with the provided appwrite Storage module.
  }

  //Create a post
  async createPost({ title, slug, content, featuredImage, userId, status }) {
    try {
      const response = await this.databases.createDocument(
        envVars.appWriteDatabaseID,
        envVars.appWriteCollectionID,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
          userId,
        }
      );
      return response;
    } catch (error) {
      console.log("Appwrite service :: createPost :: error", error);
    }
  }

  //Update the post
  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      const response = await this.databases.updateDocument(
        envVars.appWriteDatabaseID,
        envVars.appWriteCollectionID,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
        }
      );
      return response;
    } catch (error) {
      console.log("Appwrite service :: updatePost :: error", error);
    }
  }

  //Delete a post
  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        envVars.appWriteDatabaseID,
        envVars.appWriteCollectionID,
        slug
      );
      return true; // If the post deleted successfully.
    } catch (error) {
      console.log("Appwrite service :: deletePost :: error", error);
      return false; // If the post is not deleted.
    }
  }

  //Get a post
  async getPost(slug) {
    try {
      const response = await this.databases.getDocument(
        envVars.appWriteDatabaseID,
        envVars.appWriteCollectionID,
        slug
      );
      return response;
    } catch (error) {
      console.log("Appwrite service :: getPost :: error", error);
      return false;
    }
  }

  //Get all posts by querying
  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      const response = await this.databases.listDocuments(
        envVars.appWriteDatabaseID,
        envVars.appWriteCollectionID,
        queries
      );
      return response;
    } catch (error) {
      console.log("Appwrite service :: getAllPosts :: error", error);
      return false;
    }
  }

  //Upload file
  async uploadFile(file) {
    try {
      const response = await this.storage.createFile(
        envVars.appWriteBucketID,
        ID.unique(),
        file
      );
      return response;
    } catch (error) {
      console.log("Appwrite service :: uploadFile :: error", error);
      return false;
    }
  }

  //Delete file
  async deleteFile(fileId) {
    try {
      const response = await this.storage.deleteFile(
        envVars.appWriteBucketID,
        fileId
      );
      return response;
    } catch (error) {
      console.log("Appwrite service :: deleteFile :: error", error);
      return false;
    }
  }

  //Get file preview(this is a fast action so we're not using async/await)
  getFilePreview(fileId) {
    const response = this.storage.deleteFile(envVars.appWriteBucketID, fileId);
    return response;
  }
}

const service = new Service();
export default service;
