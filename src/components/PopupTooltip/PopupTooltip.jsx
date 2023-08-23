import React, { useEffect } from 'react'
import "./PopupTooltip.css"

function PopupTooltip ({ isOpen, onClose, text}) {

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
    <div className={`popup-tooltip ${isOpen ? 'popup-tooltip_opened' : '' }`} onClick={onOverlayClose}>
      <div className="popup-tooltip__content">
        <h4 className="popup-tooltip__title">Ошибка!</h4>
        <p className="popup-tooltip__text">{text}</p>
        <button type="button" className='popup-tooltip__btn-close' onClick={onClose}></button>
      </div>
    </div>

  )
}

export default PopupTooltip;
