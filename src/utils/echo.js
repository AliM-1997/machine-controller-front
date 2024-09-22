import Echo from "laravel-echo";
import Pusher from "pusher-js";

window.Pusher = Pusher;

const echo = new Echo({
  broadcaster: "pusher",
  key: "d591ff38c025910ad6b3",
  cluster: "ap2",
  encrypted: true,
});

export default echo;
