import React from 'react';
import { Box, Center, Heading, Text } from '@chakra-ui/react';

const VerificationError = () => {
    return (
        <Center height="100vh">
            <Box textAlign="center">
                <Heading mb={4}>Email Verification Required</Heading>
                <Text>Please verify your email to continue.</Text>
            </Box>
        </Center>
    );
};

export default VerificationError;
