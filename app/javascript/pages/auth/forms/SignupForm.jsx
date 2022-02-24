import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import useForm from '@app/hooks/useForm';
import {
  signupFormFields,
  signupFormKeys,
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
    baseUrl: '/api/registrations',
    formFields: signupFormKeys,
    formValidators,
  });
  const history = useHistory();

  const handleFormSwitch = useCallback(() => {
    history.push('/auth/signin');
  }, [history]);

  return (
    <AuthForm
      handleUpdate={handleFieldUpdate}
      handleSubmit={handleSubmit}
      formActionLabel="Register"
      formSwitchLabel="Have an account?"
      formFields={signupFormFields}
      handleFormSwitch={handleFormSwitch}
      formErrors={formErrors}
    />
  );
}

export default withLogout(SignupForm);
