import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

interface StreamingMessageProps {
    message: string;
    delay?: number;
}

const StreamingMessage = ({ message = 'No message', delay = 10 }: StreamingMessageProps) => {
    const [displayedMessage, setDisplayedMessage] = useState('');
    const [isStreamingDone, setIsStreamingDone] = useState(false);

    useEffect(() => {
        if (!message) return;

        setDisplayedMessage('');
        setIsStreamingDone(false);

        let index = 0;
        const interval = setInterval(() => {
            setDisplayedMessage(prev => prev + message.charAt(index));
            index++;

            if (index >= message.length) {
                clearInterval(interval);
                setTimeout(() => setIsStreamingDone(true), 50);
            }
        }, delay);

        return () => clearInterval(interval);
    }, [message, delay]);

    return (
        <div className="text-left">
            {isStreamingDone ? (
                <ReactMarkdown>{message}</ReactMarkdown>
            ) : (
                <pre className="whitespace-pre-wrap font-sans">
                    {displayedMessage}
                </pre>
            )}
        </div>
    );
};

export default StreamingMessage;