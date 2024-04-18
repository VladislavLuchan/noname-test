import React, { FC, useState } from 'react'
import '../styles/Auth.scss'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useUserAuth } from '../router/UserAuthContext';

type Inputs = {
  email: string
  name: string
  password: string
  passwordConfirm: string
}

const Register: FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>()

  const navigate = useNavigate();
  const { signUp, user } = useUserAuth();
  const [error, setError] = useState<string>("")


  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      await signUp?.(data.name, data.email, data.password);
      navigate('/');
    } catch (err) {
      console.error(err);
      setError('Email or password is wrong');
    }
  }

  return !user ? (
    <div className="auth">
      <div className="auth__container">
        <h2>Sign Up</h2>
        <form className="auth__form" onSubmit={handleSubmit(onSubmit)}>
          <label>
            <input {...register("email", { required: "Email is required" })} type="email" name="email" placeholder="Enter email" />
          </label>
          {errors.email?.message && <p className="auth__error">{errors.email?.message}</p>}
          
          <label>
            <input {...register("name", { required: "Username is required" })} type="text" name="name" placeholder="Enter username" />
          </label>
          {errors.name?.message && <p className="auth__error">{errors.name?.message}</p>}
          
          <label>
            <input 
              {...register("password", 
              {
                required: "Password is required and should contain at least 8 characters, at least 1 letter and 1 capital letter",
                pattern: /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$/
              })} 
              type="password"
              placeholder="Enter password" 
            />
          </label>
          { errors?.password?.message && <p className="auth__error">{errors.password?.message}</p> }

          <label>
            <input
              {...register("passwordConfirm", { 
                required: "Passwords should be the same",
                validate: (val: string) => {
                  if (watch('password') != val) {
                    return "Your passwords do no match";
                  }
                },
              })} 
              type="password" 
              placeholder="Repeat password" 
            />
          </label>
          { errors?.passwordConfirm?.message && <p className="auth__error">{errors.passwordConfirm?.message}</p> }

          <input type="submit" style={{ marginTop: "5px" }} value="Sign Up" />
          { error && <p className="auth__error" style={{ alignSelf: 'center' }}>{error}</p> }
          <Link to='/login'>Sign in</Link>
        </form>
      </div>
    </div>
  ): <Navigate to="/" />
}

export default Register
