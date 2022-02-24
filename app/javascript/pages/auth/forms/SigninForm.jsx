import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import useForm from '@app/hooks/useForm';
import {
  signinFormFields,
  signinFormKeys,
  formValidators,
} from '@app/constants/auth';
import withLogout from '@app/hoc/withLogout';

import AuthForm from './AuthForm';

function SignupForm() {
  const {
    handleFieldUpdate,
    handleSubmit,
    formErrors,
  } = useForm({
    baseUrl: '/api/sessions',
    formFields: signinFormKeys,
    formValidators,
  });
  const history = useHistory();

  const handleFormSwitch = useCallback(() => {
    history.push('/auth/signup');
  }, [history]);

  return (
    <AuthForm
      handleUpdate={handleFieldUpdate}
      handleSubmit={handleSubmit}
      formActionLabel="Log in"
      formSwitchLabel="Create Account"
      formFields={signinFormFields}
      handleFormSwitch={handleFormSwitch}
      cardClassName="auth-form__card--right"
      formErrors={formErrors}
    />
  );
}

export default withLogout(SignupForm);
