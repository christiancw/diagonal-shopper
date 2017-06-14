import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

const AuthForm = props => {

  const { user, name, displayName, handleSubmit, error, noRedirect } = props;
  return (
    user && user.id
    ?
    null
    :
    (<div>
      <form action="/" name={ name } onSubmit={ (e) => handleSubmit(e, noRedirect) }>
        <TextField
          name="email"
          floatingLabelText="E-mail"
          hintText="E-mail"
          type="text"
        />
        <br />
        <TextField
          hintText="Password"
          floatingLabelText="Password"
          type="password"
          name="password"
        />
        <FlatButton
          type="submit"
          label={ displayName }
          labelStyle={{ position: 'absolute',top: 0,left: -10 }}
          primary={ true }/>
        { error &&  <div> { error.response.data } </div> }
      </form>
      <a href="/auth/google">{ displayName } with Google</a>
    </div>)
  );
};

export default AuthForm;

AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
};
