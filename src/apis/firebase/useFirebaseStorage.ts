import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
  uploadString,
} from "firebase/storage";
import firebaseApp from "./firebaseApp";
import { UploadDataURLData, UploadFileResponse } from "./types";
import uuid from "react-uuid";
import { FirebaseError } from "firebase/app";
const useFirebaseStorage = () => {
  const storage = getStorage(firebaseApp);

  const uploadFile = async (
    file: File,
    path: string,
    name: string,
    progressCallback?: (progress: number) => void,
  ): Promise<UploadFileResponse> => {
    const storageRef = ref(storage, [path, name].join("/"));
    console.log("uploadFile - storageRef : ", storageRef);
    const uploadTask = uploadBytesResumable(storageRef, file);

    if (progressCallback) {
      uploadTask.on("state_changed", (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        progressCallback(progress);
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      });
    }
    try {
      await uploadTask;
      const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
      return { data: { storePath: uploadTask.snapshot.ref.fullPath, name, downloadURL } };
    } catch (e) {
      if (e instanceof FirebaseError) return { error: e };
      else return { error: { code: "", message: "데이터 등록 실패" } };
    }
  };
  const uploadMultipleFiles = async (
    files: File[],
    path: string,
    progressCallback?: (progress: number) => void,
  ): Promise<UploadFileResponse[]> => {
    try {
      console.log("files : ", files);
      const requests = files.map(async (file) => {
        return uploadFile(file, path, uuid(), progressCallback);
      });
      return Promise.all(requests);
    } catch (error) {
      throw { error };
    }
  };
  const uploadDataURL = async (
    data: string,
    path: string,
    name: string,
  ): Promise<UploadFileResponse> => {
    const storageRef = ref(storage, [path, name].join("/"));
    try {
      const res = await uploadString(storageRef, data, "data_url");
      const downloadURL = await getDownloadURL(res.ref);

      return { data: { storePath: res.ref.fullPath, name: res.ref.name, downloadURL } };
    } catch (e) {
      if (e instanceof FirebaseError) return { error: e };
      else return { error: { code: "", message: "uploadBase64Image - 데이터 등록 실패" } };
    }
  };

  const uploadDataURLs = async (
    path: string,
    datas: UploadDataURLData[],
  ): Promise<UploadFileResponse[]> => {
    try {
      const requests = datas.map(async (data) => {
        return await uploadDataURL(data.dataURL, path, data.name);
      });
      return Promise.all(requests);
    } catch (error) {
      throw { error };
    }
  };
  return { uploadFile, uploadMultipleFiles, uploadDataURL, uploadDataURLs };
};
export default useFirebaseStorage;
