import { Button, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

interface LoginForm {
  username: string;
  password: string;
}

export default function Auth() {
  const { register, handleSubmit } = useForm<LoginForm>();
  const navigate = useNavigate();

  const onSubmit = (data: LoginForm) => {
    if (data.username === "admin" && data.password === "admin") {
      navigate("/dashboard");
    } else {
      alert("Incorrect credentials");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField {...register("username")} label="Username" required />
      <TextField
        {...register("password")}
        label="Password"
        type="password"
        required
      />
      <Button type="submit" variant="contained">
        Login
      </Button>
    </form>
  );
}
