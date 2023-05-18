import React, { useCallback, useState } from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import { Context } from './components/context';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */

function App({store}) {
  const [defaultContext, modifiedContext] = useState([]);

  const list = store.getState().list;

  const callbacks = {
   /*  onDeleteItem: useCallback((code) => {
      store.deleteItem(code);
    }, [store]) */
    
  };

  return (
    <Context.Provider value={{
      defaultContext,
      modifiedContext
    }}>
      <PageLayout>
        <Head title='Магазин'/>
        <Controls onAdd={callbacks.onAddItem}/>
        <List list={list}/>
      </PageLayout>
    </Context.Provider>
  );
}

export default App;
