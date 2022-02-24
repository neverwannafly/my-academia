import { useCallback, useState } from 'react';
import { batch, useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';

import apiRequest from '@app/lib/api';
import { extractError } from '@app/constants/auth';
import { setToast } from '@app/store/toast';
import { setUser } from '@app/store/user';

function useForm({
  baseUrl,
  formFields = {},
  formValidators = {},
}) {
  const [formState, setFormState] = useState(formFields);
  const [formErrors, setFormErrors] = useState({});
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const handleRedirect = useCallback(() => {
    const { from } = location.state || { from: { pathname: '/' } };
    history.replace(from);
  }, [history, location]);

  const handleSubmit = useCallback(async (event) => {
    event.preventDefault();

    let isFormValid = true;
    const errors = {};

    Object.keys(formFields).forEach((key) => {
      if (formValidators[key]) {
        const { isError, error } = formValidators[key](formState[key]);
        if (isError) {
          errors[key] = error;
          isFormValid = false;
        }
      }
    });

    if (!isFormValid) {
      setFormErrors(errors);
      return;
    }

    try {
      const response = await apiRequest('POST', baseUrl, formState);
      // This means there were no validation errors but either username
      // is not found or the password is wrong
      if (Object.keys(response).includes('error')) {
        dispatch(setToast({
          message: 'Invalid username or password',
          type: 'error',
        }));
        return;
      }
      batch(() => {
        dispatch(setUser(response));
        dispatch(setToast({
          message: `Welcome ${response.username}!`,
          type: 'success',
        }));
      });
      handleRedirect();
    } catch (err) {
      if (err.isFromServer) {
        const { error } = err.responseJson;
        setFormErrors(extractError(error));
      } else {
        dispatch(setToast({
          message: 'Something went wrong! Please try later',
          type: 'error',
        }));
      }
    }
  }, [dispatch, formState, formErrors, setFormErrors, setFormState, handleRedirect]);

  const handleFieldUpdate = useCallback((key) => (event) => {
    setFormState({ ...formState, [key]: event.target.value });
  }, [formState]);

  return {
    handleFieldUpdate,
    handleSubmit,
    formErrors,
  };
}

export default useForm;
