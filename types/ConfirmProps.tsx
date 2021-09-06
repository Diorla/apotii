export interface ConfirmState {
  header: string;
  message: string;
  open: boolean;
}

export default interface ConfirmProps extends ConfirmState {
  acceptFn: () => void;
  cancelFn?: () => void;
  onClose?: () => void;
}
