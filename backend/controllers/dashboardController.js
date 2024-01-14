const {
  StudyScheme11,
  StudyScheme12,
  StudyScheme13,
} = require("../models/studySchemeModel");

const Student = require("../models/studentModel");
const dashboardUtils = require("../utils/dashboardUtils");

const isValidString = (str) => {
  return typeof str === "string" && str.trim() !== "";
};

const getStudySchemeModel = (modelName) => {
  switch (modelName) {
    case "StudyScheme11":
      return StudyScheme11;
    case "StudyScheme12":
      return StudyScheme12;
    case "StudyScheme13":
      return StudyScheme13;
    default:
      return null;
  }
};

const getKokurikulumProgress = async (req,res) => {
  try {
    const user_id = req.user._id;
    const user = await Student.findById(user_id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const modelName = `StudyScheme${user.start_session}${user.muet}`;
    const StudySchemeModel = getStudySchemeModel(modelName);

    if (!isValidString(modelName) || !StudySchemeModel) {
      return res.status(400).json({ error: "Invalid modelName" });
    }

    const KoKuOccurrences =
      await dashboardUtils.calculateKokurikulumOccurrences(StudySchemeModel, user_id);
      console.log(KoKuOccurrences)


    console.log(
      `getELExPackageProgress - Model: ${modelName}, User ID: ${user_id}`
    );
    res.status(200).json({
      kokurikulum_progress: KoKuOccurrences
    });
  } catch (error) {
    console.error("Error fetching ELEx package progress:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getELExPackageProgress = async (req, res) => {
  try {
    const user_id = req.user._id;
    const user = await Student.findById(user_id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const modelName = `StudyScheme${user.start_session}${user.muet}`;
    const StudySchemeModel = getStudySchemeModel(modelName);

    if (!isValidString(modelName) || !StudySchemeModel) {
      return res.status(400).json({ error: "Invalid modelName" });
    }

    const elexOccurrences =
      await dashboardUtils.calculateELExOccurrences(StudySchemeModel, user_id);
      console.log(elexOccurrences)

    const elexOccurrencesUntilCurrentSemester =
    await dashboardUtils.calculateELExOccurrencesUntilCurrentSemester(StudySchemeModel, user_id, user.current_semester);
    console.log(elexOccurrencesUntilCurrentSemester)

    console.log(
      `getELExPackageProgress - Model: ${modelName}, User ID: ${user_id}`
    );
    res.status(200).json({
      elex_package_progress: elexOccurrences,
      elex_package_progress_until_current_semester: elexOccurrencesUntilCurrentSemester,
    });
  } catch (error) {
    console.error("Error fetching ELEx package progress:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getCreditHoursByType = async (req, res) => {
  try {
    const user_id = req.user._id;
    const user = await Student.findById(user_id);

    if (!user) {
      throw new Error("User not found");
    }

    const modelName = `StudyScheme${user.start_session}${user.muet}`;
    const StudySchemeModel = getStudySchemeModel(modelName);

    if (!isValidString(modelName) || !StudySchemeModel) {
      return res.status(400).json({ error: "Invalid modelName" });
    }

    const courses = await StudySchemeModel.find({ user_id }).sort({
      createdAt: -1,
    });

    const creditHoursByType =
      await dashboardUtils.calculateCreditHoursByCourseType(
        StudySchemeModel,
        user_id
      );

    console.log(
      `getCreditHoursByType - Model: ${modelName}, User ID: ${user_id}`
    );
    res.status(200).json({
      credit_hours_by_type: creditHoursByType,
    });
  } catch (error) {
    console.error("Error fetching credit hours by type:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getCreditHoursBySemester = async (req, res) => {
  try {
    const user_id = req.user._id;
    const user = await Student.findById(user_id);

    if (!user) {
      throw new Error("User not found");
    }

    const modelName = `StudyScheme${user.start_session}${user.muet}`;
    const StudySchemeModel = getStudySchemeModel(modelName);

    if (!isValidString(modelName) || !StudySchemeModel) {
      return res.status(400).json({ error: "Invalid modelName" });
    }

    const courses = await StudySchemeModel.find({ user_id }).sort({
      createdAt: -1,
    });

    const creditHoursBySemester =
      await dashboardUtils.calculateCreditHoursBySemester(
        StudySchemeModel,
        user_id
      );

    console.log(
      `getCreditHoursBySemester - Model: ${modelName}, User ID: ${user_id}`
    );
    res.status(200).json({
      credit_hours_by_semester: creditHoursBySemester,
    });
  } catch (error) {
    console.error("Error fetching credit hours by semester:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getCreditHoursByCurrentSemester = async (req, res) => {
  try {
    const user_id = req.user._id;
    const user = await Student.findById(user_id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const modelName = `StudyScheme${user.start_session}${user.muet}`;
    const StudySchemeModel = getStudySchemeModel(modelName);

    if (!isValidString(modelName) || !StudySchemeModel) {
      return res.status(400).json({ error: "Invalid modelName" });
    }

    const courses = await StudySchemeModel.find({ user_id }).sort({
      createdAt: -1,
    });

    const creditHoursByCurrentSemester =
      await dashboardUtils.calculateTotalCreditHoursUntilCurrentSemester(
        StudySchemeModel,
        user_id,
        user.current_semester
      );

    const creditHoursToGraduate = 
    await dashboardUtils.calculateTotalCreditHoursToGraduate(
        StudySchemeModel,
        user_id,
    )

    console.log(
      `getCreditHoursByCurrentSemester - Model: ${modelName}, User ID: ${user_id}`
    );
    res.status(200).json({
      credit_hours_by_current_semester: creditHoursByCurrentSemester,
      credit_hours_to_graduate: creditHoursToGraduate,
    });
  } catch (error) {
    console.error("Error fetching credit hours by current semester:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getCreditHoursByType,
  getCreditHoursBySemester,
  getCreditHoursByCurrentSemester,
  getELExPackageProgress,
  getKokurikulumProgress,
};
