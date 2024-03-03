import React, {useState, useEffect, useContext} from "react"
import Modal from "@/components/common/modals/Modal";
import EmojiPicker from "emoji-picker-react";
import {ModalOpenContext} from "@/lib/context/ModalOpenContext";

export default function EmojiPickerModal({emoji, setEmoji}: any) {
    const {isEmojiPickerModalOpen, setIsEmojiPickerModalOpen} = useContext(ModalOpenContext);

    useEffect(() => {
        if (emoji) {
            setIsEmojiPickerModalOpen(false);
        }
    }, [emoji])

    const handleEmojiClick = (emojiObject: any, event: any) => {
        setEmoji(emojiObject.emoji);
    }

    return (
        <Modal isModalOpen={isEmojiPickerModalOpen} setIsModalOpen={setIsEmojiPickerModalOpen}>
            <EmojiPicker onEmojiClick={handleEmojiClick}/>
        </Modal>
    )
}
