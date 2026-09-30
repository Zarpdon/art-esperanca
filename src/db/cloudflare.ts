const storageUrl = process.env.NEXT_PUBLIC_BUCKET_URL;

if (!storageUrl) {
  throw new Error("BUCKET_URL is not defined");
}

export const STORAGE_URL = storageUrl;
