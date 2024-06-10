import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

export const ConfirmationDialog = ({
  isOpen,
  text,
  loading,
  handleConfirm,
}) => {
  return (
    <>
      <Dialog open={isOpen} handler={() => handleConfirm(false)}>
        <DialogHeader>Confirmation dialog</DialogHeader>
        <DialogBody>{text}</DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={() => handleConfirm(false)}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button
            variant="gradient"
            color="green"
            loading={loading ? true : "undefined"}
            onClick={() => handleConfirm(true)}
          >
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};
