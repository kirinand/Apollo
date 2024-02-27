"use client";
import { useState } from "react";

import { LogoutButton, ResetPasswordButton } from "@/components/buttons";
import { useAppContext } from "@/providers/context/app-context-providers";
import { Button } from "@/components/ui/button";
import ChangeNameForm from "@/components/forms/change-name-form";
import constants from "@/constants";

const ProfilePage = () => {
  const { user } = useAppContext();
  const { email, name } = user;
  const [isNameEditable, setNameEditable] = useState(false);

  return (
    <div className="container mt-4">
      <div className="container">
        <div className="flex border-b items-center h-20 justify-between max-w-md space-x-4">
          <div className="flex justify-between space-x-8 max-w-full min-w-240">
            <p className="font-bold opacity-75">Account</p>
            <p className="max-w-full truncate">{email}</p>
          </div>
          <div className="flex-shrink-0">
            <ResetPasswordButton email={email} />
          </div>
        </div>
        <div className="flex border-b items-center py-6 justify-between max-w-md space-x-4">
          <div className="flex justify-between items-start space-x-8 min-w-240">
            <p className="flex pt-2 font-bold opacity-75">Name</p>
            <ChangeNameForm
              name={name}
              isEditable={isNameEditable}
              setEditable={(isEditable) => {
                setNameEditable(isEditable);
              }}
            />
          </div>
          <div className="flex-shrink-0">
            <Button
              onClick={() => {
                setNameEditable(true);
              }}
            >
              Edit Name
            </Button>
          </div>
        </div>
        <div className="flex border-b items-center h-20 justify-between max-w-md">
          <div className="min-w-240"></div>
          <div>
            <LogoutButton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
