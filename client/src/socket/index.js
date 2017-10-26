// ↓↓ socket.io-client is installed with the socket.io package ↓↓
/* eslint-disable import/no-extraneous-dependencies */
import openSocket from 'socket.io-client';

const socket = openSocket('/');

export default socket;
