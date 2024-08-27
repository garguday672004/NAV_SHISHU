const BASE_URL = process.env.REACT_APP_BASE_URL;

// AUTH ENDPOINTS
export const endpoints = {
    SENDOTP_API: BASE_URL + "/auth/sendOtp",
    SIGNUP_API: BASE_URL + "/auth/signup",
    LOGIN_API: BASE_URL + "/auth/login",
}

// PROFILE ENDPOINTS
export const profileEndpoints = {
    GET_USER_DETAILS_API: BASE_URL + "/profile/getUserDetails",
    UPDATE_PROFILE_API : BASE_URL + "/profile/updateProfile",
    UPDATE_PROFILE_PIC_API : BASE_URL + "/profile/updateProfilePic",
}

// MOTHER ENDPOINTS
export const motherEndpoints = {
    CREATE_SURROGATE_API : BASE_URL + "/mother/createSurrogate",
    UPDATE_SURROGATE_DETAILS_API : BASE_URL + "/mother/updateSurrogateDetails",
    UPDATE_SURROGATE_ID_API : BASE_URL + "/mother/updateSurrogateID",
    GET_SURROGATE_DETAILS_API : BASE_URL + "/mother/getSurrogateDetails",
    SHOW_REQUESTED_PARENTS_API : BASE_URL + "/mother/showRequestedParents"
}

// PARENT ENDPOINTS
export const parentEndpoints = {
    CREATE_PARENT_API : BASE_URL + "/parent/createParent",
    UPDATE_PARENT_DETAILS_API : BASE_URL + "/parent/updateParent",
    UPDATE_PARENT_ID_API : BASE_URL + "/parent/updateParentID",
    REQUEST_MOTHER_API : BASE_URL + "/parent/requestMother",
    GET_ALL_SURROGATES_API : BASE_URL + "/parent/showAllSurrogateMothers",
    GET_PARENT_DETAILS_API : BASE_URL + "/parent/showParentDetails",
}

export const healthEndpoints = {
    CREATE_HEALTH_API : BASE_URL + "/mother/createHealth",
    UPDATE_HEALTH_API : BASE_URL + "/mother/updateHealth",
}

// TODO: Add more endpoints here