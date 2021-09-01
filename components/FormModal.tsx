import React from "react";
import { Button, Modal } from "semantic-ui-react";

export default function FormModal({
  title,
  toggleModal,
  open,
  children,
  trigger,
  submit,
}: {
  toggleModal: (e: boolean) => void;
  title: string;
  open: boolean;
  children: React.ReactNode;
  trigger: React.ReactNode;
  submit: () => void;
}) {
  return (
    <Modal
      onClose={() => toggleModal(false)}
      onOpen={() => toggleModal(true)}
      open={open}
      trigger={trigger}
    >
      <Modal.Header>{title}</Modal.Header>
      <Modal.Content>{children}</Modal.Content>
      <Modal.Actions>
        <Button color="black" onClick={() => toggleModal(false)}>
          Close
        </Button>
        <Button
          content="Submit"
          labelPosition="right"
          icon="checkmark"
          onClick={() => submit()}
          positive
        />
      </Modal.Actions>
    </Modal>
  );
}
