import Form from "../Form";
import type { UserDataType } from "../types";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { register, resetStatus } from "../../../store/authSlice";
import { Status } from "../../../globals/types/types";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Register = () => {
  const navigate = useNavigate();
  const { status } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();
  const handleRegister = async (data: UserDataType) => {
    dispatch(register(data));
  };
  useEffect(() => {
    if (status === Status.SUCCESS) {
      dispatch(resetStatus());
      navigate("/login");
    }
  }, [status, navigate, dispatch]);
 

  return (
    <div>
      <Form type="register" onSubmit={handleRegister} />
    </div>
  );
};

export default Register;
