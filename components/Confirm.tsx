import React from "react";
import { Button, Modal } from "semantic-ui-react";

export default function Confirm({
  header,
  message,
  acceptFn,
  cancelFn,
  onClose,
  open,
}: {
  header: string;
  message: string;
  acceptFn: () => void;
  cancelFn?: () => void;
  onClose?: () => void;
  open: boolean;
}) {
  return (
    <Modal size="tiny" open={open} onClose={onClose}>
      <Modal.Header>{header}</Modal.Header>
      <Modal.Content>
        <p>{message}</p>
      </Modal.Content>
      <Modal.Actions>
        <Button negative onClick={() => cancelFn && cancelFn()}>
          No
        </Button>
        <Button positive onClick={acceptFn}>
          Yes
        </Button>
      </Modal.Actions>
    </Modal>
  );
}
