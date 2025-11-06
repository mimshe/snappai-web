import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const TypewriterEffect = ({ sentences, typingSpeed = 100, deletingSpeed = 50, pauseTime = 2000 }) => {
  const navigate = useNavigate();
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) {
      const pauseTimer = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, pauseTime);
      return () => clearTimeout(pauseTimer);
    }

    const currentSentence = sentences[currentSentenceIndex];
    if (!currentSentence) return;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        // Typing
        if (currentText.length < currentSentence.length) {
          setCurrentText(currentSentence.substring(0, currentText.length + 1));
        } else {
          // Finished typing, pause then start deleting
          setIsPaused(true);
        }
      } else {
        // Deleting
        if (currentText.length > 0) {
          setCurrentText(currentText.substring(0, currentText.length - 1));
        } else {
          // Finished deleting, move to next sentence
          setIsDeleting(false);
          setCurrentSentenceIndex((prev) => (prev + 1) % sentences.length);
        }
      }
    }, isDeleting ? deletingSpeed : typingSpeed);

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, isPaused, currentSentenceIndex, sentences, typingSpeed, deletingSpeed, pauseTime]);

  return (
    <div className="flex justify-center">
      <div
        onClick={() => navigate('/chat/new')}
        className="px-4 py-3 border border-gray-300 rounded-lg bg-white h-[48px] flex items-center justify-center cursor-pointer hover:border-primary transition-colors w-[500px]"
      >
        <p className="text-base text-gray-700 text-center">
          {currentText ? (
            <>
              {currentText}
              <span className="animate-pulse text-primary mr-1">|</span>
            </>
          ) : (
            <span className="text-gray-400">مثال: یه جوجه کباب از چلوپز برای شرکت بفرست</span>
          )}
        </p>
      </div>
    </div>
  );
};

export default TypewriterEffect;

