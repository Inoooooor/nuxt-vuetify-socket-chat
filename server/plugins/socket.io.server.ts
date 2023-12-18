import { Server } from "socket.io"
import { SocketEvent } from "../utils/SocketEvent"
import { SocketErrors } from "../utils/SocketErrors"
import { User } from "../utils/User"
import { countType } from "~/utils/SocketEvent"
import { ChatMessage } from "../utils/ChatMessage"

let count = 0

const messageWrapper = (
  name: string,
  text: string,
  id: string
): ChatMessage => {
  return { name, text, id }
}

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

    socket.on(SocketEvent.user_joined, (user: User, cb) => {
      if (!user.name || !user.room) return cb(SocketErrors.wrong_form_input)
      cb({ userId: socket.id })
      // socket.broadcast.emit(
      //   SocketEvent.new_message,
      //   messageWrapper("admin", `Добро пожаловать, ${user.name}`, socket.id)
      // )

      socket.join(user.room)

      socket.broadcast
        .to(user.room)
        .emit(
          SocketEvent.new_message,
          messageWrapper(
            "admin",
            `Пользователь ${user.name} подключился.`,
            socket.id
          )
        )

      socket.emit(
        SocketEvent.new_message,
        messageWrapper("admin", `Добро пожаловать, ${user.name}.`, socket.id)
      )
    })
  })
})
