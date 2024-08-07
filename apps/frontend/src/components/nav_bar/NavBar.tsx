import { Link, useLocation } from "react-router-dom";
import "./NavBar.css";
import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import bwhLogo from "../assets/bwh-logo-ICON-ONLY.svg";
import mapIcon from "../assets/NavBarIcons/map_icon.svg";
import patientListIcon from "../assets/NavBarIcons/patient_list.svg";
import homePinIcon from "../assets/NavBarIcons/home_pin.svg";
import flowerIcon from "../assets/NavBarIcons/flowers_icon.svg";
import medicineIcon from "../assets/NavBarIcons/medication_icon.svg";
import securityIcon from "../assets/NavBarIcons/security_icon.svg";
import sanitationIcon from "../assets/NavBarIcons/sanitation_icon.svg";
import roomSchedulingIcon from "../assets/NavBarIcons/schedule_icon.svg";
import languageIcon from "../assets/NavBarIcons/language_icon.svg";
import dropDownIcon from "../assets/NavBarIcons/drop_down.svg";
import creditIcon from "../assets/NavBarIcons/credit_menu.svg";
import transportIcon from "../assets/NavBarIcons/InternalTransportIcon.svg";
import mapEditingIcon from "../assets/NavBarIcons/MapEditingIcon.svg";
import dbIcon from "../assets/NavBarIcons/dbIcon.svg";
import giftIcon from "../assets/NavBarIcons/gift_icon.svg";
import aboutIcon from "../assets/NavBarIcons/about.svg";
import statsIcon from "../assets/NavBarIcons/stats_icon.svg";
import emailIcon from "../assets/NavBarIcons/email_icon.svg";
import { useNavigate } from "react-router-dom";
import { LoginButton } from "../LoginButton.tsx";
import { LogoutButton } from "../LogoutButton.tsx";
import { createTheme, FormControl, ThemeProvider } from "@mui/material";
import { useCallback, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import WebAppsCheck from "../HelperFunctions/WebAppsCheck.tsx";
declare module "@mui/material/styles" {
  interface Palette {
    websiteBlue: Palette["primary"];
  }

  interface PaletteOptions {
    websiteBlue?: PaletteOptions["primary"];
  }
}

// Update the Button's color options to include an ochre option
declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    websiteBlue: true;
  }
}

const theme = createTheme({
  palette: {
    websiteBlue: {
      main: "#003B9C",
      light: "#004ac4",
      dark: "#002c75",
      contrastText: "#00102b",
    },
  },
});

