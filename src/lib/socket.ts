import { io } from "socket.io-client";

const url = process.env.NEXT_PUBLIC_CALLBACK_URL || process.env.CALLBACK_URL

export const socket = io(url);