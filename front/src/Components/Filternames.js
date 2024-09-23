import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid2";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import {
  Button,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const Filternames = ({ onFilterChange }) => {
  const [data, setData] = useState([]);
  const [uniqueCommunities, setUniqueCommunities] = useState([]);
  const [uniqueCategories, setUniqueCategories] = useState([]);
  const [uniqueTypes, setUniqueTypes] = useState([]);

  // Predefined height, weight, and days ranges
  const heightRanges = {
    "1-5": [1, 5],
    "5-15": [5, 15],
    "15-30": [15, 30],
    "30-45": [30, 45],
    "45-70": [45, 70],
    "above 70": [71, Infinity],
  };

  const weightRanges = {
    "0-50": [0, 50],
    "50-100": [50, 100],
    "100-200": [100, 200],
    "200-400": [200, 400],
    "above 400": [401, Infinity],
  };

  const daysRanges = {
    "1-3": [1, 3],
    "4-6": [4, 6],
    "7-9": [7, 9],
    "10-12": [10, 12],
    "13-15": [13, 15],
  };

  const [tempFilters, setTempFilters] = useState({
    community: [],
    height: [],
    weight: [],
    days: [],
    category: [],
    type: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:5000/api/venue");
      const result = await response.json();
      setData(result);

      const communities = [
        ...new Set(result.map((e) => e.community).filter(Boolean)),
      ];
      setUniqueCommunities(communities);

      const categories = [...new Set(result.map((e) => e.category))];
      setUniqueCategories(categories);

      const types = [...new Set(result.map((e) => e.type))];
      setUniqueTypes(types);
    };
    fetchData();
  }, []);

  const handleCommunityChange = (community) => {
    const newSelection = tempFilters.community.includes(community)
      ? tempFilters.community.filter((c) => c !== community)
      : [...tempFilters.community, community];

    setTempFilters((prev) => ({ ...prev, community: newSelection }));
  };

  const handleHeightChange = (range) => {
    const newSelection = tempFilters.height.includes(range)
      ? tempFilters.height.filter((h) => h !== range)
      : [...tempFilters.height, range];

    setTempFilters((prev) => ({ ...prev, height: newSelection }));
  };

  const handleWeightChange = (range) => {
    const newSelection = tempFilters.weight.includes(range)
      ? tempFilters.weight.filter((w) => w !== range)
      : [...tempFilters.weight, range];

    setTempFilters((prev) => ({ ...prev, weight: newSelection }));
  };

  const handleDayChange = (range) => {
    const newSelection = tempFilters.days.includes(range)
      ? tempFilters.days.filter((d) => d !== range)
      : [...tempFilters.days, range];

    setTempFilters((prev) => ({ ...prev, days: newSelection }));
  };

  const handleCategoryChange = (category) => {
    const newSelection = tempFilters.category.includes(category)
      ? tempFilters.category.filter((c) => c !== category)
      : [...tempFilters.category, category];

    setTempFilters((prev) => ({ ...prev, category: newSelection }));
  };

  const handleTypeChange = (type) => {
    const newSelection = tempFilters.type.includes(type)
      ? tempFilters.type.filter((t) => t !== type)
      : [...tempFilters.type, type];

    setTempFilters((prev) => ({ ...prev, type: newSelection }));
  };

  const applyFilters = () => {
    // Send the selected filters to the parent component
    const heightValues = tempFilters.height.map((r) => heightRanges[r]);
    const weightValues = tempFilters.weight.map((r) => weightRanges[r]);
    const dayValues = tempFilters.days.map((r) => daysRanges[r]);

    onFilterChange({
      community: tempFilters.community,
      height: heightValues,
      weight: weightValues,
      days: dayValues,
      category: tempFilters.category,
      type: tempFilters.type,
    });
  };

  return (
    <Grid container spacing={2} sx={{ flexDirection: "column" }}>
      <Grid
        item
        xs={12}
        sx={{ padding: "10px", display: "flex", flexDirection: "column" }}
      >
        {/* Community Filter */}
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography>Community</Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ display: "flex", flexDirection: "column" }}>
            {uniqueCommunities.map((community, index) => (
              <FormControlLabel
                key={index}
                control={
                  <Checkbox
                    checked={tempFilters.community.includes(community)}
                    onChange={() => handleCommunityChange(community)}
                  />
                }
                label={community}
              />
            ))}
          </AccordionDetails>
        </Accordion>

        {/* Height Filter */}
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2-content"
            id="panel2-header"
          >
            <Typography>Height</Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ display: "flex", flexDirection: "column" }}>
            {Object.keys(heightRanges).map((range, index) => (
              <FormControlLabel
                key={index}
                control={
                  <Checkbox
                    checked={tempFilters.height.includes(range)}
                    onChange={() => handleHeightChange(range)}
                  />
                }
                label={range}
              />
            ))}
          </AccordionDetails>
        </Accordion>

        {/* Weight Filter */}
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3-content"
            id="panel3-header"
          >
            <Typography>Weight</Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ display: "flex", flexDirection: "column" }}>
            {Object.keys(weightRanges).map((range, index) => (
              <FormControlLabel
                key={index}
                control={
                  <Checkbox
                    checked={tempFilters.weight.includes(range)}
                    onChange={() => handleWeightChange(range)}
                  />
                }
                label={range}
              />
            ))}
          </AccordionDetails>
        </Accordion>

        {/* Days Filter */}
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel4-content"
            id="panel4-header"
          >
            <Typography>Days</Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ display: "flex", flexDirection: "column" }}>
            {Object.keys(daysRanges).map((range, index) => (
              <FormControlLabel
                key={index}
                control={
                  <Checkbox
                    checked={tempFilters.days.includes(range)}
                    onChange={() => handleDayChange(range)}
                  />
                }
                label={range}
              />
            ))}
          </AccordionDetails>
        </Accordion>

        {/* Category Filter */}
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel5-content"
            id="panel5-header"
          >
            <Typography>Category</Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ display: "flex", flexDirection: "column" }}>
            {uniqueCategories.map((category, index) => (
              <FormControlLabel
                key={index}
                control={
                  <Checkbox
                    checked={tempFilters.category.includes(category)}
                    onChange={() => handleCategoryChange(category)}
                  />
                }
                label={category}
              />
            ))}
          </AccordionDetails>
        </Accordion>

        {/* Type Filter */}
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel6-content"
            id="panel6-header"
          >
            <Typography>Type</Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ display: "flex", flexDirection: "column" }}>
            {uniqueTypes.map((type, index) => (
              <FormControlLabel
                key={index}
                control={
                  <Checkbox
                    checked={tempFilters.type.includes(type)}
                    onChange={() => handleTypeChange(type)}
                  />
                }
                label={type}
              />
            ))}
          </AccordionDetails>
        </Accordion>
      </Grid>

      {/* Apply Filter Button */}
      <Grid sx={{display:'flex', justifyContent:'center'}}>
        <Button variant="contained" onClick={applyFilters}>
          Apply Filter
        </Button>
      </Grid>
    </Grid>
  );
};

export default Filternames;