function NavBar() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const isMobile = navigator.userAgent.match(
    /(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i,
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const today = new Date();
  const [timeOfDay, updateTimeOfDay] = React.useState("");

  const location = useLocation();
  const [currServIcon, setServIcon] = React.useState(homePinIcon);

  const mapID = document.getElementById("mapID");
  const requestsID = document.getElementById("requestsID");
  const servicesID = document.getElementById("servicesID");
  const creditsID = document.getElementById("creditsID");
  const aboutID = document.getElementById("aboutID");
  const navButtonsID = document.getElementById("navButtonsID");
  const [backdropVisible, setBackdropVisible] = React.useState(false);

  const [username, setUsername] = React.useState("USERNAME");

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const { isAuthenticated, user } = useAuth0();
  const navigate = useNavigate();
  const handleClose = () => {
    setAnchorEl(null);
    if (backdropVisible) {
      onBackDropItemClick();
    }
  };

  const toHero = () => {
    if (backdropVisible) {
      onBackDropItemClick();
    }
    navigate("/");
  };

  useEffect(() => {
    if (navButtonsID) {
      console.log(navButtonsID.clientWidth);
      document.documentElement.style.setProperty(
        `--${"navButtonsWidth"}`,
        navButtonsID.clientWidth + "px",
      );
    }
  });

  const setServicesID = useCallback(() => {
    if (servicesID) {
      servicesID.classList.add("currItem");
    }
    if (mapID) {
      mapID.classList.remove("currItem");
    }
    if (creditsID) {
      creditsID.classList.remove("currItem");
    }
    if (aboutID) {
      aboutID.classList.remove("currItem");
    }
    if (requestsID) {
      requestsID.classList.remove("currItem");
    }
  }, [servicesID, mapID, requestsID, creditsID, aboutID]);

  const setMapID = useCallback(() => {
    if (servicesID) {
      servicesID.classList.remove("currItem");
    }
    if (mapID) {
      mapID.classList.add("currItem");
    }
    if (creditsID) {
      creditsID.classList.remove("currItem");
    }
    if (aboutID) {
      aboutID.classList.remove("currItem");
    }
    if (requestsID) {
      requestsID.classList.remove("currItem");
    }
  }, [servicesID, mapID, requestsID, creditsID, aboutID]);

  const setRequestsID = useCallback(() => {
    if (servicesID) {
      servicesID.classList.remove("currItem");
    }
    if (mapID) {
      mapID.classList.remove("currItem");
    }
    if (creditsID) {
      creditsID.classList.remove("currItem");
    }
    if (aboutID) {
      aboutID.classList.remove("currItem");
    }
    if (requestsID) {
      requestsID.classList.add("currItem");
    }
  }, [servicesID, mapID, requestsID, creditsID, aboutID]);

  const setCreditsID = useCallback(() => {
    if (servicesID) {
      servicesID.classList.remove("currItem");
    }
    if (mapID) {
      mapID.classList.remove("currItem");
    }
    if (requestsID) {
      requestsID.classList.remove("currItem");
    }
    if (creditsID) {
      console.log("make bold");
      creditsID.classList.add("currItem");
    }
    if (aboutID) {
      console.log("make bold");
      aboutID.classList.remove("currItem");
    }
  }, [servicesID, mapID, requestsID, creditsID, aboutID]);

  const setAboutID = useCallback(() => {
    if (servicesID) {
      servicesID.classList.remove("currItem");
    }
    if (mapID) {
      mapID.classList.remove("currItem");
    }
    if (requestsID) {
      requestsID.classList.remove("currItem");
    }
    if (creditsID) {
      console.log("make bold");
      creditsID.classList.remove("currItem");
    }
    if (aboutID) {
      console.log("make bold");
      aboutID.classList.add("currItem");
    }
  }, [servicesID, mapID, requestsID, creditsID, aboutID]);

  useEffect(() => {
    const hours = today.getHours();
    let timeOfDay = "";
    if (hours < 12) {
      timeOfDay = "Good Morning";
    } else if (hours < 17) {
      timeOfDay = "Good Afternoon";
    } else {
      timeOfDay = "Good Evening";
    }
    updateTimeOfDay(timeOfDay);
  }, [today]);

  useEffect(() => {
    console.log(location.pathname);
    switch (location.pathname) {
      case "/order-flowers":
        setServIcon(flowerIcon);
        setServicesID();
        break;
      case "/gift-request":
        setServIcon(giftIcon);
        setServicesID();
        break;
      case "/medicine-delivery-request":
        setServIcon(medicineIcon);
        setServicesID();
        break;
      case "/security-request":
        setServIcon(securityIcon);
        setServicesID();
        break;
      case "/sanitation-request":
        setServIcon(sanitationIcon);
        setServicesID();
        break;
      case "/room-scheduling":
        setServIcon(roomSchedulingIcon);
        setServicesID();
        break;
      case "/language-request":
        setServIcon(languageIcon);
        setServicesID();
        break;
      case "/transport-request":
        setServIcon(transportIcon);
        setServicesID();
        break;
      case "/map-debug":
        setServIcon(mapEditingIcon);
        setServicesID();
        break;
      case "/node-data":
        setServIcon(dbIcon);
        setServicesID();
        break;
      case "/message-publish":
        setServIcon(emailIcon);
        setServicesID();
        break;
      case "/all-service-requests":
        setServIcon(homePinIcon);
        setRequestsID();
        break;
      case "/floor-map":
        setServIcon(homePinIcon);
        setMapID();
        break;
      case "/credit-page":
        console.log("credit page");
        setServIcon(homePinIcon);
        setCreditsID();
        break;
      case "/about-page":
        console.log("about page");
        setServIcon(homePinIcon);
        setAboutID();
        break;
      case "/stats-page":
        setServIcon(statsIcon);
        setServicesID();
        break;
      default:
        setServIcon(homePinIcon);
    }
  }, [
    location,
    setServicesID,
    setMapID,
    setRequestsID,
    setCreditsID,
    setAboutID,
  ]);

  useEffect(() => {
    if (user) {
      if (user.name) {
        const name = user.name.split("@");
        setUsername(name[0]);
      }
    }
  }, [user]);

  const onBackDropClick = () => {
    if (!backdropVisible) {
      document.documentElement.style.setProperty(
        `--${"backdropwidth"}`,
        0 + "vw",
      );
      setBackdropVisible(true);
    } else if (backdropVisible) {
      document.documentElement.style.setProperty(
        `--${"backdropwidth"}`,
        100 + "vw",
      );
      setBackdropVisible(false);
    }
  };

  const onBackDropItemClick = () => {
    document.documentElement.style.setProperty(
      `--${"backdropwidth"}`,
      100 + "vw",
    );
    setBackdropVisible(false);
  };

  return (
    <div className="navbar">
      {/* Navbar content */}
      <div className={"leftSide"}>
        <img
          src={bwhLogo}
          className={"bwh-logo"}
          alt={
            "Brigham and Women's Hospital logo, reading " +
            "'Founding member, Mass General Brigham'"
          }
          onClick={toHero}
          style={{ cursor: "pointer" }} // Makes it clear the logo is clickable
        />

        <p className={"time"} onClick={toHero}>
          {timeOfDay}{" "}
        </p>
        <div className={"micVisibility"}>
          <WebAppsCheck />
        </div>
      </div>

      <div id={"navButtonsID"} className={"navButtons"}>
        <Link to={"/about-page"} id={"order"}>
          <Button className={"alignIcons"} onClick={onBackDropItemClick}>
            <img
              src={aboutIcon}
              className={"iconHeight"}
              width={"38px"}
              alt={"About Icon"}
            />
            <p id={"aboutID"} className={"itemNames"}>
              About
            </p>
          </Button>
        </Link>
        {isAuthenticated && (
          <Link to={"/floor-map"} id={"map"}>
            <Button className={"alignIcons"}>
              <img src={mapIcon} className={"iconHeight"} alt={"map_icon"} />
              <p id={"mapID"} className={"itemNames"}>
                {" "}
                Our Map
              </p>
            </Button>
          </Link>
        )}
        {username === "admind24s" && (
          <FormControl>
            <Link to={"/all-service-requests"} id={"order"}>
              <Button className={"alignIcons"}>
                <img
                  src={patientListIcon}
                  className={"iconHeight"}
                  width={"38px"}
                  alt={"PatientListIcon"}
                />
                <p id={"requestsID"} className={"itemNames"}>
                  All Requests
                </p>
              </Button>
            </Link>
          </FormControl>
        )}
        <Button
          id="services-button"
          aria-controls={open ? "services-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          <div className={"alignIcons"}>
            <img
              src={currServIcon}
              className={"iconHeight"}
              width={"29px"}
              alt={"currServIcon"}
            />
            <p id={"servicesID"} className={"itemNames"}>
              Services
            </p>
          </div>
          <img
            src={dropDownIcon}
            alt={"dropDownIcon"}
            className={"makeItBlue"}
          />
        </Button>
        <Menu
          id="services-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "services-button",
          }}
        >
          <Link to={"/order-flowers"} id={"order"}>
            <MenuItem onClick={handleClose}>
              <img
                src={flowerIcon}
                className={"iconHeight"}
                width={"38px"}
                alt={"Flower Icon"}
              />
              <p className={"item"}>Order Flowers</p>
            </MenuItem>
          </Link>

          <Link to={"/gift-request"} id={"order"}>
            <MenuItem onClick={handleClose}>
              <img
                src={giftIcon}
                className={"iconHeight"}
                width={"38px"}
                alt={"Gift Icon"}
              />
              <p className={"item"}>Gift Requests</p>
            </MenuItem>
          </Link>
          {isAuthenticated && (
            <>
              <Link to={"/medicine-delivery-request"} id={"order"}>
                <MenuItem onClick={handleClose}>
                  <img
                    src={medicineIcon}
                    className={"iconHeight"}
                    width={"38px"}
                    alt={"Medicine Icon"}
                  />
                  <p className={"item"}>Medical Delivery</p>
                </MenuItem>
              </Link>
              <Link to={"/sanitation-request"} id={"order"}>
                <MenuItem onClick={handleClose}>
                  <img
                    src={sanitationIcon}
                    className={"iconHeight"}
                    width={"38px"}
                    alt={"Sanitation Icon"}
                  />
                  <p className={"item"}>Sanitation Services</p>
                </MenuItem>
              </Link>
              <Link to={"/security-request"} id={"order"}>
                <MenuItem onClick={handleClose}>
                  <img
                    src={securityIcon}
                    className={"iconHeight"}
                    width={"38px"}
                    alt={"Security Icon"}
                  />
                  <p className={"item"}>Security Requests</p>
                </MenuItem>
              </Link>
              <Link to={"/room-scheduling"} id={"order"}>
                <MenuItem onClick={handleClose}>
                  <img
                    src={roomSchedulingIcon}
                    className={"iconHeight"}
                    width={"38px"}
                    alt={"Room Scheduling Icon"}
                  />
                  <p className={"item"}>Room Scheduling</p>
                </MenuItem>
              </Link>
              <Link to={"/language-request"} id={"order"}>
                <MenuItem onClick={handleClose}>
                  <img
                    src={languageIcon}
                    className={"iconHeight"}
                    width={"38px"}
                    alt={"Language Icon"}
                  />
                  <p className={"item"}>Language Request</p>
                </MenuItem>
              </Link>
              <Link to={"/transport-request"} id={"order"}>
                <MenuItem onClick={handleClose}>
                  <img
                    src={transportIcon}
                    className={"iconHeight"}
                    width={"38px"}
                    alt={"Transport Icon"}
                  />
                  <p className={"item"}>Transportation Request</p>
                </MenuItem>
              </Link>
              {username === "admind24s" && (
                <Link to={"/stats-page"} id={"order"}>
                  <MenuItem onClick={handleClose}>
                    <img
                      src={statsIcon}
                      className={"iconHeight"}
                      width={"38px"}
                      alt={"Transport Icon"}
                    />
                    <p className={"item"}>Statistics</p>
                  </MenuItem>
                </Link>
              )}
              {!isMobile && (
                <Link to={"/message-publish"} id={"order"}>
                  <MenuItem onClick={handleClose}>
                    <img
                      src={emailIcon}
                      className={"iconHeight"}
                      width={"38px"}
                      alt={"DB Icon"}
                    />
                    <p className={"item"}>Send Out Emails</p>
                  </MenuItem>
                </Link>
              )}
              {!isMobile && username === "admind24s" && (
                <Link to={"/map-debug"} id={"order"}>
                  <MenuItem onClick={handleClose}>
                    <img
                      src={mapEditingIcon}
                      className={"iconHeight"}
                      width={"38px"}
                      alt={"Map Editing Icon"}
                    />
                    <p className={"item"}>Map Editing Page</p>
                  </MenuItem>
                </Link>
              )}

              {!isMobile && username === "admind24s" && (
                <Link to={"/node-data"} id={"order"}>
                  <MenuItem onClick={handleClose}>
                    <img
                      src={dbIcon}
                      className={"iconHeight"}
                      width={"38px"}
                      alt={"DB Icon"}
                    />
                    <p className={"item"}>Manage Database</p>
                  </MenuItem>
                </Link>
              )}
            </>
          )}
        </Menu>

        <Link to={"/credit-page"} id={"order"}>
          <Button className={"alignIcons"} onClick={onBackDropItemClick}>
            <img
              src={creditIcon}
              className={"iconHeight"}
              width={"38px"}
              alt={"Credit Icon"}
            />
            <p id={"creditsID"} className={"itemNames"}>
              Credits
            </p>
          </Button>
        </Link>
      </div>
      <div className={"rightSide"}>
        {isAuthenticated && <p className={"username"}>{username}</p>}
        <FormControl>
          <ThemeProvider theme={theme}>
            {!isAuthenticated && <LoginButton />}
            {isAuthenticated && <LogoutButton />}
          </ThemeProvider>
        </FormControl>
      </div>
      <div className={"dropDownButton"}>
        <Button onClick={onBackDropClick}>
          <div className={"navDrop"}>
            <img src={creditIcon} className={"iconHeight"} width={"38px"} />
          </div>
        </Button>
      </div>
      <div className={"buttonsInDropDown"}>
        <div className={"itemDropDown"}>
          <Link to={"/floor-map"} id={"map"}>
            <Button
              className={"alignIconsDropDown"}
              onClick={onBackDropItemClick}
            >
              <p id={"mapID"} className={"itemNames"}>
                Our Map
              </p>
              <img src={mapIcon} className={"iconHeight"} alt={"map_icon"} />
            </Button>
          </Link>
        </div>
        {isAuthenticated && (
          <div className={"itemDropDown"}>
            <Link to={"/all-service-requests"} id={"order"}>
              <Button
                className={"alignIconsDropDown"}
                onClick={onBackDropItemClick}
              >
                <p id={"requestsID"} className={"itemNames"}>
                  All Requests
                </p>
                <img
                  src={patientListIcon}
                  className={"iconHeight"}
                  width={"38px"}
                  alt={"Patient List Icon"}
                />
              </Button>
            </Link>
          </div>
        )}
        <div className={"itemDropDown"}>
          <Button
            id="services-button"
            aria-controls={open ? "services-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            className={"alignIconsDropDown"}
            onClick={handleClick}
          >
            <img
              src={dropDownIcon}
              className={"makeItBlue"}
              alt={"drop down icon"}
            />
            <div className={"alignIconsDropDown"}>
              <p id={"servicesID"} className={"itemNames"}>
                Services
              </p>
              <img
                src={currServIcon}
                className={"iconHeight"}
                width={"29px"}
                alt={"curr serv icon"}
              />
            </div>
          </Button>
        </div>
        <div className={"itemDropDown"}>
          <Link to={"/credit-page"} id={"order"}>
            <Button
              className={"alignIconsDropDown"}
              onClick={onBackDropItemClick}
            >
              <p id={"creditsID"} className={"itemNames"}>
                Credits
              </p>
              <img
                src={creditIcon}
                className={"iconHeight"}
                width={"38px"}
                alt={"credit icon"}
              />
            </Button>
          </Link>
        </div>
        <div className={"itemDropDown"}>
          <Link to={"/about-page"} id={"order"}>
            <Button
              className={"alignIconsDropDown"}
              onClick={onBackDropItemClick}
            >
              <p id={"aboutID"} className={"itemNames"}>
                About
              </p>
              <img
                src={aboutIcon}
                className={"iconHeight"}
                width={"38px"}
                alt={"credit icon"}
              />
            </Button>
          </Link>
        </div>

        <div className={"itemDropDown"}>
          <ThemeProvider theme={theme}>
            {!isAuthenticated && <LoginButton />}
            {isAuthenticated && <LogoutButton />}
          </ThemeProvider>
        </div>
        <div className={"itemDropDown"}>
          <WebAppsCheck />
        </div>
      </div>
      <div id={"backDropID"} className={"dropDownBackDrop"} />
      <div className={"blueBar"} />
    </div>
  );
}

export default NavBar;
