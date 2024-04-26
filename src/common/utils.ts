export const imageToDataURL = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export const imagesToDataURL = async (files: File[]): Promise<string[]> => {
  const promises = files.map((file) => imageToDataURL(file));
  return Promise.all(promises);
};
