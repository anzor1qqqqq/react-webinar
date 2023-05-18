import React, { useContext, useRef, useState, useMemo } from "react";
import { Context } from "../context";
import { plural } from "../../utils";
import PropTypes from 'prop-types';
import { cn as bem } from "@bem-react/classname";
import Head from "../head";
import List from "../list";
import './style.css';

function Controls({onAdd}) {
  const [defaultvalueAllPrice, modifiedvalueAllPrice] = useState(0);
  const { defaultContext, modifiedContext } = useContext(Context);
  const refModal = useRef();

  const bemClass = bem('Controls');

  useMemo(() => {
    let allPrice = defaultContext.reduce((prev, elem) => {
      return elem.price * elem.count + prev;
    }, 0);

    modifiedvalueAllPrice(allPrice);
  }, [defaultContext]);

  const openModal = () => {
    refModal.current.classList.add('active');
  };
  
  return (
    <div className={bemClass()}>
      <span className={bemClass('text')}>В корзине: <b>{defaultContext.length ? defaultContext.length + ` ${plural(defaultContext.length, {one: 'товар', few: 'товара', many: 'товаров'})}` + ` / ${defaultvalueAllPrice} ₽` : 'пусто'}</b></span>
      <button onClick={() => openModal()}>Перейти</button>

      <div className='container_modal' ref={refModal}>
        <div className="container_modal_wrapper">
          <div className="container_modal_wrapper-busket">

          <Head title={'Корзина'} close={true} modal={'active'} ref={refModal}/>
          <List list={defaultContext} modal={true} />

          <div className="container_resul">
            {!defaultContext.length ? <h1 className="title_empty">Пусто</h1> : <><span className="resul_text"><b>Итого:</b></span><span><b>{defaultvalueAllPrice} ₽</b></span></>}
          </div>
          </div>
        </div>
      </div>
    </div>
  )
}

Controls.propTypes = {
  onAdd: PropTypes.func
};

Controls.defaultProps = {
  onAdd: () => {}
}

export default React.memo(Controls);