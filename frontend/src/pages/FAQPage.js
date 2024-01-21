import React, { useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/SideBar";
import LinearProgress from "../components/LinearProgress";
import {
  Accordion,
  Box,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const FAQPage = () => {
  const faqData = [
    {
      question: "What is the purpose of SMARTASSIST?",
      answer:
        "SmartAssist serves as an online assistance registration system designed to aid UPM students in the course registration process at e-SMP UPM. Its dashboard facilitates the monitoring of academic progress, offers tailored recommendations for addressing previously failed courses, and provides features for planning upcoming semester courses, along with the ability to view academic progress categorized by course type.",
    },
    {
      question:
        "What are the first steps and procedures I should follow upon initial signup to effectively navigate and utilize the system?",
      answer:
        "Upon completing the sign-up process, it is advised to input your academic history information (updating course status) into the designated section located in the sidebar labeled History. Once this step is accomplished, the dashboard will be updated accordingly, allowing you to commence the process of planning your courses.",
    },
    {
      question: "Where is CALC located?",
      answer:
        "CALC is situated near the Faculty of Modern Languages and Communication, Universiti Putra Malaysia.",
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleAnswer = (index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

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
        <p style={{ fontSize: "18px" }}>FAQ Page</p>

        {faqData.map((faq, index) => (
          <Accordion
            key={index}
            expanded={openIndex === index}
            onChange={() => toggleAnswer(index)}
            style={{
              marginBottom: "10px",
              marginRight: "30px",
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel${index + 1}bh-content`}
              id={`panel${index + 1}bh-header`}
            > 
              <Typography style={{ fontFamily: "Arial", fontWeight: "bold", marginLeft: 5 }}>
                {faq.question}
              </Typography>
            </AccordionSummary>
            <AccordionDetails
              style={{
                borderRadius: "8px",
                padding: "16px",
              }}
            >
              <Typography>{faq.answer}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </div>
  );
};

export default FAQPage;
