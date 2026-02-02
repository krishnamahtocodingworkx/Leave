"use client";
import { userServices } from '@/services/user.service';
import React, { useEffect, useState } from 'react'
import SelectField from '../common/dropdown/FormikSelect';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CustomModal from '../modals';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import Input from '../input';
import { SUCCESS_TOAST } from '@/utils/toasts';

/* eslint-disable */
const Address = () => {
    const { ownLocation } = useSelector((state: RootState) => state.auth);
    const { display_name, address, lat, lon } = ownLocation!;
    const { state, state_district, city, country } = address;
    const [addressOptions, setAddressOptions] = useState<any[]>([]);
    const [selectedAddress, setSelectedAddress] = useState<string>("");
    const [modal, setModal] = useState<boolean>(false);
    const saveAddressHandler = () => {
        userServices.addAddress({ label: "Office", address: display_name || "", lat: Number(lat) || 0, lng: Number(lon) || 0 })
            .then((res) => {
                console.log("address saved:", res);
                SUCCESS_TOAST(res.message);
                setModal(false);
            })
            .catch((err) => {
                console.log("error in saving address:", err);
            })
    }
    useEffect(() => {
        userServices.getAllAddress().then((res) => {
            console.log("all address:", res);
            setAddressOptions(() => {
                if (!res.data || !Array.isArray(res.data)) return [];
                return res.data.map((addr) => ({
                    label: `${addr.label} (${addr.address.substring(0, 40)}...)`,
                    value: addr.address,
                }));
            })
        }).catch((err) => {
            console.log("error in fetching all address:", err);
        });
    }, []);
    return (
        <section>
            <div>
                <SelectField
                    name="address"
                    label="Select Pickup Address"
                    value={selectedAddress}
                    options={addressOptions}
                    onChange={(value) => {
                        setSelectedAddress(value as string);
                    }}
                />
            </div>

            <Button onClick={() => setModal(true)} variant="contained" sx={{ borderRadius: 3, width: 1, mt: 3, paddingY: 1.5 }}>
                Add New Address
                <AddIcon sx={{ ml: 1 }} />
            </Button>
            <CustomModal
                open={modal}
                title="Add New Address"
                setOpen={setModal}
                onSubmit={saveAddressHandler}
                submitButtonText="Save Address"
                size='large'
            >
                <div className="flex flex-col gap-4">

                    {/* Full Address */}
                    <div className="rounded-lg bg-gray-100 p-3 text-sm">
                        <p className="font-medium text-gray-700">Detected Address</p>
                        <p className="text-gray-600 mt-1">{display_name}</p>
                    </div>

                    {/* Address Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                            label="State"
                            name="state"
                            value={state || ""}
                            disabled
                        />

                        <Input
                            label="District"
                            name="state_district"
                            value={state_district || ""}
                            disabled
                        />

                        <Input
                            label="City"
                            name="city"
                            value={city || ""}
                            disabled
                        />

                        <Input
                            label="Country"
                            name="country"
                            value={country || ""}
                            disabled
                        />
                    </div>

                    {/* Coordinates */}
                    <div className="grid grid-cols-2 gap-4">
                        <Input
                            label="Latitude"
                            name="lat"
                            value={lat || ""}
                            disabled
                        />

                        <Input
                            label="Longitude"
                            name="lon"
                            value={lon || ""}
                            disabled
                        />
                    </div>
                </div>
            </CustomModal>
        </section>
    )
}

export default Address