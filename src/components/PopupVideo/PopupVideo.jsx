import React, { useEffect } from "react";
import "./PopupVideo.css";
import Preloader from "../Preloader/Preloader";

function PopupVideo({ isLoading, name, link = '', onClose, isOpen }) {

  const replaceLink = (link) => {
    if (link.includes('youtube')) {
      return link.replace('/watch?v=', '/embed/');
    } else if (link.includes('vimeo')) {
      return link.replace('vimeo.com/', 'player.vimeo.com/video/');
    }
    return link;
  }

  useEffect(() => {
    if(!isOpen) return;
    const closeByEsc = (e) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }
    document.addEventListener('keydown', closeByEsc)
    return () => document.removeEventListener('keydown', closeByEsc)
  }, [isOpen, onClose])

  const onOverlayClose = (e) => {
    if(e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div className={`popup ${isOpen ? 'popup_opened' : ''}`} onClick={onOverlayClose}>
      <div className="popup__content">
        {isLoading && <Preloader/>}
        {!isLoading &&
        <iframe
        src={replaceLink(link)}
        className="popup__iframe"
        title={name}
        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
        allowFullScreen/>}
        <button
        type="button"
        className="popup__btn-close"
        onClick={onClose}
        />
      </div>
    </div>
  )
}

export default PopupVideo;
