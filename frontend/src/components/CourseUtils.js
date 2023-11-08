export function mapCourseType(courseType) {
    switch (courseType) {
      case 1:
        return "Universiti Course";
      case 2:
        return "Core Course";
      case 3:
        return "Elective: Limited";
      case 4:
        return "Elective: General";
      default:
        return "Unknown Course Type";
    }
  }
  