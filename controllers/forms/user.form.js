const validate_user = require("../../validators/user_validator/forms.validator");
const formatResponse = require("../../response_handler/response_handler");
const { sendMail } = require("../../public/utils/sendMail");
const { addDataToSheet } = require("../../controllers/forms/googleSheets");

const fill_form = async (req, res) => {
  try {
    const { name, email, phone_no, time_to_connect, site_visit_date } =
      req.body;
    try {
      await validate_user.validate_user.validate({
        name,
        email,
        phone_no,
        time_to_connect,
        site_visit_date,
      });
    } catch (validationError) {
      const response = formatResponse(400, String(validationError.errors), []);
      return res.status(400).json(response);
    }

    const sheet_res = await addDataToSheet(
      name,
      email,
      phone_no,
      time_to_connect,
      site_visit_date
    );

    const info = await sendMail(
      name,
      email,
      phone_no,
      time_to_connect,
      site_visit_date
    );
    if (info.messageId && sheet_res.data.updates.updatedRows == 1) {
      const response = formatResponse(
        200,
        "Email Sent & Data uploaded to Excel Successfully",
        []
      );
      return res.status(200).json(response);
    } else {
      const response = formatResponse(400, "Something Went Wrong", []);
      return res.status(400).json(response);
    }
  } catch (error) {
    const response = formatResponse(400, String(error), []);
    return res.status(400).json(response);
  }
};

module.exports = {
  fill_form,
};
