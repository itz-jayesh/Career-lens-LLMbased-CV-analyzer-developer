import { CLOUDINARY_CLOUD_NAME, CLOUDINARY_UPLOAD_PRESET } from "../../../../../constants/Constants";
import { useResume_Template_2 } from "./UI_Template_2_Stage_Component";
import imageCompression from 'browser-image-compression';
import { useState, type ChangeEvent } from "react";
import { FaTrash } from "react-icons/fa";
import { toast } from "sonner";


export default function Stage_6_Template_2_Upload_Photo() {
    const { resumeData, setResumeData, setStage } = useResume_Template_2();

    const [photo, setPhoto] = useState<null | File>(null);
    const [photoPreview, setPhotoPreview] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handlePhotoSelect = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];
        if (!file) return;

        if (file.size > 1024 * 1024) {
            toast.error("Image size must be less than 1MB");
            return;
        }
        const options = {
            maxSizeMB: 0.1,
            maxWidthOrHeight: 1024,
            useWebWorker: true,
            initialQuality: 0.8
        };
        try {
            const compressedFile = await imageCompression(file, options);
            setPhoto(compressedFile);
            setPhotoPreview(URL.createObjectURL(file));
        } catch (err) {
            toast.error("Error while compressing image. Please use image with small size");
        }
    };

    const handleRemovePhoto = () => {
        setPhoto(null);
        setPhotoPreview(null);
        toast.info("Photo removed");
        setResumeData({
            ...resumeData,
            personalDetails: { ...resumeData.personalDetails, imageUrl: "" },
        });
    };

    const uploadToCloudinary = async () => {
        if (!photo) {
            toast.error("Please select a photo first");
            return;
        }

        try {
            setLoading(true);
            const data = new FormData();
            data.append("file", photo);
            data.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
            data.append("cloud_name", CLOUDINARY_CLOUD_NAME);

            const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/auto/upload`, { method: "POST", body: data });

            const uploaded = await res.json();

            if (uploaded.secure_url) {
                setResumeData((prev) => ({
                    ...prev, personalDetails: { ...resumeData.personalDetails, imageUrl: uploaded.secure_url }
                }));
                toast.success("Photo uploaded successfully!");
            }

        } catch (err) {
            toast.error("Upload failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mt-5 md:p-6 rounded-xl text-white">
            <p className="font-semibold text-2xl text-teal-400 mb-6">
                6. Upload Your Photo
            </p>

            {/* Upload UI */}
            <label className="cursor-pointer flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-teal-500/40 rounded-xl hover:border-teal-400 transition-all bg-[#141618]">
                <p className="text-teal-300 font-medium text-lg">
                    Click to Upload Photo
                </p>
                <p className="text-sm text-gray-400">PNG, JPG, JPEG</p>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoSelect}
                    className="hidden"
                />
            </label>

            <div className="relative w-full mt-4 flex justify-center items-center">
                {
                    photoPreview || resumeData.personalDetails.imageUrl ?
                        <img
                            src={photoPreview || resumeData.personalDetails.imageUrl ? photoPreview || resumeData.personalDetails.imageUrl : "/resume.png"}
                            alt="Uploaded"
                            className="w-80 h-56 object-cover rounded-xl shadow-md border border-teal-500/30"
                        /> : null
                }

                {photoPreview || resumeData.personalDetails.imageUrl ? (
                    <button onClick={handleRemovePhoto} className="absolute -top-3 -right-3 bg-red-600 p-2 rounded-full text-white hover:bg-red-700 shadow-md">
                        <FaTrash size={14} />
                    </button>
                ) : null}
            </div>

            {/* Upload Image Button */}
            <button onClick={uploadToCloudinary}
                className="mt-6 w-full bg-teal-600 hover:bg-teal-500 transition-all py-3 rounded-lg font-semibold text-white shadow-lg"
                disabled={loading}>
                {loading ? "Uploading..." : "Upload Image"}
            </button>

            <div className="flex justify-between mt-6">
                <div className="flex gap-1 md:gap-3">
                    <button onClick={() => setStage(5)}
                        className="bg-linear-to-r from-blue-600 to-teal-500 text-white px-6 py-2 rounded-lg font-medium shadow-md hover:shadow-blue-500/40 hover:scale-105 transition-all">
                        Back
                    </button>
                </div>
            </div>
        </div>
    );
}