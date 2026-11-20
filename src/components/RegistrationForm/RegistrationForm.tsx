import { yupResolver } from '@hookform/resolvers/yup';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { type InferType, object, string } from 'yup';

import { AuthContext } from '../../context/AuthContext';
import { auth } from '../../services/firebase';
import css from '../../styles/auth-form.module.css';

const registrationSchema = object({
  name: string().trim().required('Name is required'),
  email: string().trim().email('Enter a valid email address').required('Email is required'),
  password: string()
    .required('Password is required')
    .min(6, 'Password must contain at least 6 characters'),
});

type RegistrationValues = InferType<typeof registrationSchema>;

interface RegistrationFormProps {
  onSuccess: () => void;
}

export default function RegistrationForm({ onSuccess }: RegistrationFormProps) {
  const { setUser } = useContext(AuthContext);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<RegistrationValues>({
    resolver: yupResolver(registrationSchema),
    defaultValues: { name: '', email: '', password: '' },
  });

  const onSubmit = async ({ name, email, password }: RegistrationValues) => {
    let accountCreated = false;

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      accountCreated = true;

      await updateProfile(userCredential.user, {
        displayName: name,
      });
      setUser({
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        displayName: userCredential.user.displayName,
      });

      onSuccess();
    } catch {
      setError('root', {
        message: accountCreated
          ? 'Your account was created, but your name could not be saved.'
          : 'Could not create an account. Please try again.',
      });
    }
  };

  return (
    <>
      <h2 className={css.title} id="registration-title">
        Registration
      </h2>
      <p className={css.description}>
        Thank you for your interest in our platform! In order to register, we need some information.
        Please provide us with the following information.
      </p>
      <form className={css.form} onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className={css.field}>
          <input
            type="text"
            required
            aria-label="Name"
            placeholder="Name"
            autoComplete="name"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'registration-name-error' : undefined}
            {...register('name')}
          />
          {errors.name && (
            <p className={css.error} id="registration-name-error" role="alert">
              {errors.name.message}
            </p>
          )}
        </div>
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
            aria-describedby={errors.email ? 'registration-email-error' : undefined}
            {...register('email')}
          />
          {errors.email && (
            <p className={css.error} id="registration-email-error" role="alert">
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
            autoComplete="new-password"
            aria-invalid={Boolean(errors.password)}
            aria-describedby={errors.password ? 'registration-password-error' : undefined}
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
            <p className={css.error} id="registration-password-error" role="alert">
              {errors.password.message}
            </p>
          )}
        </div>
        <button className={css.submit} type="submit" disabled={isSubmitting}>
          Sign Up
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
