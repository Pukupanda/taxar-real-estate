import SignupEditProfileForm from "@/components/SignupEditProfileForm/SignupEditProfileForm";

function Signup() {
  return (
    <>
      <section className="">
        <div className="singleBoxBg">
          <div className="singleBoxStyle">
            {/* <div className="text-center">
              <h3>Sign Up</h3>
            </div> */}
            <SignupEditProfileForm pageName="signup" />
          </div>
        </div>
      </section>
    </>
  );
}

export default Signup;
