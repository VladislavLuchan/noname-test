import React, { FC, useState } from 'react'
import '../styles/Auth.scss'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useUserAuth } from '../router/UserAuthContext';
import { FirebaseError } from 'firebase/app';

type Inputs = {
  email: string
  password: string
}

const Login: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const [error, setError] = useState<string>("")

  const { logIn, user } = useUserAuth();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const UserCredential = await logIn?.(data.email, data.password);
      navigate('/');

    } catch (err: unknown) {
      console.error(err);
      setError('Email or password is wrong');
    }
  }

  return  !user ? (
    <div className="auth">
      <div className="auth__container">
        <h2>Sign In</h2>
        <form className="auth__form" onSubmit={handleSubmit(onSubmit)}>
          <label>
            <input {...register("email", { required: "Email is required" })} type="email" name="email" placeholder="Enter email" />
          </label>
          { errors?.email?.message && <p className="auth__error">{errors.email?.message}</p> }
          
          <label>
            <input {...register("password", { required: "Password is required" })} type="password" placeholder="Enter password" />
          </label>
          { errors?.password?.message && <p className="auth__error">{errors.password?.message}</p> }
          
          <input type="submit" style={{ marginTop: "5px" }} value="Sign In" />
          { error && <p className="auth__error" style={{ alignSelf: 'center' }}>{error}</p> }
          <Link to='/register'>Sign up</Link>
        </form>
      </div>
    </div>
  ): <Navigate to="/" />
}

export default Login
