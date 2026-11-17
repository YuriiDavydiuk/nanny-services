import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { type InferType, object, string } from 'yup';

import css from '../../styles/auth-form.module.css';

const loginSchema = object({
  email: string().trim().email('Enter a valid email address').required('Email is required'),
  password: string()
    .required('Password is required')
    .min(6, 'Password must contain at least 6 characters'),
});

type LoginValues = InferType<typeof loginSchema>;

export default function LoginForm() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginValues>({
    resolver: yupResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = () => {
    setError('root', { message: 'Sign-in is not available yet. Please try again later.' });
  };

  return (
    <>
      <h2 className={css.title} id="login-title">
        Log In
      </h2>
      <p className={css.description}>
        Welcome back! Please enter your credentials to access your account and continue your
        babysitter search.
      </p>
      <form className={css.form} onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className={css.field}>
          <input
            type="email"
            required
            aria-label="Email"
            placeholder="Email"
            autoComplete="email"
            autoCapitalize="none"
            spellCheck={false}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'login-email-error' : undefined}
            {...register('email')}
          />
          {errors.email && (
            <p className={css.error} id="login-email-error" role="alert">
              {errors.email.message}
            </p>
          )}
        </div>
        <div className={css.field}>
          <input
            className={css.password}
            type={isPasswordVisible ? 'text' : 'password'}
            required
            aria-label="Password"
            placeholder="Password"
            autoComplete="current-password"
            aria-invalid={Boolean(errors.password)}
            aria-describedby={errors.password ? 'login-password-error' : undefined}
            {...register('password')}
          />
          <button
            className={css.visibility}
            type="button"
            aria-label={isPasswordVisible ? 'Hide password' : 'Show password'}
            aria-pressed={isPasswordVisible}
            onClick={() => setIsPasswordVisible(!isPasswordVisible)}
          >
            <img src={isPasswordVisible ? '/icons/eye.svg' : '/icons/eye-off.svg'} alt="" />
          </button>
          {errors.password && (
            <p className={css.error} id="login-password-error" role="alert">
              {errors.password.message}
            </p>
          )}
        </div>
        <button className={css.submit} type="submit" disabled={isSubmitting}>
          Log In
        </button>
        {errors.root && (
          <p className={css.error} role="alert">
            {errors.root.message}
          </p>
        )}
      </form>
    </>
  );
}
