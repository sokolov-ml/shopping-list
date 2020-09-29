import React from 'react';

export const CurrentTheme = React.createContext();

export const themes = {
  default: {
    sideBar: {
      backgroundColor: '#f8f8f8',
      list: { color: '#333' },
      selectedList: { bg: '#f8f8f8', color: '#fff' },
    },
    tasks: { backgroundColor: '#fff', color: '#000' },
  },
  dark: {
    sideBar: {
      backgroundColor: '#333',
      list: { color: '#aaa' },
      selectedList: { bg: '#777', color: '#fff' },
    },
    tasks: {
      backgroundColor: '#555',
      color: '#fff',
    },
    icons: {
      stroke: '#eee',
    },
    addList: {
      backgroundColor: '#666',
    },
  },
};
