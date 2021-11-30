import {IYup} from "@ctrls/yup";

export const post = (yup: IYup, params: object) =>
  yup.object().shape({
      number: yup.number().required(),
      title: yup.string().required(),
      description: yup.string().required(),
      author: yup.string().required(),
      status: yup.mixed().oneOf(['open', 'draft', 'closed']).required(),
      labels: yup.array()
          .min(1, "You can't leave this blank.")
          .required("You can't leave this blank.")
          .nullable()
          .required(),
  }).validateSync(params, { abortEarly: false })
