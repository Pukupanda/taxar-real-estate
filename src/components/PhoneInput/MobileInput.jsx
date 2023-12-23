"use client";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "./style.css";

function MobileInput(props) {
  return (
    <PhoneInput
      country="np"
      inputProps={{
        name: props.mobile,
      }}
      enableSearch
      countryCodeEditable={false}
      value={
        props.valueMobile
          ? props.valueCountryCode + props.valueMobile
          : undefined
      }
      onChange={(phone, country, e, formattedValue) => {
        // setCountryData({ formattedValue, country });
        if (phone.length > 0) {
          const raw = phone.slice(country?.dialCode?.length);
          props.formik.setFieldValue(props.mobile, raw);

          props.formik.setFieldValue(
            props.countryCode,
            formattedValue?.split(" ")[0]
          );
        } else {
          props.formik.setFieldValue(props.mobile, "");

          props.formik.setFieldValue(props.countryCode, "");
        }
      }}
      onBlur={props.formik.handleBlur}
      placeholder="Mobile number"
      containerclass=""
      inputClass="w-100"
    />
  );
}

export default MobileInput;
