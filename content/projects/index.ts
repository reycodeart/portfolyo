// Register project files here. Adding a project = add a JSON file + one line below.
import tls from "./tls-c2-detection.json";
import cursed from "./cursed-couriers.json";
import keystroke from "./keystroke-dynamics.json";
import face from "./face-detection-system.json";
import rl from "./rl-multiagent-cartpole.json";
import cerberion from "./cerberion.json";
import store from "./responsive-mobil-magaza.json";

export const projectFiles: Record<string, unknown> = {
  "tls-c2-detection": tls,
  "cursed-couriers": cursed,
  "keystroke-dynamics": keystroke,
  "face-detection-system": face,
  "rl-multiagent-cartpole": rl,
  cerberion,
  "responsive-mobil-magaza": store,
};
