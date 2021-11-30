import {IYup} from "@ctrls/yup";

export const post = (yup: IYup, params: object) =>
  yup.object().shape({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
  }).validateSync(params, { abortEarly: false })
