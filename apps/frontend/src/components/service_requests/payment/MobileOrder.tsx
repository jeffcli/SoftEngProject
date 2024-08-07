import React from "react";
import BackgroundImg2 from "../../assets/blue-background2.jpg";
import "../../AllMobile.css";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const MobileOrder = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [cvv, setCvv] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [nameOnCard, setNameOnCard] = useState("");
  const navigate = useNavigate();

  // const { formData, setFormData } = useFormData();

  async function submit() {
    if (
      cardNumber == "" ||
      cvv == "" ||
      expirationDate == "" ||
      nameOnCard == ""
    ) {
      alert("Please fill out all information on the page");
    } else if (!isValidNumber(cardNumber) || cardNumber.length != 16) {
      alert("Please Enter a valid card number");
    } else if (!isValidNumber(cvv) || cvv.length != 3) {
      alert("Please Enter a valid CVV");
    } else if (!isValidDate(expirationDate)) {
      alert("Please Enter a valid expiration date");
    } else if (expirationDate.length != 7) {
      alert("Please Enter a valid expiration date");
    } else {
      navigate("/order-flowers-result");
    }
  }

  function isValidNumber(input: string): boolean {
    return input.trim() !== "" && !isNaN(Number(input));
  }

  function isValidDate(input: string): boolean {
    if (input.charAt(2) !== "/") {
      return false;
    } else if (
      !isValidNumber(input.substring(0, 2)) ||
      !isValidNumber(input.substring(3, 6))
    ) {
      return false;
    } else if (!(input.charAt(0) === "0" || input.charAt(0) === "1")) {
      return false;
    } else if (parseInt(input.substring(0, 2)) > 12) {
      return false;
    } else {
      return true;
    }
  }

  const handleBack = () => {
    navigate("/order-flowers");
  };

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
        <p className={"title"}>Payment Information </p>

        <Stack alignItems="center" justifyContent="center" spacing={3} p={4}>
          <div>
            <TextField
              label="Credit card number"
              onChange={(e) => setCardNumber(e.target.value)}
              sx={{ minWidth: 275 }}
            />
          </div>
          <div>
            <Stack
              spacing={1}
              direction="column"
              alignItems="center"
              justifyContent="center"
            >
              <div>
                <TextField
                  value={expirationDate}
                  onChange={(e) => setExpirationDate(e.target.value)}
                  sx={{ minWidth: 275 }}
                  label="Expiration Date (MM/YYYY)"
                />
              </div>
              <div>
                <TextField
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                  sx={{ minWidth: 275 }}
                  label="CVV"
                />
              </div>
            </Stack>
          </div>

          <TextField
            value={nameOnCard}
            onChange={(e) => setNameOnCard(e.target.value)}
            sx={{ minWidth: 275 }}
            label="Name on Card"
          />

          <Stack
            spacing={2}
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
              sx={{ minWidth: 250, minHeight: 50 }}
              onClick={handleBack}
            >
              Back
            </Button>

            <Button
              style={{
                backgroundColor: "#3B54A0",
              }}
              variant="contained"
              sx={{ minWidth: 250, minHeight: 50 }}
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

export default MobileOrder;
