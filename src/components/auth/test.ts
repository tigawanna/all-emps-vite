export const hey= "hey"


const err = {
  url: "https://emps.tigawanna.tech/api/users",
  status: 400,
  data: {
    code: 400,
    message:
      "Something went wrong while processing your request.",
    data: {
      email: {
        code: "validation_user_email_exists",
        message: "User email already exists.",
      },
      password: {
        code: "validation_user_email_",
        message: "User email already exists.",
      },
    },
  },
  isAbort: false,
  originalError: null,
  name: "ClientResponseError 400",
};


const concatErrors=(err_res:any)=>{
const errs = err_res.data.data;
const err_key = Object.keys(errs);
let err_str =""    
err_key.forEach((key)=>{
err_str += " * "+key+":"+errs[key].message; ""
})
return err_str
}
console.log(concatErrors(err))
