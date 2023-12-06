import { Server } from "socket.io"
import { SocketEvent } from "../utils/SocketEvent"
import { countType } from "~/utils/SocketEvent"

let count = 0

export default defineNitroPlugin((nitroApp) => {
  const socketServer = new Server(useRuntimeConfig().public.socketPort, {
    serveClient: false,
    cors: {
      origin: "*",
    },
  })

  socketServer.on("connection", (socket) => {
    console.log("connection", { count })
    socket.broadcast.emit(SocketEvent.new_count, count)

    socket.on(SocketEvent.up, (message: countType) => {
      count += message.value
      socket.broadcast.emit(SocketEvent.new_count, count)
      socket.emit(SocketEvent.new_count, count)
      console.log("sent new Count", { count })
    })

    socket.on(SocketEvent.down, (message: countType) => {
      count -= message.value
      socket.broadcast.emit(SocketEvent.new_count, count)
      socket.emit(SocketEvent.new_count, count)
    })
  })
})
