import React , { useEffect, useState } from 'react';
import Header from "../components/Header";
import Sidebar from "../components/SideBar";
import LinearProgress from "../components/LinearProgress";
import { Box } from "@mui/material";
import SuggestedCourse from "../components/SuggestedCourse";
import CoursePlan from "../components/CoursePlan"
import { useAuthContext } from '../hooks/useAuthContext';

function SuggestionPage() {
  const { user } = useAuthContext();
  const [ currentSemesterCourses, setCurrentSemesterCourses ] = useState(null)
  const [renderKey, setRenderKey] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      // Fetch the current semester
      const response = await fetch(
        "http://localhost:4000/api/study_scheme",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(
          `Failed to fetch current semester: ${response.statusText}`
        );
      }
      setCurrentSemesterCourses(data);
     
    };
  
    fetchData();
  }, [user,renderKey]);
  
  return (
    <div>
      <Header />
      <LinearProgress />
      <Box sx={{ display: "flex" }}>
        <Sidebar />
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", paddingLeft: 34 }}
      >
        <div className="suggestion-page">
          <p style={{ fontSize: '18px' }} >Suggested Failed Course</p>
          <SuggestedCourse currentSemesterCourses={currentSemesterCourses} renderKey={renderKey} setRenderKey={setRenderKey}/>
        </div>
        {/* Add spacing between components using margin */}
        <div style={{ marginTop: '5px' }}>
          <CoursePlan currentSemesterCourses={currentSemesterCourses} renderKey={renderKey} setRenderKey={setRenderKey}/>
        </div>
      </Box>
    </div>
  );
}

export default SuggestionPage;
