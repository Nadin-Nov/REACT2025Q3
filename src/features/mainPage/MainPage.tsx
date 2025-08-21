import { useState } from 'react';

import { Button } from '../../shared/ui/Button/Button';
import { Modal } from '../../shared/ui/Modal/Modal';

import styles from './mainPage.module.css';

export const MainPage = () => {
  const [modal, setModal] = useState<'hook' | 'uncontrolled' | null>(null);

  return (
    <div className={styles.container}>
      <Button onClick={() => setModal('hook')}>Open Hook Modal</Button>
      <Button onClick={() => setModal('uncontrolled')}>
        Open Uncontrolled Modal
      </Button>

      <Modal open={modal === 'hook'} onClose={() => setModal(null)}>
        <div>Hook Modal Content</div>
      </Modal>

      <Modal open={modal === 'uncontrolled'} onClose={() => setModal(null)}>
        <div>Uncontrolled Modal Content</div>
      </Modal>
    </div>
  );
};
