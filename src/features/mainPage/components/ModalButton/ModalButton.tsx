import type { FC } from 'react';

import { Button } from '../../../../shared/ui/Button/Button';
import styles from '../../mainPage.module.css';

type ModalButtonsProps = {
  onOpenHook: () => void;
  onOpenUncontrolled: () => void;
};

export const ModalButtons: FC<ModalButtonsProps> = ({
  onOpenHook,
  onOpenUncontrolled,
}) => (
  <div className={styles.buttons}>
    <Button onClick={onOpenHook}>Open Hook Modal</Button>
    <Button onClick={onOpenUncontrolled}>Open Uncontrolled Modal</Button>
  </div>
);
