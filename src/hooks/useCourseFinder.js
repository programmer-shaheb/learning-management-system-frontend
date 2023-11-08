import { useState, useEffect } from "react";
import { myCourse } from "../courseAPI";

const useCourseFinder = (email) => {
  const [courseFound, setCourseFound] = useState(false);
  const [studentCourse, setStudentCourse] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      if (email) {
        const response = await myCourse(email);

        if (response) {
          setCourseFound(true);
          setStudentCourse(response);
        } else {
          setCourseFound(false);
          setStudentCourse(null);
        }
      } else {
        setCourseFound(false);
        setStudentCourse(null);
      }
    };

    fetchCourse();
  }, [email]);

  return { courseFound, studentCourse };
};

export default useCourseFinder;
