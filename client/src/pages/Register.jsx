import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../features/auth/authSlice'; // Make sure to create userSlice with appropriate actions
import {
    Alert,
    AlertIcon,
    Box,
    Button,
    Center,
    FormControl,
    FormLabel,
    Heading,
    Input,
} from '@chakra-ui/react';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const dispatch = useDispatch();

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validateForm = () => {
        if (!email) {
            setError('Email is required');
            return false;
        } else if (!validateEmail(email)) {
            setError('Email is not valid');
            return false;
        }

        if (password.length < 6) {
            setError('Password should be at least 6 characters long!');
            return false;
        }

        if (password !== confirmPassword) {
            setError('Password and Confirm Password should be same!');
            return false;
        }

        setError('');
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            dispatch(registerUser({ email, password }));
        }
    };

    return (
        <Center>
            <Box
                w="100%"
                maxW="400px"
                p={8}
                bgGradient={[
                    'linear(to-tr, teal.300, yellow.400)',
                    'linear(to-t, blue.200, teal.500)',
                    'linear(to-b, orange.100, purple.300)',
                ]}
            >
                <Heading as="h2" size="xl" mb={4} textAlign="center" color="gray.800">
                    Register
                </Heading>
                <form onSubmit={handleSubmit}>
                    {error && (
                        <Alert status="error" mb={4}>
                            <AlertIcon />
                            {error}
                        </Alert>
                    )}
                    <FormControl isRequired>
                        <FormLabel>Email</FormLabel>
                        <Input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </FormControl>
                    <FormControl isRequired mt={4}>
                        <FormLabel>Password</FormLabel>
                        <Input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </FormControl>
                    <FormControl isRequired mt={4}>
                        <FormLabel>Confirm Password</FormLabel>
                        <Input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </FormControl>
                    <Center>
                        <Button
                            type="submit"
                            variant="outline"
                            m={4}
                            p={2}
                            color="gray.800"
                            fontWeight="bold"
                            borderRadius="md"
                            bgGradient={[
                                'linear(to-tr, teal.300, yellow.400)',
                                'linear(to-t, blue.200, teal.500)',
                                'linear(to-tr, orange.100, purple.300)',
                            ]}
                            _hover={{
                                bgGradient: 'linear(to-tr, orange.100, purple.300)',
                            }}
                        >
                            Submit
                        </Button>
                    </Center>
                </form>
            </Box>
        </Center>
    );
};

export default Register;
