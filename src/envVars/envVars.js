const envVars = {
  appWriteURL: String(import.meta.env.VITE_APPWRITE_URL),
  appWriteProjectID: String(import.meta.env.VITE_PROJECT_ID),
  appWriteDatabaseID: String(import.meta.env.VITE_DATABASE_ID),
  appWriteCollectionID: String(import.meta.env.VITE_COLLECTION_ID),
  appWriteBucketID: String(import.meta.env.VITE_BUCKET_ID),
};

export default envVars;
