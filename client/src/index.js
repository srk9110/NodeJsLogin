import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
//리덕스 관련
import {Provider} from 'react-redux';
import { applyMiddleware, createStore} from 'redux';
import promiseMiddleware from 'redux-promise';
import ReduxThunk from 'redux-thunk';
import Reducer from './_reducers/index'


//리덕스스토어 설정
//미들웨어 추가 (기본 스토어는 객체만 받기 때문에 promise와 function을 받을 수 있게 추가)
const createStoreWithMiddleware=applyMiddleware(promiseMiddleware, ReduxThunk)(createStore);

//provider로 감싸면 리덕스 사용
ReactDOM.render(
  <Provider
    store={createStoreWithMiddleware(Reducer,
      //구글 크롬 익스텐션
      window.__REDUX_DEVTOOLS_EXTENSION__ && 
      window.__REDUX_DEVTOOLS_EXTENSION__()
      )}
    >
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
