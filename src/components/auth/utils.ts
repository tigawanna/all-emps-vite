export const concatErrors = (err_res: any) => {
  const errs = err_res?.data?.data;
  if (errs) {
    const err_key = Object.keys(errs);
    let err_str = "";
    err_key.forEach((key) => {
      err_str +=
        " - " + key + ":" + errs[key].message;
      ("");
    });
    return err_str;
  }
  return "";
};
