import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, User, Gavel, Store, Phone, ChevronDown, Upload, AlertCircle, FileText, X, ArrowLeft } from 'lucide-react';
import { darkLogo, otherData } from '../assets';
import { loadStripe } from '@stripe/stripe-js';
import { useStripe, useElements, CardElement, Elements } from '@stripe/react-stripe-js';
import axios from "axios";
import { toast } from "react-hot-toast";
import { useAuth } from '../contexts/AuthContext';
import useCountryStates from '../hooks/useCountryStates';
import { OTP } from '../components';

// Initialize Stripe
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

// CardSection component (same as before)
const CardSection = () => {
    const stripe = useStripe();
    const elements = useElements();

    return (
        <div className="space-y-4 border-t border-gray-200 dark:border-bg-primary-light pt-6 mt-6">
            <h3 className="text-lg font-semibold text-text-primary dark:text-text-primary-dark">Payment Information</h3>
            <p className="text-sm text-text-secondary dark:text-text-secondary-dark">
                {otherData?.brandName} requires a credit card to bid. There is no charge to register.
                We will only authorize that your card is valid.
            </p>

            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-text-secondary dark:text-text-secondary-dark mb-2">
                        Credit Card Information
                    </label>
                    <div className="p-4 border border-gray-300 dark:border-bg-primary-light rounded-lg bg-gray-50 dark:bg-bg-primary-light">
                        <CardElement
                            options={{
                                style: {
                                    base: {
                                        fontSize: '16px',
                                        color: '#008000',
                                        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
                                        '::placeholder': {
                                            color: '#aab7c4',
                                        },
                                    },
                                    invalid: {
                                        color: '#fa755a',
                                        iconColor: '#fa755a',
                                    },
                                },
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

// Phone Verification Step Component
const PhoneVerificationStep = ({ onVerified, initialPhone }) => {
    const [step, setStep] = useState('phone'); // 'phone' or 'otp'
    const [phone, setPhone] = useState(initialPhone || '');
    const [isLoading, setIsLoading] = useState(false);

    const handleSendOTP = async () => {
        if (!phone) {
            toast.error('Please enter phone number');
            return;
        }

        setIsLoading(true);
        try {
            await axios.post(`${import.meta.env.VITE_DOMAIN_URL}/api/v1/otp/send`, { phone });
            setStep('otp');
            toast.success('OTP sent successfully');
        } catch (error) {
            toast.error(error?.response?.data?.error || 'Failed to send OTP');
        } finally {
            setIsLoading(false);
        }
    };

    const handleVerifyOTP = async (otp) => {
        setIsLoading(true);
        try {
            await axios.post(`${import.meta.env.VITE_DOMAIN_URL}/api/v1/otp/verify`, { phone, otp });
            toast.success('Phone verified successfully');
            onVerified(phone); // Pass verified phone to parent
        } catch (error) {
            toast.error(error?.response?.data?.error || 'Invalid OTP');
        } finally {
            setIsLoading(false);
        }
    };

    if (step === 'phone') {
        return (
            <div className="space-y-6">
                <div className="text-center">
                    <h3 className="text-lg font-semibold text-text-primary dark:text-text-primary-dark">Verify Your Phone</h3>
                    <p className="text-sm text-text-secondary dark:text-text-secondary-dark mt-2">
                        We'll send a verification code to your phone
                    </p>
                </div>

                <div>
                    <label className="block text-sm font-medium text-text-secondary dark:text-text-secondary-dark mb-2">
                        Phone Number
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Phone size={20} className="text-bg-secondary-dark dark:text-gray-600" />
                        </div>
                        <input
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="Enter your phone number"
                            className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-bg-primary-light bg-bg-secondary dark:bg-bg-primary text-text-primary dark:text-text-primary-dark rounded-lg focus:ring-2 focus:ring-secondary-darktext-bg-secondary-dark dark:focus:ring-gray-500 focus:border-transparent"
                        />
                    </div>
                </div>

                <button
                    type="button"
                    onClick={handleSendOTP}
                    disabled={isLoading}
                    className="w-full bg-bg-primary dark:bg-bg-secondary text-text-primary-dark dark:text-text-primary hover:opacity-90 py-3 px-4 rounded-lg font-semibold transition-colors disabled:opacity-50"
                >
                    {isLoading ? 'Sending...' : 'Send Verification Code'}
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <button
                onClick={() => setStep('phone')}
                className="flex items-center text-text-secondary dark:text-text-secondary-dark hover:text-text-primary dark:hover:text-text-primary-dark"
            >
                <ArrowLeft size={20} className="mr-2" />
                Back
            </button>
            <OTP
                phone={phone}
                onVerify={handleVerifyOTP}
                isLoading={isLoading}
            />
        </div>
    );
};

// Main Register component
const Register = () => {
    const [currentStep, setCurrentStep] = useState(1); // Step 1: Phone, Step 2: Form, Step 3: Submit
    const [verifiedPhone, setVerifiedPhone] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    // const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [userType, setUserType] = useState('');
    const navigate = useNavigate();
    const { setUser, user } = useAuth();
    const countriesAPI = useCountryStates();
    const [countries, setCountries] = useState([]);

    const [identificationDocument, setIdentificationDocument] = useState(null);
    const [identificationDocumentPreview, setIdentificationDocumentPreview] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [idVerificationError, setIdVerificationError] = useState('');

    useEffect(() => {
        const fetchCountries = async () => {
            setCountries(await countriesAPI());
        };
        fetchCountries();
    }, []);

    useEffect(() => {
        if (user) {
            navigate(`/${user.userType}/profile`);
        }
    }, [user, navigate]);

    const stripe = useStripe();
    const elements = useElements();

    const { register, handleSubmit, watch, formState: { errors }, setValue } = useForm({
        defaultValues: {
            email: '',
            phone: '',
            password: '',
            // confirmPassword: '',
            username: '',
            firstName: '',
            lastName: '',
            country: '',
            userType: ''
        }
    });

    const password = watch('password');

    const handleUserTypeChange = (type) => {
        setUserType(type);
        setValue('userType', type);
    };

    const handlePhoneVerified = (phone) => {
        setVerifiedPhone(phone);
        setValue('phone', phone); // Set phone in form
        setCurrentStep(2); // Move to registration form
    };

    const handleIdentificationDocumentChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                toast.error('File size should be less than 5MB');
                return;
            }

            const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
            if (!allowedTypes.includes(file.type)) {
                toast.error('Please upload JPG, PNG, or PDF files only');
                return;
            }

            setIdentificationDocument(file);

            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setIdentificationDocumentPreview(reader.result);
                };
                reader.readAsDataURL(file);
            } else {
                setIdentificationDocumentPreview(null);
            }
        }
    };

    const removeIdentificationDocument = () => {
        setIdentificationDocument(null);
        setIdentificationDocumentPreview(null);
        document.getElementById('identificationDocument').value = '';
    };

    const onSubmit = async (registrationData) => {
        // Ensure phone is verified
        if (!verifiedPhone) {
            toast.error('Please verify your phone number first');
            setCurrentStep(1);
            return;
        }

        // Validate ID document for both user types (since it's required)
        if (!identificationDocument) {
            setIdVerificationError('Please upload an identification document');
            // Scroll to the ID verification section
            const idSection = document.getElementById('id-verification-section');
            if (idSection) {
                idSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            toast.error('Identification document is required');
            return;
        }

        // Clear any previous error
        setIdVerificationError('');

        setIsLoading(true);
        try {
            let paymentMethodId = null;

            const formData = new FormData();

            // Append all form data
            formData.append('firstName', registrationData.firstName);
            formData.append('lastName', registrationData.lastName);
            formData.append('email', registrationData.email);
            formData.append('phone', verifiedPhone); // Use verified phone
            formData.append('password', registrationData.password);
            formData.append('username', registrationData.username);
            formData.append('countryCode', registrationData.country);
            formData.append('countryName', countries.find(c => c.code === registrationData.country)?.name || registrationData.country);
            formData.append('userType', registrationData.userType);

            // Handle bidder card verification
            if (registrationData.userType === 'bidder') {
                if (!stripe || !elements) {
                    toast.error('Stripe not initialized properly');
                    setIsLoading(false);
                    return;
                }

                const cardElement = elements.getElement(CardElement);
                if (!cardElement) {
                    toast.error('Please enter your card details');
                    setIsLoading(false);
                    return;
                }

                const { error, paymentMethod } = await stripe.createPaymentMethod({
                    type: 'card',
                    card: cardElement,
                    billing_details: {
                        name: `${registrationData.firstName} ${registrationData.lastName}`,
                        email: registrationData.email,
                        phone: verifiedPhone,
                        address: {
                            country: registrationData.country,
                        }
                    }
                });

                if (error) {
                    toast.error(`Payment error: ${error.message}`);
                    setIsLoading(false);
                    return;
                }

                paymentMethodId = paymentMethod.id;
                formData.append('paymentMethodId', paymentMethodId);
            }

            if (identificationDocument) {
                formData.append('identificationDocument', identificationDocument);
            }

            const { data } = await axios.post(
                `${import.meta.env.VITE_DOMAIN_URL}/api/v1/users/register`,
                formData,
                {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                    onUploadProgress: (progressEvent) => {
                        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                        setUploadProgress(percentCompleted);
                    },
                }
            );

            if (data.success) {
                const accessToken = data.data.accessToken;
                const refreshToken = data.data.refreshToken;
                localStorage.setItem('accessToken', accessToken);
                localStorage.setItem('refreshToken', refreshToken);
                localStorage.setItem('user', JSON.stringify(data.data.user));

                setUser(data.data.user);

                const redirectPath = data.data.user.userType === 'seller'
                    ? '/seller/dashboard'
                    : '/bidder/dashboard';

                navigate(redirectPath);
                toast.success(data.message);
            }

        } catch (error) {
            toast.error(error?.response?.data?.message || 'Registration failed');
            console.error('Registration error:', error);
        } finally {
            setIsLoading(false);
            setUploadProgress(0);
        }
    };

    // Render step indicator
    const renderStepIndicator = () => {
        return (
            <div className="flex items-center justify-center my-5">
                <div className="flex items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 1 ? 'bg-bg-primary dark:bg-bg-secondary text-text-primary-dark dark:text-text-primary' : 'bg-gray-200 dark:bg-bg-primary-light text-gray-600 dark:text-bg-secondary-dark'
                        }`}>
                        1
                    </div>
                    <div className={`w-16 sm:w-32 h-1 ${currentStep >= 2 ? 'bg-bg-primary dark:bg-bg-secondary' : 'bg-gray-200 dark:bg-bg-primary-light'
                        }`} />
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 2 ? 'bg-bg-primary dark:bg-bg-secondary text-text-primary-dark dark:text-text-primary' : 'bg-gray-200 dark:bg-bg-primary-light text-gray-600 dark:text-bg-secondary-dark'
                        }`}>
                        2
                    </div>
                    <div className={`w-16 sm:w-32 h-1 ${currentStep >= 3 ? 'bg-bg-primary dark:bg-bg-secondary' : 'bg-gray-200 dark:bg-bg-primary-light'
                        }`} />
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 3 ? 'bg-bg-primary dark:bg-bg-secondary text-text-primary-dark dark:text-text-primary' : 'bg-gray-200 dark:bg-bg-primary-light text-gray-600 dark:text-bg-secondary-dark'
                        }`}>
                        3
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen pt-32 pb-16 bg-bg-secondary dark:bg-bg-primary flex items-center justify-center p-4">
            <div className="bg-gradient-to-b from-bg-primary/[0.03] to-transparent dark:from-white/[0.03] dark:to-transparent rounded-2xl shadow-xl w-full max-w-4xl overflow-hidden border border-gray-200 dark:border-bg-primary-light">
                <div className="pt-8 text-center flex flex-col items-center justify-center gap-3">
                    <img src={darkLogo} alt="logo" className='h-10' />
                    <p className="text-text-primary dark:text-text-primary-dark text-lg">Create your account</p>
                </div>

                {renderStepIndicator()}

                <div className="p-5 sm:p-8">
                    {currentStep === 1 && (
                        <PhoneVerificationStep
                            onVerified={handlePhoneVerified}
                            initialPhone={verifiedPhone}
                        />
                    )}

                    {currentStep === 2 && (
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            {/* Account Information */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-text-primary dark:text-text-primary-dark">Account Information</h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-text-secondary dark:text-text-secondary-dark mb-2">
                                            Email
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <Mail size={20} className="text-bg-secondary-dark dark:text-gray-600" />
                                            </div>
                                            <input
                                                type="email"
                                                {...register('email', {
                                                    required: 'Email is required',
                                                    pattern: {
                                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                        message: 'Invalid email address'
                                                    }
                                                })}
                                                className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-bg-primary-light bg-bg-secondary dark:bg-bg-primary text-text-primary dark:text-text-primary-dark rounded-lg focus:ring-2 focus:ring-secondary-darktext-bg-secondary-dark dark:focus:ring-gray-500 focus:border-transparent"
                                                placeholder="Enter your email"
                                            />
                                        </div>
                                        {errors.email && (
                                            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                                        )}
                                    </div>

                                    <div className="grid grid-cols-1 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-text-secondary dark:text-text-secondary-dark mb-2">
                                                Password
                                            </label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                    <Lock size={20} className="text-bg-secondary-dark dark:text-gray-600" />
                                                </div>
                                                <input
                                                    type={showPassword ? 'text' : 'password'}
                                                    {...register('password', {
                                                        required: 'Password is required',
                                                        minLength: { value: 6, message: 'Password must be at least 6 characters' }
                                                    })}
                                                    className="block w-full pl-10 pr-12 py-3 border border-gray-300 dark:border-bg-primary-light bg-bg-secondary dark:bg-bg-primary text-text-primary dark:text-text-primary-dark rounded-lg focus:ring-2 focus:ring-secondary-darktext-bg-secondary-dark dark:focus:ring-gray-500 focus:border-transparent"
                                                    placeholder="Enter your password"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                                >
                                                    {showPassword ? <EyeOff size={20} className="text-bg-secondary-dark dark:text-gray-600" /> : <Eye size={20} className="text-bg-secondary-dark dark:text-gray-600" />}
                                                </button>
                                            </div>
                                            {errors.password && (
                                                <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Personal Information */}
                            <div className="space-y-4 border-t border-gray-200 dark:border-bg-primary-light pt-6">
                                <h3 className="text-lg font-semibold text-text-primary dark:text-text-primary-dark">Personal Information</h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-text-secondary dark:text-text-secondary-dark mb-2">
                                            First name
                                        </label>
                                        <input
                                            type="text"
                                            {...register('firstName', {
                                                required: 'First name is required',
                                                minLength: { value: 2, message: 'First name must be at least 2 characters' }
                                            })}
                                            className="w-full p-3 border border-gray-300 dark:border-bg-primary-light bg-bg-secondary dark:bg-bg-primary text-text-primary dark:text-text-primary-dark rounded-lg focus:ring-2 focus:ring-secondary-darktext-bg-secondary-dark dark:focus:ring-gray-500 focus:border-transparent"
                                            placeholder="First name"
                                        />
                                        {errors.firstName && (
                                            <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-text-secondary dark:text-text-secondary-dark mb-2">
                                            Last name
                                        </label>
                                        <input
                                            type="text"
                                            {...register('lastName', {
                                                required: 'Last name is required',
                                                minLength: { value: 2, message: 'Last name must be at least 2 characters' }
                                            })}
                                            className="w-full p-3 border border-gray-300 dark:border-bg-primary-light bg-bg-secondary dark:bg-bg-primary text-text-primary dark:text-text-primary-dark rounded-lg focus:ring-2 focus:ring-secondary-darktext-bg-secondary-dark dark:focus:ring-gray-500 focus:border-transparent"
                                            placeholder="Last name"
                                        />
                                        {errors.lastName && (
                                            <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-text-secondary dark:text-text-secondary-dark mb-2">
                                            Username
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <User size={20} className="text-bg-secondary-dark dark:text-gray-600" />
                                            </div>
                                            <input
                                                type="text"
                                                {...register('username', {
                                                    required: 'Username is required',
                                                    minLength: { value: 3, message: 'Username must be at least 3 characters' },
                                                    pattern: {
                                                        value: /^[a-zA-Z0-9_]+$/,
                                                        message: 'Username can only contain letters, numbers, and underscores'
                                                    }
                                                })}
                                                className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-bg-primary-light bg-bg-secondary dark:bg-bg-primary text-text-primary dark:text-text-primary-dark rounded-lg focus:ring-2 focus:ring-secondary-darktext-bg-secondary-dark dark:focus:ring-gray-500 focus:border-transparent"
                                                placeholder="What others see when you bid"
                                            />
                                        </div>
                                        {errors.username && (
                                            <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-text-secondary dark:text-text-secondary-dark mb-2">
                                            Country of residence
                                        </label>
                                        <div className="relative">
                                            <select
                                                {...register('country', { required: 'Country is required' })}
                                                className="w-full p-3 border border-gray-300 dark:border-bg-primary-light bg-bg-secondary dark:bg-bg-primary text-text-primary dark:text-text-primary-dark rounded-lg focus:ring-2 focus:ring-secondary-darktext-bg-secondary-dark dark:focus:ring-gray-500 focus:border-transparent appearance-none"
                                            >
                                                <option value="">Select country</option>
                                                {countries.map(country => (
                                                    <option key={country.code} value={country.code}>
                                                        {country.name}
                                                    </option>
                                                ))}
                                            </select>
                                            <ChevronDown size={20} className="absolute right-3 top-3 text-bg-secondary-dark dark:text-gray-600 pointer-events-none" />
                                        </div>
                                        {errors.country && (
                                            <p className="text-red-500 text-sm mt-1">{errors.country.message}</p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* User Type Selection */}
                            <div className="border-t border-gray-200 dark:border-bg-primary-light pt-6">
                                <label className="text-sm font-medium leading-none text-text-secondary dark:text-text-secondary-dark flex items-center gap-2 mb-4">
                                    <User size={20} />
                                    <span>User Type</span>
                                </label>

                                <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row items-stretch gap-3 my-2">
                                    <label
                                        className={`flex items-center gap-5 border py-3 px-5 rounded cursor-pointer transition-colors ${userType === 'bidder' ? 'border-primary dark:border-primary-dark bg-blue-50 dark:bg-bg-primary-light' : 'border-gray-200 dark:border-bg-primary-light hover:border-gray-300 dark:hover:border-gray-600'
                                            }`}
                                    >
                                        <input
                                            type="radio"
                                            value="bidder"
                                            {...register('userType', { required: 'Please select user type' })}
                                            className="hidden"
                                            onChange={() => handleUserTypeChange('bidder')}
                                        />
                                        <Gavel size={40} className={`flex-shrink-0 p-2 rounded ${userType === 'bidder' ? 'bg-bg-primary dark:bg-bg-secondary text-text-primary-dark dark:text-text-primary' : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-bg-secondary-dark'
                                            }`} />
                                        <div>
                                            <p className="text-sm font-semibold text-text-primary dark:text-text-primary-dark">I'm a bidder</p>
                                            <p className="text-sm text-text-secondary dark:text-text-secondary-dark">I want to bid on the listings on the platform.</p>
                                        </div>
                                    </label>

                                    <label
                                        className={`flex items-center gap-5 border py-3 px-5 rounded cursor-pointer transition-colors ${userType === 'seller' ? 'border-primary dark:border-primary-dark bg-blue-50 dark:bg-bg-primary-light' : 'border-gray-200 dark:border-bg-primary-light hover:border-gray-300 dark:hover:border-gray-600'
                                            }`}
                                    >
                                        <input
                                            type="radio"
                                            value="seller"
                                            {...register('userType', { required: 'Please select user type' })}
                                            className="hidden"
                                            onChange={() => handleUserTypeChange('seller')}
                                        />
                                        <Store size={40} className={`flex-shrink-0 p-2 rounded ${userType === 'seller' ? 'bg-bg-primary dark:bg-bg-secondary text-text-primary-dark dark:text-text-primary' : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-bg-secondary-dark'
                                            }`} />
                                        <div>
                                            <p className="text-sm font-semibold text-text-primary dark:text-text-primary-dark">I'm a seller</p>
                                            <p className="text-sm text-text-secondary dark:text-text-secondary-dark">I want to list things on the platform.</p>
                                        </div>
                                    </label>
                                </div>
                                {errors.userType && (
                                    <p className="text-red-500 text-sm mt-1">{errors.userType.message}</p>
                                )}
                            </div>

                            {/* ID Verification Section */}
                            <div id="id-verification-section" className="border-t border-gray-200 dark:border-bg-primary-light pt-6">
                                <h3 className="text-lg font-semibold text-text-primary dark:text-text-primary-dark mb-4">Identity Verification</h3>
                                <p className="text-sm text-text-secondary dark:text-text-secondary-dark mb-4">
                                    Please upload a valid government-issued ID (Driver's License, Passport, or National ID Card)
                                </p>

                                <div className="space-y-4">
                                    <div className="relative">
                                        <input
                                            type="file"
                                            id="identificationDocument"
                                            accept=".jpg,.jpeg,.png,.pdf"
                                            onChange={handleIdentificationDocumentChange}
                                            className="hidden"
                                        />

                                        {!identificationDocument ? (
                                            <label
                                                htmlFor="identificationDocument"
                                                className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 dark:border-bg-primary-light rounded-lg cursor-pointer hover:border-primary dark:hover:border-primary-dark hover:bg-blue-50 dark:hover:bg-bg-primary-light transition-colors"
                                            >
                                                <Upload size={24} className="text-bg-secondary-dark dark:text-gray-600 mb-2" />
                                                <span className="text-sm text-text-secondary dark:text-text-secondary-dark">Click to upload or drag and drop</span>
                                                <span className="text-xs text-gray-500 dark:text-gray-500 mt-1">JPG, PNG, or PDF (Max 5MB)</span>
                                            </label>
                                        ) : (
                                            <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-bg-primary-light rounded-lg bg-gray-50 dark:bg-bg-primary-light">
                                                <div className="flex items-center gap-3">
                                                    {identificationDocument.type.startsWith('image/') && identificationDocumentPreview ? (
                                                        <img
                                                            src={identificationDocumentPreview}
                                                            alt="ID Preview"
                                                            className="w-12 h-12 object-cover rounded"
                                                        />
                                                    ) : (
                                                        <FileText size={24} className="text-primary dark:text-primary-dark" />
                                                    )}
                                                    <div>
                                                        <p className="text-sm font-medium text-text-primary dark:text-text-primary-dark">{identificationDocument.name}</p>
                                                        <p className="text-xs text-text-secondary dark:text-text-secondary-dark">
                                                            {(identificationDocument.size / 1024 / 1024).toFixed(2)} MB
                                                        </p>
                                                    </div>
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={removeIdentificationDocument}
                                                    className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors"
                                                >
                                                    <X size={20} className="text-gray-500 dark:text-bg-secondary-dark" />
                                                </button>
                                            </div>
                                        )}
                                    </div>

                                    {uploadProgress > 0 && uploadProgress < 100 && (
                                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                                            <div
                                                className="bg-primary dark:bg-primary-dark h-2.5 rounded-full transition-all duration-300"
                                                style={{ width: `${uploadProgress}%` }}
                                            ></div>
                                        </div>
                                    )}

                                    <div className="flex items-start gap-2 p-3 bg-blue-50 dark:bg-bg-primary-light rounded-lg">
                                        <AlertCircle size={20} className="text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                                        <p className="text-xs text-blue-700 dark:text-blue-300">
                                            Your ID will be securely stored and verified. We use this to prevent fraud and ensure platform safety.
                                            {userType === 'seller' && ' Sellers require ID verification to list items.'}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Stripe Card Section for Bidders */}
                            {userType === 'bidder' && <CardSection />}

                            <div>
                                <label className='flex items-center gap-2'>
                                    <input
                                        type="checkbox"
                                        {...register('termsConditions', { required: 'Accepting terms of use is required for registration.' })}
                                        className="accent-primary dark:accent-primary-dark"
                                    />
                                    <p className="text-sm text-text-secondary dark:text-text-secondary-dark">
                                        By registering, I agree to {otherData?.brandName}'s <Link className='text-blue-600 dark:text-blue-400 underline' to='/terms-of-use'>Terms of Use</Link>.
                                        My information will be used as described in the <Link to='/privacy-policy' className='text-blue-600 dark:text-blue-400 underline'>Privacy Policy</Link>.
                                    </p>
                                </label>
                                {errors.termsConditions && (
                                    <p className="text-red-500 text-sm mt-1">{errors.termsConditions.message}</p>
                                )}
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isLoading || (userType === 'bidder' && !stripe)}
                                className="w-full bg-bg-primary dark:bg-bg-secondary text-text-primary-dark dark:text-text-primary hover:opacity-90 py-3 px-4 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-6"
                            >
                                {isLoading ? 'Creating account...' : 'Create Account'}
                            </button>
                        </form>
                    )}

                    {/* Already have account */}
                    <div className="text-center mt-6">
                        <p className="text-text-secondary dark:text-text-secondary-dark text-sm">
                            Already have an account?{' '}
                            <Link to="/login" className="text-text-primary dark:text-text-primary-dark font-semibold underline hover:text-opacity-80">
                                Sign in
                            </Link>
                        </p>
                    </div>
                </div>

                <div className="bg-bg-secondary dark:bg-bg-primary px-4 pb-4 text-center">
                    <p className="text-xs text-text-secondary dark:text-text-secondary-dark">
                        © {new Date().getFullYear()} {otherData?.brandName}. All rights reserved.
                    </p>
                </div>
            </div>
        </div>
    );
};

// Wrap the main component with Stripe Elements provider
const RegisterWithStripe = () => (
    <Elements stripe={stripePromise}>
        <Register />
    </Elements>
);

export default RegisterWithStripe;