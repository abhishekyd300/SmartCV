import ImageKit from "imagekit";
import dotenv from "dotenv";
dotenv.config();

function getImageKitInstance() {
  const publicKey = process.env.IMAGEKIT_PUBLIC_KEY;
  const privateKey = process.env.IMAGEKIT_PRIVATE_KEY;
  const urlEndpoint = process.env.IMAGEKIT_URL_ENDPOINT;

  if (!publicKey || !privateKey || !urlEndpoint) {
    return null;
  }

  return new ImageKit({
    publicKey,
    privateKey,
    urlEndpoint,
  });
}

/**
 * Uploads an image buffer or base64 to ImageKit.io
 * @param {Object} params
 * @param {Buffer|string} params.fileBuffer - Buffer or base64 string
 * @param {string} params.fileName - file name to store
 * @param {string} [params.folder] - target folder in ImageKit (defaults to /smartcv)
 */
export async function uploadToImageKit({ fileBuffer, fileName, folder = "/smartcv" }) {
  const ik = getImageKitInstance();
  if (!ik) {
    throw new Error(
      "ImageKit credentials missing"
    );
  }

  const uploadOptions = {
    file: fileBuffer,
    fileName: fileName || `photo_${Date.now()}`,
    folder: folder.startsWith("/") ? folder : `/${folder}`,
    useUniqueFileName: true,
  };

  const response = await ik.upload(uploadOptions);
  return response;
}

/**
 * Returns auth parameters if frontend direct upload is needed
 */
export function getAuthenticationParameters() {
  const ik = getImageKitInstance();
  if (!ik) {
    throw new Error("ImageKit credentials missing");
  }
  return ik.getAuthenticationParameters();
}
