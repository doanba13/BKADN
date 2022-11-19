import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`


  * {
    margin: 0;
    padding: 0;
  }

  html {
    min-height: 100%;
  }

  body {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 10px;
    background-color
  }

  a {
    color: gray !important;
  }

  a:hover {
    color: #ffffff !important;
    text-decoration: none !important;
  }

  ul {
    margin: 0;
    padding: 0;
  }

  ul li {
    margin-bottom: 0;
    line-height: 36px;
    position: relative;
    display: block;
    padding: 0;
  }

  hr {
    background-color: #ee772f;
    margin-top: 1rem;
    margin-bottom: 1rem;
    border: 0;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
  }

  p {
    margin-bottom: 0px;
  }

  .listScroll {
    overflow-x: hidden;
    scrollbar-width: thin;
    scrollbar-color: #ee772f #070707;

    ::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
      background-color: #070707;
    }

    ::-webkit-scrollbar {
      width: 5px;
      background-color: #ee772f;
      display: none;
    }

    ::-webkit-scrollbar-thumb {
      background-color: #ee772f;
      border: 2px solid #555555;
    }
  }

  .listScroll:hover {
    ::-webkit-scrollbar {
      display: block;
    }
  }

  }

  .ant-list-item-meta-avatar {
    margin-right: 0px !important;
  }

  .ant-modal-header {
    background: #ee772f;
    border-bottom: 2px solid #ee772f;
  }

  .ant-modal-footer {
    background: white;
    border-top: 1px solid #ee772f;
  }

  .ant-modal-title {
    font-weight: 900;
  }

  h5 {
    font-family: Roboto, sans-serif;
    font-weight: 400;
    line-height: 31px;
    color: #ffffff;
    display: inline-block;
    padding: 0px;
    margin: 0px;
  }
`;

export default GlobalStyle;
