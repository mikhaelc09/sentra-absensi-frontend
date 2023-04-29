import {
    Alert, AlertIcon, AlertTitle, AlertDescription, useDisclosure,
    Box, CloseButton, Button
  } from '@chakra-ui/react'

function Alert({ status, message }){
    const {
        isOpen: isVisible,
        onClose,
        onOpen,
    } = useDisclosure({ defaultIsOpen: true })

    return isVisible ? (
        <Alert status={ status }>
            <AlertIcon />
            <Box>
                <AlertTitle>Success!</AlertTitle>
                <AlertDescription>
                { message }
                </AlertDescription>
            </Box>
            <CloseButton
                alignSelf='flex-start'
                position='relative'
                right={-1}
                top={-1}
                onClick={onClose}
            />
        </Alert>
    ) : (
        <Button onClick={onOpen}>Show Alert</Button>
    )
}

export default Alert