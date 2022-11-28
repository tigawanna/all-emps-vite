export const concatErrors = (err_res: any) => {
  const errs = err_res?.data?.data;
  // console.log("errs === ",err_res?.data?.message)
  if (errs && Object.keys(errs).length>0) {
    const err_key = Object.keys(errs);
    // console.log("errs keys",err_key)
    let err_str = "";
    err_key.forEach((key) => {
      err_str +=
        " - " + key + ":" + errs[key].message;
      ("");
    });
    return err_str;
  }
  return err_res?.data?.message;
};
