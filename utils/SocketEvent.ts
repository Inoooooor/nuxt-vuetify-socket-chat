export enum SocketEvent {
  up = "up",
  down = "down",
  new_count = "new_count",
  user_joined = "user_joined",
  create_message = "create_message",
  new_message = "new_message",
}

export type countType = { value: number }
