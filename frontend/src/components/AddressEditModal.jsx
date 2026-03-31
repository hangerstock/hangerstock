// components/AddressEditModal.jsx
import { useState, useEffect } from "react";
import { X, Save, Loader, MapPin } from "lucide-react";
import axiosInstance from "../utils/axiosInstance";
import toast from "react-hot-toast";
import useCountryStates from "../hooks/useCountryStates";

const AddressEditModal = ({ isOpen, onClose, currentAddress, onAddressUpdate }) => {
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [addressData, setAddressData] = useState({
        street: "",
        city: "",
        state: "",
        postCode: "",
        country: "",
        countryCode: "",
        countryName: ""
    });

    const { useCountries, useStatesByCountry } = useCountryStates();
    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedCountryCode, setSelectedCountryCode] = useState('');

    // Fetch countries on mount
    useEffect(() => {
        const fetchCountries = async () => {
            const countriesList = await useCountries();
            setCountries(countriesList);
        };
        fetchCountries();
    }, []);

    // Initialize form when modal opens or currentAddress changes
    useEffect(() => {
        if (isOpen && currentAddress) {

            // Handle different address structures
            const address = currentAddress.address || currentAddress;

            // Get the country code - try different possible field names
            let countryCode = address.countryCode || address.country_code || "";

            // If no country code found, try to find it from the country name
            if (!countryCode && address.country) {
                const matchedCountry = countries.find(c =>
                    c.name.toLowerCase() === address.country.toLowerCase() ||
                    c.code.toLowerCase() === address.country.toLowerCase()
                );
                if (matchedCountry) {
                    countryCode = matchedCountry.code;
                }
            }

            setAddressData({
                street: address.street || address.street1 || "",
                city: address.city || "",
                state: address.state || "",
                postCode: address.postCode || address.zip || address.postalCode || "",
                country: address.country || "",
                countryCode: countryCode,
                countryName: address.countryName || address.country || ""
            });

            // Set selected country code for dropdown
            setSelectedCountryCode(countryCode);

            // Load states for the selected country if we have a country code
            if (countryCode) {
                loadStatesForCountry(countryCode);
            }
        }
    }, [isOpen, currentAddress, countries]); // Add countries to dependencies

    // Load states based on country code
    const loadStatesForCountry = async (countryCode) => {
        if (countryCode) {
            try {
                const statesList = await useStatesByCountry(countryCode);
                setStates(statesList);
            } catch (error) {
                console.error('Error fetching states:', error);
                setStates([]);
            }
        } else {
            setStates([]);
        }
    };

    // Handle country selection
    const handleCountryChange = async (countryCode) => {
        setSelectedCountryCode(countryCode);

        // Find the selected country object
        const selectedCountryObj = countries.find(c => c.code === countryCode);

        if (selectedCountryObj) {
            setAddressData(prev => ({
                ...prev,
                country: selectedCountryObj.name,
                countryCode: countryCode,
                countryName: selectedCountryObj.name,
                state: "" // Reset state when country changes
            }));
        }

        // Load states for the selected country
        await loadStatesForCountry(countryCode);
    };

    // Handle input changes
    const handleInputChange = (field, value) => {
        setAddressData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    // Handle save address
    const handleSave = async () => {
        try {
            setSaving(true);

            const formData = new FormData();
            formData.append('street', addressData.street || '');
            formData.append('city', addressData.city || '');
            formData.append('state', addressData.state || '');
            formData.append('postCode', addressData.postCode || '');
            formData.append('country', addressData.country || '');
            formData.append('countryCode', addressData.countryCode || '');
            formData.append('countryName', addressData.countryName || '');

            const { data } = await axiosInstance.put('/api/v1/users/profile', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (data.success) {
                toast.success('Address updated successfully');
                // Pass the updated address back to the parent component
                onAddressUpdate(data.data.user.address);
                onClose();
            } else {
                toast.error('Failed to update address');
            }
        } catch (error) {
            console.error('Address update error:', error);
            toast.error(error.response?.data?.message || 'Failed to update address');
        } finally {
            setSaving(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1000] p-4">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-lg max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-full bg-blue-100">
                                <MapPin className="h-6 w-6 text-blue-600" />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">
                                    Edit Shipping Address
                                </h3>
                                <p className="text-sm text-gray-600">
                                    Update your shipping address for this order
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <X size={20} className="text-gray-500" />
                        </button>
                    </div>

                    {/* Address Form */}
                    <div className="space-y-4">
                        {/* Country */}
                        <div className="space-y-1">
                            <label className="block text-sm font-medium text-gray-700">
                                Country <span className="text-red-500">*</span>
                            </label>
                            <select
                                value={selectedCountryCode}
                                onChange={(e) => handleCountryChange(e.target.value)}
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="">Select country</option>
                                {countries.map(country => (
                                    <option key={country.code} value={country.code}>
                                        {country.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Street Address */}
                        <div className="space-y-1">
                            <label className="block text-sm font-medium text-gray-700">
                                Street Address <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={addressData.street}
                                onChange={(e) => handleInputChange('street', e.target.value)}
                                placeholder="Street address or P.O. Box"
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>

                        {/* City */}
                        <div className="space-y-1">
                            <label className="block text-sm font-medium text-gray-700">
                                City <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={addressData.city}
                                onChange={(e) => handleInputChange('city', e.target.value)}
                                placeholder="City"
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>

                        {/* State/Province */}
                        <div className="space-y-1">
                            <label className="block text-sm font-medium text-gray-700">
                                State/Province <span className="text-red-500">*</span>
                            </label>
                            {states.length > 0 ? (
                                <select
                                    value={addressData.state}
                                    onChange={(e) => handleInputChange('state', e.target.value)}
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    <option value="">Select state</option>
                                    {states.map(state => (
                                        <option key={state.id || state.code} value={state.name}>
                                            {state.name}
                                        </option>
                                    ))}
                                </select>
                            ) : (
                                <input
                                    type="text"
                                    value={addressData.state}
                                    onChange={(e) => handleInputChange('state', e.target.value)}
                                    placeholder="State/Province"
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            )}
                        </div>

                        {/* Postal Code */}
                        <div className="space-y-1">
                            <label className="block text-sm font-medium text-gray-700">
                                Postal Code <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={addressData.postCode}
                                onChange={(e) => handleInputChange('postCode', e.target.value)}
                                placeholder="Postal/ZIP code"
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                    </div>

                    {/* Info Note */}
                    <div className="mt-6 p-3 bg-blue-50 rounded-lg">
                        <p className="text-xs text-blue-800 flex items-start gap-2">
                            <span className="text-blue-600">ℹ️</span>
                            <span>
                                Shipping rates will be calculated based on this address.
                            </span>
                        </p>
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-3 mt-6">
                        <button
                            onClick={onClose}
                            disabled={saving}
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
                        >
                            <X size={18} />
                            Cancel
                        </button>

                        <button
                            onClick={handleSave}
                            disabled={saving}
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                        >
                            {saving ? (
                                <>
                                    <Loader size={18} className="animate-spin" />
                                    Saving...
                                </>
                            ) : (
                                <>
                                    <Save size={18} />
                                    Save Address
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddressEditModal;