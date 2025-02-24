import Button from "@components/Button";
import Modal from "@components/Modal";
import ModalBody from "@components/Modal/ModalBody";
import ModalFooter from "@components/Modal/ModalFooter";
import { IColors } from "@interface/common.interface";
import { ReactNode } from "react";

interface ConfirmationModalProps {
  title?: string;
  children?: ReactNode;
  onConfirm?: () => void;
  onConfirmLabel?: string;
  isOpen: boolean;
  onClose?: () => void;
  isSubmitting?: boolean;
  holdOn?: boolean;
  type?: IColors;
}

export const ConfirmationModal = ({
  isOpen,
  isSubmitting,
  title,
  children,
  onClose,
  onConfirm,
  onConfirmLabel,
  holdOn,
  type,
}: ConfirmationModalProps) => {
  return (
    <Modal
      isOpen={isOpen}
      holdOn={holdOn}
      title={title || "নিশ্চিতকরণ"}
      handleClose={onClose}
    >
      <ModalBody>
        <p>{children || "আপনি কি নিশ্চিত আপনি এটি মুছে ফেলতে চান?"}</p>
      </ModalBody>

      <ModalFooter>
        <div className="d-flex justify-content-end gap-3">
          <Button
            variant="outline"
            color="secondary"
            onClick={onClose}
            isDisabled={isSubmitting}
          >
            {"CLOSE"}
          </Button>
          <Button
            color={type || "danger"}
            onClick={onConfirm}
            isDisabled={isSubmitting}
            isLoading={isSubmitting}
          >
            {onConfirmLabel || "DELETE"}
          </Button>
        </div>
      </ModalFooter>
    </Modal>
  );
};
