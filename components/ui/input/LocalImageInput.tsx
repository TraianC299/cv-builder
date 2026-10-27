import React, { useEffect, useRef } from "react";

const LocalImageInput = ({
    children,
    setImageUrl,
    resize, // kept for same props; not used here
}: {
    imageUrl: string;
    setImageUrl: Function;
    children: React.ReactNode;
    resize?: number;
}) => {
    const hiddenFileInput = useRef<HTMLInputElement>(null);
    const lastObjectUrlRef = useRef<string | null>(null);

    const handleClick = () => {
        hiddenFileInput.current?.click();
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Revoke previous URL to avoid memory leaks
        if (lastObjectUrlRef.current) {
            URL.revokeObjectURL(lastObjectUrlRef.current);
            lastObjectUrlRef.current = null;
        }

        const objectUrl = URL.createObjectURL(file);
        lastObjectUrlRef.current = objectUrl;

        setImageUrl(objectUrl);
    };

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (lastObjectUrlRef.current) {
                URL.revokeObjectURL(lastObjectUrlRef.current);
            }
        };
    }, []);

    return (
        <>
            <div className="w-full" onClick={handleClick}>
                {children}
            </div>

            <input
                type="file"
                accept="image/*"
                ref={hiddenFileInput}
                onChange={handleChange}
                className="hidden"
            />
        </>
    );
};

export default LocalImageInput;
