import ResetPasswordForm from "@/components/forms/reset-pswd-form"

const ResetPasswordPage = ({ params }: { params: { uid: string, token: string }} ) => {
  return (
    <div className="flex flex-col items-center">
      <ResetPasswordForm 
        uid={params.uid}
        token={params.token}
      />
    </div>
  )
}

export default ResetPasswordPage