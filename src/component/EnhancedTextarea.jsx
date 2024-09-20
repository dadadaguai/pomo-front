import React, { useState } from 'react';
import { Textarea } from "@/components/ui/textarea";

const EnhancedTextarea = ({ maxLength = 100, ...props }) => {
    const [charCount, setCharCount] = useState(0);

    const handleChange = (e) => {
        const inputText = e.target.value;
        setCharCount(inputText.length);
        if (props.onChange) {
            props.onChange(e);
        }
    };

    return (
        <div className="relative">
            <Textarea
                {...props}
                onChange={handleChange}
                maxLength={maxLength}
            />
            <div className="absolute bottom-2 right-2 text-sm text-gray-500">
                {charCount}/{maxLength}
            </div>
        </div>
    );
};

export default EnhancedTextarea;