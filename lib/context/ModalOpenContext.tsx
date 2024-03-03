import React, {createContext, ReactNode, useState} from "react";

interface ModalOpenContextProps {
    isCreateGoalModalOpen: boolean;
    setIsCreateGoalModalOpen: (isCreateGoalModalOpen: boolean) => void;
    createGoalModalType: string;
    setCreateGoalModalType: (createGoalModalType: string) => void;
    isDepositModalOpen: boolean;
    setIsDepositModalOpen: (isDepositModalOpen: boolean) => void;
    isWithdrawalModalOpen: boolean;
    setIsWithdrawalModalOpen: (isWithdrawalModalOpen: boolean) => void;
    isDistributeFundsModalOpen: boolean;
    setIsDistributeFundsModalOpen: (isDistributeFundsModalOpen: boolean) => void;
}

export const ModalOpenContext = createContext<ModalOpenContextProps>({
    isCreateGoalModalOpen: false,
    setIsCreateGoalModalOpen: () => {
    },
    createGoalModalType: '',
    setCreateGoalModalType: () => {
    },
    isDepositModalOpen: false,
    setIsDepositModalOpen: () => {
    },
    isWithdrawalModalOpen: false,
    setIsWithdrawalModalOpen: () => {
    },
    isDistributeFundsModalOpen: false,
    setIsDistributeFundsModalOpen: () => {
    }
})

interface ModalOpenProviderProps {
    children: ReactNode;
}

export const ModalOpenProvider = ({children}: ModalOpenProviderProps) => {
    const [isCreateGoalModalOpen, setIsCreateGoalModalOpen] = useState(false);
    const [createGoalModalType, setCreateGoalModalType] = useState('');
    const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);
    const [isWithdrawalModalOpen, setIsWithdrawalModalOpen] = useState(false);
    const [isDistributeFundsModalOpen, setIsDistributeFundsModalOpen] = useState(false);

    return (
        <ModalOpenContext.Provider value={{
            isCreateGoalModalOpen,
            setIsCreateGoalModalOpen,
            createGoalModalType,
            setCreateGoalModalType,
            isDepositModalOpen,
            setIsDepositModalOpen,
            isWithdrawalModalOpen,
            setIsWithdrawalModalOpen,
            isDistributeFundsModalOpen,
            setIsDistributeFundsModalOpen
        }}>
            {children}
        </ModalOpenContext.Provider>
    )
}
