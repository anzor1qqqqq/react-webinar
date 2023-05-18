import React, { forwardRef } from "react";
import PropTypes from "prop-types";
import './style.css';

const Head = forwardRef(({title, close, modal}, ref) => {
  return (
    <div className={'Head' + (modal ? ' modal' : '')}>
      <h1>{title}</h1>
      {close && <button className="btn_modal_close" onClick={() => ref.current.classList.remove('active')}>Закрыть</button>}
    </div>
  )
});

Head.propTypes = {
  title: PropTypes.node,
};

export default React.memo(Head);
