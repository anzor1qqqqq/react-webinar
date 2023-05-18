import React, { useContext } from "react";
import { Context } from "../context";
import PropTypes from "prop-types";
import './style.css';

function Item(props) {
  const {defaultContext, modifiedContext} = useContext(Context);

  const callbacks = {
    addBusket: product => {
      let bool = false;

      const obj = defaultContext.map(item => {
        if (item.code === product.code) {
          bool = true;
          return {...item, count: ++item.count};
        };

        return item;
      });

      bool ? modifiedContext([...obj]) : modifiedContext([...defaultContext, {...product, count: 1}]) ;
    },

    removeProduct: (id) => {
      const obj = defaultContext.filter(item => item.code !== id);
      modifiedContext([...obj]);
    }
  };

  return (
    <div className='Item'>
      <div className='Item-code'>{props.index+1}</div>
      <div className='Item-title'>{props.item.title}</div>
      <div className='Item-actions'>
        <span className="item_price">{props.item.price} ₽</span>
        {props.modal ? <><span className="item_price">{props.item.count} шт.</span> <button onClick={() => callbacks.removeProduct(props.item.code)}>Удалить</button></> : <button onClick={() =>callbacks.addBusket(props.item)}>Добавить</button>}
      </div>
    </div>
  );
};

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    selected: PropTypes.bool,
    count: PropTypes.number
  }).isRequired,
  onDelete: PropTypes.func,
  onSelect: PropTypes.func
};

Item.defaultProps = {
  onDelete: () => {},
  onSelect: () => {},
}

export default React.memo(Item);
