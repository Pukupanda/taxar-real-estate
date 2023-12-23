import SignupEditProfileForm from "@/components/SignupEditProfileForm/SignupEditProfileForm";
import React from "react";

function EditProfile() {
  return (
    <>
      <section className="">
        <div className="singleBoxBg">
          <div className="singleBoxStyle">
            <div className="text-center">
              <h3>Edit Profile</h3>
            </div>
            <SignupEditProfileForm pageName="" />
          </div>
        </div>
      </section>
    </>
  );
}

export default EditProfile;
