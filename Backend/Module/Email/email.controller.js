import Email from "./email.model.js";


export const getAllEmails = async (req, res, next) => {
  try {
    const emails = await Email.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      data: emails,
    });
  } catch (error) {
    next(error);
  }
};
export const updateEmail = async (req, res, next) => {
  try {
    const { html, variables } = req.body;

    const updated = await Email.findByIdAndUpdate(
      req.params.id,
      { html, variables },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ success: false, message: "Email not found" });
    }

    res.status(200).json({
      success: true,
      message: "Email template updated successfully",
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};