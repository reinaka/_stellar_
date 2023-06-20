import { useState, useCallback } from 'react';

export const useModal = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const openModal = useCallback(() => {setIsModalVisible(true)}, [] );

    const closeModal = useCallback(() => {
        setIsModalVisible(false)}, []);

    return (
        [isModalVisible,
        openModal,
        closeModal]
    )
}
