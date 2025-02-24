export const downloadFile = (
  file: File | string,
  fileName: string = "file"
) => {
  const link = document.createElement("a");
  if (file instanceof File) {
    link.href = URL.createObjectURL(file);
    link.download = fileName;
    link.click();
    link.remove();
    return;
  }
  fetch(file)
    .then((response) => response.blob())
    .then((blob) => {
      link.href = URL.createObjectURL(blob);
      link.download = fileName;
      link.click();
      link.remove();
    })
    .catch(console.error);
};
