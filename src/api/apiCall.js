import {
  deleteforUrl,
  getData,
  getDataforUrl,
  getDataforUrlParams,
  patchRawData,
  patchforUrl,
  postFormData,
  postRawData,
  postRawDataforURL,
  putRawData,
} from "./index";

export const sendNotification = async (payload) => {
  return postRawData("send-notification", payload).then((data) => {
    return data;
  });
};
export const LoginApi = async (payload) => {
  return postRawData("auth/login", payload).then((data) => {
    return data;
  });
};
export const ForgotPasswordApi = async (payload) => {
  return postRawData("auth/forgotPassword", payload).then((data) => {
    return data;
  });
};
export const OTPVerificationApi = async (payload) => {
  return postRawData("auth/verifyOtp", payload).then((data) => {
    return data;
  });
};
export const ResendOTPApi = async (payload) => {
  return putRawData("auth/resendOtp", payload).then((data) => {
    return data;
  });
};
export const ResetPasswordApi = async (payload) => {
  return postRawData("auth/resetPassword", payload).then((data) => {
    return data;
  });
};
export const LogoutApi = async (payload) => {
  return getData("auth/logOut", payload).then((data) => {
    return data;
  });
};
export const ChangePasswordApi = async (payload) => {
  return patchRawData("auth/changePassword", payload).then((data) => {
    return data;
  });
};
export const signUpApi = async (payload) => {
  return postRawData("auth/register", payload).then((data) => {
    return data;
  });
};
export const getDetailApi = async (payload) => {
  return getData("auth/userDetail", payload).then((data) => {
    return data;
  });
};
export const uploadImageApi = async (payload) => {
  return postFormData("uploadImage", payload).then((data) => {
    return data;
  });
};
export const editProfileApi = async (payload) => {
  return putRawData("auth/updateProfile", payload).then((data) => {
    return data;
  });
};
export const createBookingApi = async (payload) => {
  return postRawData("createBooking", payload).then((data) => {
    return data;
  });
};
export const propertyListApi = async (payload) => {
  return getData("propertyList", payload).then((data) => {
    return data;
  });
};
export const propertyDetailApi = async (payload) => {
  return getDataforUrl("propertyDetails", payload).then((data) => {
    return data;
  });
};
export const getAboutApi = async (payload) => {
  return getData("auth/aboutUs", payload).then((data) => {
    return data;
  });
};
export const getprivacyPolicyApi = async (payload) => {
  return getData("auth/privacyPolicy", payload).then((data) => {
    return data;
  });
};
export const gettermAndConditionApi = async (payload) => {
  return getData("auth/termsConditions", payload).then((data) => {
    return data;
  });
};
export const getTeamListApi = async (payload) => {
  return getData("auth/teams", payload).then((data) => {
    return data;
  });
};
export const bookingsListApi = async (payload) => {
  return getData("user/bookings", payload).then((data) => {
    return data;
  });
};
export const userPropertyListApi = async (payload) => {
  return getData("user/property/list", payload).then((data) => {
    return data;
  });
};
export const userPropertyActiveDeactiveApi = async (payload) => {
  return patchforUrl("user/property/activeDeactive", payload).then((data) => {
    return data;
  });
};
export const userPropertyDeleteApi = async (payload) => {
  return deleteforUrl("user/property/delete", payload).then((data) => {
    return data;
  });
};
export const likedPropertyApi = async (payload) => {
  return getData("user/likedProperty", payload).then((data) => {
    return data;
  });
};
export const teamsListApi = async (payload) => {
  return getData("teams", payload).then((data) => {
    return data;
  });
};
export const ProjectListApi = async (payload) => {
  return getData("ProjectList", payload).then((data) => {
    return data;
  });
};
export const ProjectDetailsApi = async (id, payload) => {
  return getDataforUrlParams("ProjectDetails", id, payload).then((data) => {
    return data;
  });
};
export const blogsListApi = async (payload) => {
  return getData("blogs", payload).then((data) => {
    return data;
  });
};
export const blogsDetailApi = async (payload) => {
  return getDataforUrl("blog", payload).then((data) => {
    return data;
  });
};
export const careerListApi = async (payload) => {
  return getData("careerList", payload).then((data) => {
    return data;
  });
};
export const applyNowApi = async (payload) => {
  return postRawData("applyNow", payload).then((data) => {
    return data;
  });
};
export const addCommentApi = async (payload) => {
  return postRawData("addComment", payload).then((data) => {
    return data;
  });
};
export const homeScreenApi = async (payload) => {
  return getData("homeScreen", payload).then((data) => {
    return data;
  });
};
export const FooterAddressApi = async (payload) => {
  return getData("companyAddress", payload).then((data) => {
    return data;
  });
};
export const LikeUnlikePropertyApi = async (id, payload) => {
  return postRawDataforURL("user/property/likeUnlike", id, payload).then(
    (data) => {
      return data;
    }
  );
};
export const getInTouchApi = async (payload) => {
  return postRawData("getInTouch", payload).then((data) => {
    return data;
  });
};
export const AddPropertyApi = async (payload) => {
  return postRawData("user/property/addUpdate", payload).then((data) => {
    return data;
  });
};
export const propertyFeatureListApi = async (payload) => {
  return getData("propertyFeature", payload).then((data) => {
    return data;
  });
};
export const homeLoanApi = async (payload) => {
  return getData("auth/homeLoan", payload).then((data) => {
    return data;
  });
};
export const emiCalculatorApi = async (payload) => {
  return postRawData("emiCalculator", payload).then((data) => {
    return data;
  });
};
export const faqsListApi = async (payload) => {
  return getData("faqs", payload).then((data) => {
    return data;
  });
};
export const publicationListApi = async (payload) => {
  return getData("publicationList", payload).then((data) => {
    return data;
  });
};
export const newsEventListApi = async (payload) => {
  return getData("newsEventList", payload).then((data) => {
    return data;
  });
};
export const newsEventDetailApi = async (payload) => {
  return getDataforUrl("newsEvent", payload).then((data) => {
    return data;
  });
};
export const priorityMessageApi = async (payload) => {
  return getData("priorityMessage", payload).then((data) => {
    return data;
  });
};
export const BarCodeApi = async (payload) => {
  return getData("auth/barCode", payload).then((data) => {
    return data;
  });
};
