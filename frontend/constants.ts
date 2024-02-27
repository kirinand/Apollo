import { log } from "console"

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
    yourEmail: "your email",
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
    home: 'Home',
    write: 'Write',
    view: 'View',
    insights: 'Insights',
    profile: 'Profile',
    email: 'Email',
    password: 'Password',
    welcomeBack: 'Welcome Back',
    createAcc: 'Create Your Account',
    yourName: 'Your Name',
    account: 'Account',
    name: 'Name',
  },
  label: {
    week: "Week",
    month: "Month",
    quarter: "Quarter",
    year: "Year",
    polarChart: "Polar Chart",
    lineChart: "Line Chart",
  },
  prompt: {
    alreadyHaveAcc: "Already have an account? Login",
    doNotHaveAcc: "Do not have an account? Signup",
    orContinueWith: "Or continue with",
    signupWithEmail: "Signup with Email",
    forgotPswd: "Forgot password?",
    loginWithEmail: "Login with Email",
    resetPassword: "Reset Password",
    logout: "Logout",
    editName: "Edit Name",
  },
  month: {
    jan: "January",
    feb: "February",
    mar: "March",
    apr: "April",
    may: "May",
    jun: "June",
    jul: "July",
    aug: "August",
    sep: "September",
    oct: "October",
    nov: "November",
    dec: "December",
  }
}

export default constants