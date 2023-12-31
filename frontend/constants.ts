const constants = {
  app: {
    name: "Apollo Journal"
  },
  msg: {
    invalOrInact: "Invalid credentials or inactive account.",
    nameValidation: "Name too long or too short.",
    nameNotBlank: "Name must not be blank.",
    unsavedChanges: "Unsaved changes",
    lastSaved: "Last saved {0}",
    saving: "Saving...",
    startWriting: "Start writing...",
  },
  success: {
    activateSuccess: "Account activated.",
    resetPswdSuccess: "Password reset successful.",
    updateNameSuccess: "Name updated.",
  },
  err: {
    activateFail: "Account activation failed.",
    resetPswdReqFail: "Failed to send password reset request.",
    resetPswdFail: "Failed to reset password.",
    googleLoginFail: "Failed to login with Google.",
    updateNameFail: "Failed to update name.",
    getEntryFail: "Failed to retrieve entry.",
    generic: "Something went wrong.",
  },
  info: {
    resetPswdRequested: "A password reset link has been sent to {0}",
    activationNeeded: "Please activate your account. An activation link has been sent to {0}",
  },
  title: {
    google: 'Google',
    start: 'Start',
  },
  prompt: {
    alreadyHaveAcc: "Already have an account? Login",
    doNotHaveAcc: "Do not have an account? Signup",
    orContinueWith: "Or continue with",
  }
}

export default constants