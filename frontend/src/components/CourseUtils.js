export function mapCourseType(courseType) {
    switch (courseType) {
      case "1":
        return "Universiti Course";
      case "2":
        return "Core Course";
      case "3":
        return "Elective";
      default:
        return "";
    }
  }
  