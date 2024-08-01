import React, { useRef, useEffect, useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { GrEdit } from "react-icons/gr";

    
const SliderLine = () => {
        
        const userName = localStorage.getItem('user') || 'User';
        const startTime = [0,0.7,2,4.3];
        const endTime = [0.3,1.5,4.1,5.6];
        let currentref = null;

        const videoRef = useRef(null);
        const buttonRefs = useRef([]);
        const listRefs = [useRef(null),useRef(null),useRef(null),useRef(null)]

        useEffect(() => {
            let currentIndex = 0;
            
            const playVideoAndClickButton = (buttonRef) => {
                if (buttonRef) {
                    buttonRef.click();
                    
                    if (currentref) {
                        currentref.current.style.display = 'none';
                    }
                    if (listRefs[currentIndex]) {
                        listRefs[currentIndex].current.style.display = 'block';
                        currentref = listRefs[currentIndex];
                    }
                    else {
                        currentref = null; 
                    }

                    if ( videoRef.current) {
                        videoRef.current.currentTime = startTime[currentIndex];
                        videoRef.current.play();
    
                        const handleTimeUpdate = () => {
                            if (videoRef.current  && videoRef.current.currentTime >= endTime[currentIndex]) {
                                videoRef.current.pause();
                                videoRef.current.removeEventListener('timeupdate', handleTimeUpdate);
    
                                setTimeout(() => {
                                    currentIndex = (currentIndex + 1) % buttonRefs.current.length;
                                    playVideoAndClickButton(buttonRefs.current[currentIndex]);
                                },1000);
                                
                            }
                        };
    
                        videoRef.current.addEventListener('timeupdate', handleTimeUpdate);
                    }
                }
            };
            setTimeout(() => {playVideoAndClickButton(buttonRefs.current[currentIndex])},1000);;
    
        }, []);

        const handleClick = (index) => {
            buttonRefs.current.forEach(btn => btn.classList.remove('active'));
            const button = buttonRefs.current[index];
            button.classList.add('active');
        };

      return (
        <section>
            <div className='Yq3CJKRaogbgzFJ2SQ5k complexity-slider-section_anchor__jKCIp'></div>
                  <div className='.md-mbe-192 YttEe7kIjjIAtcbhghld'>
                      <div>
                            <div>
                                      <div className='complexity-slider-section_heading__uyEMw .mbe-96'>
                                            <p className="text-gray-900 font-bold whitespace-nowrap mt-4">
                                                  Hello {userName ? userName.charAt(0).toUpperCase() + userName.slice(1) : ''}, I encourage you to explore and make the most of these features.
                                            </p>
                                      </div>
                                      <div className='complexity-slider-section_sliderContainer__1tcNS'> 
                                            <div className='complexity-slider-section_contentContainer__UmVOo'>
                                                <div className='complexity-slider-section_videoContainer__N9I16'>
                                                         <video muted={true} playsInline=""  ref={videoRef} style={{ width: '900px', height: '550px' }} >
                                                            <source src="/video.mp4" type="video/mp4"/>
                                                         </video>
                                                </div>
                                                
                                                <div className='slider-container_sliderContainer__hWJsY'>
                                                        <div className="slider-container_progressContainer__wyehy" style={{ cursor: 'grab' }}>
                                                            <div className='slider-container_progressBackground__0LFLM'></div>
                                                            {[0, 33, 67, 100].map((progress, index) => (
                                                                <div className='thumb-indicator_indicator__5m4t2' key={index} style={{ '--progress': `${progress}%` }}>
                                                                    <div className="hQ3H3WWEM21uH24mIwLo CaUxCPjwRuilNC8cXpGi s2khY13sOng4NT7jKQtM thumb-indicator_button__dlbd5" style={{ borderRadius: "50%" }}>
                                                                        <button
                                                                            ref={el => buttonRefs.current[index] = el}
                                                                            data-size="24"
                                                                            className="iCUK0p2nk8mU4Y3jwtF4 s2khY13sOng4NT7jKQtM"
                                                                            style={{ borderRadius: "50%" }}
                                                                            type="button"
                                                                            onClick={() => handleClick(index)}
                                                                        >
                                                                            {index + 1}
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                              ))}
                                                        </div>
                                                </div>
                                                <div className='complexity-slider-section_list__3VemC'>
                                                     <div ref={listRefs[0]} style={{ display: 'none' }}>
                                                        <ol className='item-list_itemList__N1U2E'>
                                                            <li className>
                                                                <div className='item-list_icon__k_knD'>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16" width="20" height="20" color="var(--display-onlight-tertiary)">
                                                                        <path fillRule="evenodd" d="M8 1.25a.75.75 0 0 1 .75.75v5.25H14a.75.75 0 0 1 0 1.5H8.75V14a.75.75 0 1 1-1.5 0V8.75H2a.75.75 0 0 1 0-1.5h5.25V2A.75.75 0 0 1 8 1.25z" clipRule="evenodd"></path>
                                                                    </svg>
                                                                </div>
                                                                <div tabIndex = "0" className='uGvvFoPursl0yybhMOGs' aria-labelledby=":rea:">
                                                                    <div className='item-list_item___mihR'>
                                                                        <p className="Z2j5FoeQ_umI7vX0SmxF EkQLWhUQXERswBk6sxIb ghjFWYpaMMS6gFyyKavs">Add a task</p>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                            <li className>
                                                                <div className='item-list_icon__k_knD'>
                                                                <svg fill="none" height="20" viewBox="0 0 16 17" width="20" xmlns="http://www.w3.org/2000/svg" color="var(--display-onlight-tertiary)"><g fill="currentColor">
                                                                    <path clipRule="evenodd" d="M4 5.501a.75.75 0 0 1 .75-.75h6.5a.75.75 0 0 1 0 1.5h-6.5a.75.75 0 0 1-.75-.75z" fillRule="evenodd"></path><path d="M12 10.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0z"></path><path clipRule="evenodd" d="M4.036 2.753c-.29.005-.458.025-.567.049a.836.836 0 0 0-.239.09.808.808 0 0 0-.34.34.846.846 0 0 0-.095.267 3.85 3.85 0 0 0-.045.7l.001 7.766c.006.29.026.458.05.567.02.095.046.158.09.239.079.148.19.26.34.34a.85.85 0 0 0 .266.095c.132.026.338.045.7.045h7.605c.362 0 .568-.02.7-.045a.85.85 0 0 0 .267-.095.808.808 0 0 0 .34-.34.844.844 0 0 0 .096-.268c.025-.131.045-.337.045-.7V4.2c0-.362-.02-.568-.045-.7a.844.844 0 0 0-.096-.267.808.808 0 0 0-.34-.34.847.847 0 0 0-.267-.096 3.851 3.851 0 0 0-.7-.045zm-.007-1.5 7.773-.002c.825 0 1.242.087 1.675.318.41.22.736.545.955.956.231.432.318.849.318 1.674v7.605c0 .824-.086 1.241-.318 1.674-.22.41-.546.736-.956.956-.432.23-.849.317-1.674.317H4.197c-.825 0-1.241-.086-1.674-.317a2.307 2.307 0 0 1-.956-.956c-.212-.396-.303-.78-.316-1.493v-.013L1.25 4.199c0-.825.086-1.242.317-1.674.22-.41.546-.737.956-.956.396-.212.78-.304 1.493-.316z" fillRule="evenodd"></path></g>
                                                                </svg>
                                                                </div>
                                                                <div tabIndex = "0" className='uGvvFoPursl0yybhMOGs' aria-labelledby=":reb:">
                                                                    <div className='item-list_item___mihR'>
                                                                        <p className="Z2j5FoeQ_umI7vX0SmxF EkQLWhUQXERswBk6sxIb ghjFWYpaMMS6gFyyKavs">Give it a due date</p>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                        </ol>
                                                    </div>
                                                    <div ref={listRefs[1]} style={{ display: 'none' }}>
                                                        <ol className='item-list_itemList__N1U2E'>
                                                            <li className>
                                                                <div className='item-list_icon__k_knD'>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16" width="20" height="20" color="var(--display-onlight-tertiary)">
                                                                        <path fillRule="evenodd" d="M8 1.25a.75.75 0 0 1 .75.75v5.25H14a.75.75 0 0 1 0 1.5H8.75V14a.75.75 0 1 1-1.5 0V8.75H2a.75.75 0 0 1 0-1.5h5.25V2A.75.75 0 0 1 8 1.25z" clipRule="evenodd"></path>
                                                                    </svg>
                                                                </div>
                                                                <div tabIndex = "0" className='uGvvFoPursl0yybhMOGs' aria-labelledby=":rea:">
                                                                    <div className='item-list_item___mihR'>
                                                                        <p className="Z2j5FoeQ_umI7vX0SmxF EkQLWhUQXERswBk6sxIb ghjFWYpaMMS6gFyyKavs">Add a task</p>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                            <li className>
                                                                <div className='item-list_icon__k_knD'>
                                                                <svg fill="none" height="20" viewBox="0 0 16 17" width="20" xmlns="http://www.w3.org/2000/svg" color="var(--display-onlight-tertiary)"><g fill="currentColor">
                                                                    <path clipRule="evenodd" d="M4 5.501a.75.75 0 0 1 .75-.75h6.5a.75.75 0 0 1 0 1.5h-6.5a.75.75 0 0 1-.75-.75z" fillRule="evenodd"></path><path d="M12 10.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0z"></path><path clipRule="evenodd" d="M4.036 2.753c-.29.005-.458.025-.567.049a.836.836 0 0 0-.239.09.808.808 0 0 0-.34.34.846.846 0 0 0-.095.267 3.85 3.85 0 0 0-.045.7l.001 7.766c.006.29.026.458.05.567.02.095.046.158.09.239.079.148.19.26.34.34a.85.85 0 0 0 .266.095c.132.026.338.045.7.045h7.605c.362 0 .568-.02.7-.045a.85.85 0 0 0 .267-.095.808.808 0 0 0 .34-.34.844.844 0 0 0 .096-.268c.025-.131.045-.337.045-.7V4.2c0-.362-.02-.568-.045-.7a.844.844 0 0 0-.096-.267.808.808 0 0 0-.34-.34.847.847 0 0 0-.267-.096 3.851 3.851 0 0 0-.7-.045zm-.007-1.5 7.773-.002c.825 0 1.242.087 1.675.318.41.22.736.545.955.956.231.432.318.849.318 1.674v7.605c0 .824-.086 1.241-.318 1.674-.22.41-.546.736-.956.956-.432.23-.849.317-1.674.317H4.197c-.825 0-1.241-.086-1.674-.317a2.307 2.307 0 0 1-.956-.956c-.212-.396-.303-.78-.316-1.493v-.013L1.25 4.199c0-.825.086-1.242.317-1.674.22-.41.546-.737.956-.956.396-.212.78-.304 1.493-.316z" fillRule="evenodd"></path></g>
                                                                </svg>
                                                                </div>
                                                                <div tabIndex = "0" className='uGvvFoPursl0yybhMOGs' aria-labelledby=":reb:">
                                                                    <div className='item-list_item___mihR'>
                                                                        <p className="Z2j5FoeQ_umI7vX0SmxF EkQLWhUQXERswBk6sxIb ghjFWYpaMMS6gFyyKavs">Give it a due date</p>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                            <li className>
                                                                <div className='item-list_icon__k_knD'>
                                                                    <svg viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" width="20" height="20" color="var(--display-onlight-tertiary)"><path fillRule="evenodd" clipRule="evenodd" d="M3.25 3.54v4.94a8.1 8.1 0 0 1 5.03.32 6.6 6.6 0 0 0 4.47.16V4.02a8.1 8.1 0 0 1-5.03-.32 6.6 6.6 0 0 0-4.47-.16Zm0 6.5a6.6 6.6 0 0 1 4.47.16 8.1 8.1 0 0 0 5.57.16l.45-.15c.3-.1.51-.39.51-.71V3a.75.75 0 0 0-.99-.71l-.44.15a6.6 6.6 0 0 1-4.54-.14 8.1 8.1 0 0 0-5.57-.16l-.45.15c-.3.1-.51.39-.51.71v10.5a.75.75 0 0 0 1.5 0v-3.46Z"></path></svg>
                                                                </div>
                                                                <div tabIndex = "0" className='uGvvFoPursl0yybhMOGs' aria-labelledby=":rea:">
                                                                    <div className='item-list_item___mihR'>
                                                                        <p className="Z2j5FoeQ_umI7vX0SmxF EkQLWhUQXERswBk6sxIb ghjFWYpaMMS6gFyyKavs">Give tasks a priority level</p>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                        </ol>
                                                    </div>
                                                    <div ref={listRefs[2]} style={{ display: 'none' }}>
                                                        <ol className='item-list_itemList__N1U2E'>
                                                            <li className>
                                                                <div className='item-list_icon__k_knD'>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16" width="20" height="20" color="var(--display-onlight-tertiary)">
                                                                        <path fillRule="evenodd" d="M8 1.25a.75.75 0 0 1 .75.75v5.25H14a.75.75 0 0 1 0 1.5H8.75V14a.75.75 0 1 1-1.5 0V8.75H2a.75.75 0 0 1 0-1.5h5.25V2A.75.75 0 0 1 8 1.25z" clipRule="evenodd"></path>
                                                                    </svg>
                                                                </div>
                                                                <div tabIndex = "0" className='uGvvFoPursl0yybhMOGs' aria-labelledby=":rea:">
                                                                    <div className='item-list_item___mihR'>
                                                                        <p className="Z2j5FoeQ_umI7vX0SmxF EkQLWhUQXERswBk6sxIb ghjFWYpaMMS6gFyyKavs">Add a task</p>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                            <li className>
                                                                <div className='item-list_icon__k_knD'>
                                                                <svg fill="none" height="20" viewBox="0 0 16 17" width="20" xmlns="http://www.w3.org/2000/svg" color="var(--display-onlight-tertiary)"><g fill="currentColor">
                                                                    <path clipRule="evenodd" d="M4 5.501a.75.75 0 0 1 .75-.75h6.5a.75.75 0 0 1 0 1.5h-6.5a.75.75 0 0 1-.75-.75z" fillRule="evenodd"></path><path d="M12 10.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0z"></path><path clipRule="evenodd" d="M4.036 2.753c-.29.005-.458.025-.567.049a.836.836 0 0 0-.239.09.808.808 0 0 0-.34.34.846.846 0 0 0-.095.267 3.85 3.85 0 0 0-.045.7l.001 7.766c.006.29.026.458.05.567.02.095.046.158.09.239.079.148.19.26.34.34a.85.85 0 0 0 .266.095c.132.026.338.045.7.045h7.605c.362 0 .568-.02.7-.045a.85.85 0 0 0 .267-.095.808.808 0 0 0 .34-.34.844.844 0 0 0 .096-.268c.025-.131.045-.337.045-.7V4.2c0-.362-.02-.568-.045-.7a.844.844 0 0 0-.096-.267.808.808 0 0 0-.34-.34.847.847 0 0 0-.267-.096 3.851 3.851 0 0 0-.7-.045zm-.007-1.5 7.773-.002c.825 0 1.242.087 1.675.318.41.22.736.545.955.956.231.432.318.849.318 1.674v7.605c0 .824-.086 1.241-.318 1.674-.22.41-.546.736-.956.956-.432.23-.849.317-1.674.317H4.197c-.825 0-1.241-.086-1.674-.317a2.307 2.307 0 0 1-.956-.956c-.212-.396-.303-.78-.316-1.493v-.013L1.25 4.199c0-.825.086-1.242.317-1.674.22-.41.546-.737.956-.956.396-.212.78-.304 1.493-.316z" fillRule="evenodd"></path></g>
                                                                </svg>
                                                                </div>
                                                                <div tabIndex = "0" className='uGvvFoPursl0yybhMOGs' aria-labelledby=":reb:">
                                                                    <div className='item-list_item___mihR'>
                                                                        <p className="Z2j5FoeQ_umI7vX0SmxF EkQLWhUQXERswBk6sxIb ghjFWYpaMMS6gFyyKavs">Give it a due date</p>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                            <li className>
                                                                <div className='item-list_icon__k_knD'>
                                                                    <svg viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" width="20" height="20" color="var(--display-onlight-tertiary)"><path fillRule="evenodd" clipRule="evenodd" d="M3.25 3.54v4.94a8.1 8.1 0 0 1 5.03.32 6.6 6.6 0 0 0 4.47.16V4.02a8.1 8.1 0 0 1-5.03-.32 6.6 6.6 0 0 0-4.47-.16Zm0 6.5a6.6 6.6 0 0 1 4.47.16 8.1 8.1 0 0 0 5.57.16l.45-.15c.3-.1.51-.39.51-.71V3a.75.75 0 0 0-.99-.71l-.44.15a6.6 6.6 0 0 1-4.54-.14 8.1 8.1 0 0 0-5.57-.16l-.45.15c-.3.1-.51.39-.51.71v10.5a.75.75 0 0 0 1.5 0v-3.46Z"></path></svg>
                                                                </div>
                                                                <div tabIndex = "0" className='uGvvFoPursl0yybhMOGs' aria-labelledby=":rea:">
                                                                    <div className='item-list_item___mihR'>
                                                                        <p className="Z2j5FoeQ_umI7vX0SmxF EkQLWhUQXERswBk6sxIb ghjFWYpaMMS6gFyyKavs">Give tasks a priority level</p>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                            <li className>
                                                                <div className='item-list_icon__k_knD'>
                                                                    <svg viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" width="20" height="20" color="var(--display-onlight-tertiary)">
                                                                        <path d="M1 4.7c-.48-.69-.39-1.62.2-2.22l.65-.64c.6-.6 1.53-.69 2.23-.21l.26.18a.75.75 0 0 1-.84 1.24l-.27-.18a.25.25 0 0 0-.31.03l-.65.64a.25.25 0 0 0-.03.32l.18.26a.75.75 0 0 1-1.24.85L1 4.7Zm14 0c.48-.69.39-1.62-.2-2.22l-.65-.64c-.6-.6-1.53-.69-2.23-.21l-.26.18a.75.75 0 1 0 .84 1.24l.27-.18c.1-.07.23-.06.32.03l.64.64c.09.09.1.22.03.32l-.18.26a.75.75 0 0 0 1.24.85L15 4.7Z"></path><path fillRule="evenodd" clipRule="evenodd" d="M8 2.25a5.75 5.75 0 0 0-4.77 8.96l-1.26 1.26a.75.75 0 1 0 1.06 1.06l1.2-1.2a5.73 5.73 0 0 0 7.55 0l1.19 1.2a.75.75 0 1 0 1.06-1.06l-1.26-1.26A5.75 5.75 0 0 0 8 2.25Zm0 1.5a4.25 4.25 0 1 0 0 8.5 4.25 4.25 0 0 0 0-8.5Z"></path><path d="M8.5 6A.75.75 0 0 0 7 6v2.5c0 .42.34.75.75.75H9.5a.75.75 0 1 0 0-1.5h-1V6Z"></path>
                                                                    </svg>
                                                                </div>
                                                                <div tabIndex = "0" className='uGvvFoPursl0yybhMOGs' aria-labelledby=":rea:">
                                                                    <div className='item-list_item___mihR'>
                                                                        <p className="Z2j5FoeQ_umI7vX0SmxF EkQLWhUQXERswBk6sxIb ghjFWYpaMMS6gFyyKavs">Schedule a reminder </p>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                            <li className>
                                                                <div className='item-list_icon__k_knD'>
                                                                    <svg viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" width="20" height="20" color="var(--display-onlight-tertiary)">
                                                                        <GrEdit />  
                                                                    </svg>
                                                                </div>
                                                                <div tabIndex = "0" className='uGvvFoPursl0yybhMOGs' aria-labelledby=":rea:">
                                                                    <div className='item-list_item___mihR'>
                                                                        <p className="Z2j5FoeQ_umI7vX0SmxF EkQLWhUQXERswBk6sxIb ghjFWYpaMMS6gFyyKavs">Modify the tasks</p>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                        </ol>
                                                    </div>
                                                    <div ref={listRefs[3]} style={{ display: 'none' }}>
                                                        <ol className='item-list_itemList__N1U2E'>
                                                            <li className>
                                                                <div className='item-list_icon__k_knD'>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16" width="20" height="20" color="var(--display-onlight-tertiary)">
                                                                        <path fillRule="evenodd" d="M8 1.25a.75.75 0 0 1 .75.75v5.25H14a.75.75 0 0 1 0 1.5H8.75V14a.75.75 0 1 1-1.5 0V8.75H2a.75.75 0 0 1 0-1.5h5.25V2A.75.75 0 0 1 8 1.25z" clipRule="evenodd"></path>
                                                                    </svg>
                                                                </div>
                                                                <div tabIndex = "0" className='uGvvFoPursl0yybhMOGs' aria-labelledby=":rea:">
                                                                    <div className='item-list_item___mihR'>
                                                                        <p className="Z2j5FoeQ_umI7vX0SmxF EkQLWhUQXERswBk6sxIb ghjFWYpaMMS6gFyyKavs">Add a task</p>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                            <li className>
                                                                <div className='item-list_icon__k_knD'>
                                                                    <svg viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" width="20" height="20" color="var(--display-onlight-tertiary)"><path fillRule="evenodd" clipRule="evenodd" d="M3.25 3.54v4.94a8.1 8.1 0 0 1 5.03.32 6.6 6.6 0 0 0 4.47.16V4.02a8.1 8.1 0 0 1-5.03-.32 6.6 6.6 0 0 0-4.47-.16Zm0 6.5a6.6 6.6 0 0 1 4.47.16 8.1 8.1 0 0 0 5.57.16l.45-.15c.3-.1.51-.39.51-.71V3a.75.75 0 0 0-.99-.71l-.44.15a6.6 6.6 0 0 1-4.54-.14 8.1 8.1 0 0 0-5.57-.16l-.45.15c-.3.1-.51.39-.51.71v10.5a.75.75 0 0 0 1.5 0v-3.46Z"></path></svg>
                                                                </div>
                                                                <div tabIndex = "0" className='uGvvFoPursl0yybhMOGs' aria-labelledby=":rea:">
                                                                    <div className='item-list_item___mihR'>
                                                                        <p className="Z2j5FoeQ_umI7vX0SmxF EkQLWhUQXERswBk6sxIb ghjFWYpaMMS6gFyyKavs">Give tasks a priority level</p>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                            <li className>
                                                                <div className='item-list_icon__k_knD'>
                                                                    <svg viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" width="20" height="20" color="var(--display-onlight-tertiary)">
                                                                        <path d="M1 4.7c-.48-.69-.39-1.62.2-2.22l.65-.64c.6-.6 1.53-.69 2.23-.21l.26.18a.75.75 0 0 1-.84 1.24l-.27-.18a.25.25 0 0 0-.31.03l-.65.64a.25.25 0 0 0-.03.32l.18.26a.75.75 0 0 1-1.24.85L1 4.7Zm14 0c.48-.69.39-1.62-.2-2.22l-.65-.64c-.6-.6-1.53-.69-2.23-.21l-.26.18a.75.75 0 1 0 .84 1.24l.27-.18c.1-.07.23-.06.32.03l.64.64c.09.09.1.22.03.32l-.18.26a.75.75 0 0 0 1.24.85L15 4.7Z"></path><path fillRule="evenodd" clipRule="evenodd" d="M8 2.25a5.75 5.75 0 0 0-4.77 8.96l-1.26 1.26a.75.75 0 1 0 1.06 1.06l1.2-1.2a5.73 5.73 0 0 0 7.55 0l1.19 1.2a.75.75 0 1 0 1.06-1.06l-1.26-1.26A5.75 5.75 0 0 0 8 2.25Zm0 1.5a4.25 4.25 0 1 0 0 8.5 4.25 4.25 0 0 0 0-8.5Z"></path><path d="M8.5 6A.75.75 0 0 0 7 6v2.5c0 .42.34.75.75.75H9.5a.75.75 0 1 0 0-1.5h-1V6Z"></path>
                                                                    </svg>
                                                                </div>
                                                                <div tabIndex = "0" className='uGvvFoPursl0yybhMOGs' aria-labelledby=":rea:">
                                                                    <div className='item-list_item___mihR'>
                                                                        <p className="Z2j5FoeQ_umI7vX0SmxF EkQLWhUQXERswBk6sxIb ghjFWYpaMMS6gFyyKavs">Remind 15 days before due</p>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                             <li className>
                                                                <div className='item-list_icon__k_knD'>
                                                                    <svg viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" width="20" height="20" color="var(--display-onlight-tertiary)">
                                                                        <FaTrashAlt />  
                                                                    </svg>
                                                                </div>
                                                                <div tabIndex = "0" className='uGvvFoPursl0yybhMOGs' aria-labelledby=":rea:">
                                                                    <div className='item-list_item___mihR'>
                                                                        <p className="Z2j5FoeQ_umI7vX0SmxF EkQLWhUQXERswBk6sxIb ghjFWYpaMMS6gFyyKavs">Delete the tasks</p>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                            <li className>
                                                                <div className='item-list_icon__k_knD'>
                                                                    <svg viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" width="20" height="20" color="var(--display-onlight-tertiary)"><path d="M8 2.751a5.25 5.25 0 1 0 0 10.5 5.25 5.25 0 0 0 0-10.5Zm-4.773.477a6.75 6.75 0 1 1 9.546 9.546 6.75 6.75 0 0 1-9.546-9.546Zm7.303 2.91a.75.75 0 0 1 0 1.06L7.864 9.865a.75.75 0 0 1-1.061 0L5.47 8.532A.75.75 0 0 1 6.53 7.47l.803.803L9.47 6.138a.75.75 0 0 1 1.06 0Z"></path></svg>
                                                                </div>
                                                                <div tabIndex = "0" className='uGvvFoPursl0yybhMOGs' aria-labelledby=":reb:">
                                                                    <div className='item-list_item___mihR'>
                                                                        <p className="Z2j5FoeQ_umI7vX0SmxF EkQLWhUQXERswBk6sxIb ghjFWYpaMMS6gFyyKavs">Complete the task</p>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                        </ol>
                                                    </div>
                                                </div> 
                                                
                                            </div>  
                                        </div>                           
                            </div>
                       </div>
                    </div>        
        </section>
      );
    };
    
    export default SliderLine;