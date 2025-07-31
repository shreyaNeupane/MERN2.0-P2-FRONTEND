import { useDispatch } from "react-redux"
import  Form  from "../Form"
import type { UserDataType } from "../types"
import axios from "axios"


const Register = () => {
   const dispatch = useDispatch()
  const handleRegister = async (data:UserDataType ) => {
    console.log("received user data:", data);
    // dispatch(register(data))
    const response = await axios.post('http://localhost:3000/register',data)
  }
  return (
    <div>
      <Form type="register" onSubmit={handleRegister}/>
    </div>
  )
}

export default Register
