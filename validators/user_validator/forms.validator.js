const yup = require("yup");

validate_user = yup.object().shape({
  name: yup.string().required().min(3),
  email: yup.string().required().email(),
  phone_no: yup.string().required(),
  religion: yup.string().required(),
  site_visit_date: yup.string().required()
});

module.exports = {
  validate_user,
};
