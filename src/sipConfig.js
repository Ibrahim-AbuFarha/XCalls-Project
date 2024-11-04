import { UserAgent, Registerer } from "sip.js";

const uri = UserAgent.makeURI("sip:101@sip.xtrevo.com");

const userAgentOptions = {
  authorizationUsername: "101",
  authorizationPassword: "severalleddepend8912@@",
  uri,
  transportOptions: {
    server: "wss://sip.xtrevo.com:8443/asterisk-wss",
  },
};
const userAgent = new UserAgent(userAgentOptions);

const registerer = new Registerer(userAgent);

userAgent.start().then(() => {
  registerer.register();
});

export default userAgent;
