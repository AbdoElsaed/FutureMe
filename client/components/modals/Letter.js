import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";

import { isMobile } from "react-device-detect";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: isMobile ? "95%" : "60%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 2,
};

const Letter = ({ open, setOpen, handleClose, msg, handleMsg }) => {
  return (
    <div>
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
          <TextField
            id="modalMsg"
            label="Letter"
            multiline
            rows={16}
            value={msg}
            onChange={handleMsg}
            style={{ width: "100%", height: "100%" }}
            autoFocus
            inputRef={(input) => input && input.focus()}
          />
        </Box>
      </Modal>
    </div>
  );
};

export default Letter;
