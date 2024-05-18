import { User } from "./AuthApi";
import { apiSlice } from "./apiSlice";




export interface RegisterUserData {
  userName: string;
  password: string;
  confirmPassword: string;
  email: string;
}




export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register:builder.mutation<User,RegisterUserData>(
      {
        query: (credentials) => ({
          url: "/auth/register",
          method: "POST",
          body: {...credentials},
        }),
      }
    ),
    resendOtp:builder.mutation<void,{ tokenId: string }>(
      {
        query: (credentials) => ({
          url: '/auth/resendOtp',
          method: "POST",
          body: {...credentials},
        }),
      }
    ),
    verifyUser:builder.mutation<User,{ tokenId: string ,otp:string}>(
      {
        query: (credentials) => ({
          url: '/auth/verify',
          method: "POST",
          body: {...credentials},
        }),
      }
    ),
    fetchTimerDate:builder.mutation<{updateDate:Date},{ tokenId:string}>(
      {
        query: (credentials) => ({
          url: '/auth/get-timer-date',
          method: "POST",
          body: {...credentials},
        }),
      }
    ),

  })
})



export const {
  useRegisterMutation,
  useResendOtpMutation,
  useVerifyUserMutation,
  useFetchTimerDateMutation
}
  =userApiSlice