import React, { useState, useEffect } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Autocomplete from "@mui/material/Autocomplete";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import FreeSoloCreateOptionDialog from "./TextBoxMD.tsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Position } from "../../common/PositionInterface.ts";
import { Node } from "../../common/NodeInterface.ts";
import BackgroundImg2 from "../../assets/blue-background2.jpg";
import "../../AllMobile.css";

interface Staff {
  employeeName: string;
}

const MobileMedicine: React.FC = () => {
  const [staffName, setStaffName] = useState<Staff | null>(null);
  const [priority, setPriority] = useState("");
  const [location, setLocation] = useState<Position | null>(null);
  const [nameMedicine, setNameMedicine] = useState("");
  const [typeMedicine, setTypeMedicine] = useState("");
  const [status, setStatus] = useState("");
  const [locations, setLocations] = useState<Position[]>([]);
  const [staffNames, setStaffNames] = useState<Staff[]>([]);

  const navigate = useNavigate(); //Function to navigate to other pages

  const toggleScrolling = (disableScroll: boolean) => {
    if (disableScroll) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  };

  const handleChangeName = (value: Staff | null) => {
    setStaffName(value);
  };

  const handlePriorityChange = (event: SelectChangeEvent) => {
    setPriority(event.target.value as string);
  };
  const handleStatusChange = (event: SelectChangeEvent) => {
    setStatus(event.target.value as string);
  };

  const handleChangeLocation = (value: Position | null) => {
    setLocation(value);
  };

  useEffect(() => {
    // Fetch node data from the backend
    fetch("/api/nodes")
      .then((response) => response.json())
      .then((nodes: Node[]) => {
        const formattedLocations: Position[] = nodes.map((node) => ({
          label: node.longName || "Unknown", // Use the correct property name
          id: node.id,
          top: `${node.ycoord}px`,
          left: `${node.xcoord}px`,
          floor: node.floor,
        }));

        setLocations(formattedLocations);
      })
      .catch((error) => console.error("Failed to fetch node data:", error));
  }, []);

  useEffect(() => {
    // Fetch staff data from backend
    fetch("/api/all-staff")
      .then((response) => response.json())
      .then((staffInfo: Staff[]) => {
        const formattedStaff: Staff[] = staffInfo.map((staff) => ({
          employeeName: staff.employeeName || "unknown",
        }));
        setStaffNames(formattedStaff);
      })
      .catch((error) => console.error("Failed to fetch staff data:", error));
  }, []);

  async function submit() {
    const newEntry = {
      name: staffName?.employeeName,
      priority: priority,
      location: location?.label,
      typeMedicine: typeMedicine,
      nameMedicine: nameMedicine,
      status: status,
    };

    await axios
      .post("/api/medicine-request", newEntry, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(() => {
        console.log("Sanitation request sent successfully");
        navigate("/order-flowers-result");
      })
      .catch(() => {
        console.log("Sanitation request  failed to send");
        console.log(newEntry);
        alert("Sanitation request failed to send. Please try again later");
      });
    clear();
  }

  function clear() {
    setStaffName(null);
    setPriority("");
    setLocation(null);
    setTypeMedicine("");
    setNameMedicine("");
    setStatus("");
  }

  return (
    <div
      style={{
        backgroundImage: `url(${BackgroundImg2})`,
        height: "100vh",
        width: "100vw",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        minHeight: "100%",
        backgroundPosition: "center center",
        overflowX: "hidden",
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div className={"mainBox"}>
        <p className={"title-mobile"} style={{ position: "relative" }}>
          Medicine Delivery Request Form
        </p>
        <p className={"names-mobile"}>Kim Cummings & Riley Yu</p>
        <Stack alignItems="center" justifyContent="center" spacing={3}>
          <div className={"breakline"}></div>
          <Stack
            spacing={2}
            direction="column"
            alignItems="center"
            justifyContent="center"
          >
            <div>
              <InputLabel
                style={{
                  color: "#3B54A0",
                  fontStyle: "italic",
                }}
                id="staffName-dropdown"
              >
                Name of Requester
              </InputLabel>
              <Autocomplete
                sx={{ minWidth: 250, color: "#3B54A0" }}
                options={staffNames}
                getOptionLabel={(option) => option.employeeName || "Unknown"}
                //isOptionEqualToValue={(option, value) => option.id === value.id}
                value={staffName}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label=""
                    InputLabelProps={{
                      style: {
                        fontFamily: "Poppins",
                        fontSize: 14,
                        textAlign: "center",
                      },
                    }}
                  />
                )}
                onOpen={() => toggleScrolling(true)}
                onClose={() => toggleScrolling(false)}
                onChange={(event, value) => handleChangeName(value)}
              />
            </div>
            <div>
              <InputLabel
                style={{
                  color: "#3B54A0",
                }}
                id="priority-dropdown"
              >
                Priority
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={priority}
                label=""
                onChange={handlePriorityChange}
                sx={{ minWidth: 250, color: "#3B54A0" }}
              >
                <MenuItem value={"Low"}>Low</MenuItem>
                <MenuItem value={"Medium"}>Medium</MenuItem>
                <MenuItem value={"High"}>High</MenuItem>
                <MenuItem value={"Emergency"}>Emergency</MenuItem>
              </Select>
            </div>
          </Stack>

          <div>
            <InputLabel
              style={{
                color: "#3B54A0",
                fontStyle: "italic",
              }}
              id="location-dropdown"
            >
              Location
            </InputLabel>
            <Autocomplete
              sx={{ minWidth: 250, color: "#3B54A0" }}
              options={locations}
              getOptionLabel={(option) => option.label || "Unknown"}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              value={location}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label=""
                  InputLabelProps={{
                    style: {
                      fontFamily: "Poppins",
                      fontSize: 14,
                      textAlign: "center",
                    },
                  }}
                />
              )}
              onOpen={() => toggleScrolling(true)}
              onClose={() => toggleScrolling(false)}
              onChange={(event, value) => handleChangeLocation(value)}
            />
          </div>

          <div>
            <FormLabel
              style={{
                color: "#3B54A0",
                fontStyle: "italic",
              }}
              id="demo-controlled-radio-buttons-group"
            >
              Type of Medicine
            </FormLabel>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={typeMedicine}
              onChange={(e) => {
                setTypeMedicine(e.target.value);
              }}
            >
              <FormControlLabel
                style={{
                  color: "#3D4A6B",
                  font: "Jaldi",
                }}
                value="Over the Counter"
                control={<Radio />}
                label="Over the Counter"
              />
              <FormControlLabel
                style={{
                  color: "#3D4A6B",
                  font: "Jaldi",
                }}
                value="Prescription"
                control={<Radio />}
                label="Prescription"
              />
            </RadioGroup>
          </div>

          <div>
            <FormLabel
              style={{
                color: "#3B54A0",
                fontStyle: "italic",
              }}
              id="demo-controlled-radio-buttons-group"
            >
              Medicine Name
            </FormLabel>
            <FreeSoloCreateOptionDialog
              nameMedicine={nameMedicine}
              setNameMedicine={setNameMedicine}
              boxWidth={250}
            />
          </div>

          <div>
            <InputLabel
              style={{
                color: "#3B54A0",
                fontStyle: "italic",
              }}
              id="demo-simple-select-label"
            >
              Status
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={status}
              label=""
              onChange={handleStatusChange}
              sx={{ minWidth: 250 }}
            >
              <MenuItem value={"unassigned"}>Unassigned</MenuItem>
              <MenuItem value={"assigned"}>Assigned</MenuItem>
              <MenuItem value={"in_progress"}>In Progress</MenuItem>
              <MenuItem value={"closed"}>Closed</MenuItem>
            </Select>
          </div>
          <Stack
            spacing={3}
            direction="column"
            alignItems="center"
            justifyContent="center"
          >
            <Button
              style={{
                color: "#3B54A0",
                outlineColor: "#3B54A0",
                borderColor: "#3B54A0",
              }}
              variant="outlined"
              sx={{ minWidth: 150, fontFamily: "Jaldi", fontSize: 20 }}
              onClick={clear}
            >
              Clear
            </Button>

            <Button
              style={{
                backgroundColor: "#3B54A0",
              }}
              variant="contained"
              sx={{ minWidth: 150, fontFamily: "Jaldi", fontSize: 20 }}
              onClick={submit}
            >
              Submit
            </Button>
          </Stack>
        </Stack>
      </div>
    </div>
  );
};

export default MobileMedicine;
