export const uploadPicture = (event: any, target: any): void => {
  if (event.target.files[0]) {
    const reader = new FileReader();
    reader.onload = _ => (target.src = reader.result);
    reader.readAsDataURL(event.target.files[0]);
    target.obj = event.target.files[0];
    target.changed = true;
  }
};
