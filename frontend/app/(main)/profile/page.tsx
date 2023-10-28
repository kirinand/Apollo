"use client";
import { useState } from "react";

import { LogoutButton, ResetPasswordButton } from "@/components/buttons";
import { useAppContext } from "@/providers/context/app-context-providers";
import { Button } from "@/components/ui/button";
import ChangeNameForm from "@/components/forms/change-name-form";

const ProfilePage = () => {
  const { user } = useAppContext();
  const { email, name } = user;
  const [isNameEditable, setNameEditable] = useState(false);

  return (
    <div>
      <div>
        <div>
          <p>Account</p>
          <p>{email}</p>
        </div>
        <div>
          <ResetPasswordButton email={email} />
        </div>
      </div>
      <div>
        <div>
          <p>Name</p>
          <ChangeNameForm
            name={name}
            isEditable={isNameEditable}
            setEditable={(isEditable) => {
              setNameEditable(isEditable);
            }}
          />
        </div>
        <div>
          <Button
            onClick={() => {
              setNameEditable(true)
            }}
          >
            Edit Name
          </Button>
        </div>
      </div>
      <div>
        <div></div>
        <div>
          <LogoutButton />
        </div>
      </div>
    </div>
  )
}

export default ProfilePage;
