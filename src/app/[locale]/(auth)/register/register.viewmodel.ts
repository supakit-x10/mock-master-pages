// import { configure, makeAutoObservable } from "mobx";
// import { OpenidVerifyQuery } from "../../../../repositories/types/openid/openid-verify-query.type";
// import { OpenidVerifyResponse } from "../../../../repositories/types/openid/openid-verify-reponse.type";
// import {
//   OpenidVerifyUsecase,
//   OpenidVerifyUsecaseImpl,
// } from "../../../../usecases/openid/openid-verify.usecase";

// configure({
//   enforceActions: "never",
// });

// export class RegisterViewModel {
//   application: OpenidVerifyResponse = {
//     name: "",
//     description: "",
//     enabled: false,
//     enabled_otp: false,
//     verify_email: false,
//     token_type: "",
//     expires_in: 0,
//     refresh_expires_in: 0,
//     expired_type: "",
//     refresh_expired_type: "",
//   };

//   constructor(
//     private openidVerifyUsecase: OpenidVerifyUsecase = new OpenidVerifyUsecaseImpl()
//   ) {
//     makeAutoObservable(this);
//   }

//   async verify(req: OpenidVerifyQuery) {
//     const { error, data } = await this.openidVerifyUsecase.execute(req);
//     if (error) {
//       return false;
//     }
//     this.application = data;
//     return data.enabled;
//   }
// }

// const registerViewModel = new RegisterViewModel();

// export default registerViewModel;
