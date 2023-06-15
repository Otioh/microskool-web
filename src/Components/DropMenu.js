import React from 'react';
import { Menu, MenuItem } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function DropMenu({
  items = [{}],
  open = false,
  anchorEl = <></>,
  handleClose,
}) {
  return (
    <div>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        {items.map((item) => {
          return (
            <MenuItem onClick={item.handleNextAction}>
              <FontAwesomeIcon icon={item.icon}></FontAwesomeIcon>{"   "} {item.title}
            </MenuItem>
          );
        })}
      </Menu>
    </div>
  );
}

export default DropMenu