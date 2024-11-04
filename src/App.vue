<template>
  <main class="d-flex flex-column flex-lg-row">
    <aside class="sidebar p-3 text-white">
      <button @click="resetCall" class="btn btn-gradient  d-flex align-items-center justify-content-center">
        <i class="fa fa-phone mr-2"></i> Dialer
      </button>
    </aside>

    <div class="content d-flex items-center w-100  bg-white">
      <div class="w-75  d-flex h-100 align-items-center justify-content-center  ">
        <Dialer v-if="callStatus === 'Idle'" @startCall="handleStartCall" />
        <CallRinging v-if="callStatus === 'Ringing'" :phoneNumber="phoneNumber" @endCall="endCurrentCall" />
        <IncomingCall v-if="callStatus === 'Incoming'" :callerName="callerName" @acceptCall="answerCall"
          @rejectCall="rejectCall" />
        <CallActive v-if="callStatus === 'In Progress' && callDirection === 'Incoming'" :callerName="callerName"
          :callDuration="callDuration" @endCall="endCurrentCall" />
        <CallActive v-if="callStatus === 'In Progress' && callDirection === 'Outgoing'" :phoneNumber="phoneNumber"
          :callDuration="callDuration" @endCall="endCurrentCall" />
        <CallSummary v-if="callStatus === 'Call Ended'" :callSummary="callSummary" @resetCall="resetCall" />
      </div>
      <div class="p-3  w-25 h-100 shadow">
        <CallLogs :callLog="callLog" />
      </div>
    </div>
  </main>
</template>

<script>
import "./assets/app.css"
import userAgent from './sipConfig';
import { Inviter, UserAgent } from 'sip.js';
import Dialer from './components/Dialer.vue';
import CallActive from './components/CallActive.vue';
import IncomingCall from './components/IncomingCall.vue';
import CallSummary from './components/CallSummary.vue';
import CallLogs from './components/CallLogs.vue';
import CallRinging from './components/CallRinging.vue';

export default {
  components: { Dialer, CallActive, IncomingCall, CallSummary, CallLogs, CallRinging },
  data() {
    return {
      callStatus: 'Idle',
      callerName: '',
      phoneNumber: '',
      callSummary: null,
      currentSession: null,
      callLog: [],
      callStartTime: null,
      callDirection: null,
      callDuration: 0,
      timer: null,
    };
  },
  mounted() {
    userAgent.start();
    userAgent.delegate = {
      onInvite: (invitation) => this.handleIncomingCall(invitation),
    };
  },
  methods: {
    async handleStartCall(phoneNumber) {
      const targetURI = UserAgent.makeURI(`sip:${phoneNumber}@sip.xtrevo.com`);
      const inviter = new Inviter(userAgent, targetURI);
      this.currentSession = inviter;
      this.callDirection = 'Outgoing';
      try {
        await inviter.invite();

        this.callStatus = 'Ringing';
        this.phoneNumber = phoneNumber;
        this.callStartTime = new Date();

        inviter.stateChange.addListener((state) => {
          if (state === 'Terminated') {
            this.finalizeCall('Accepted');
          }
        });
      } catch (error) {
        console.error('Call failed:', error);
        this.finalizeCall('Failed');
      }
    },
    startTimer() {
      this.callDuration = 0;
      if (this.timer) clearInterval(this.timer);
      this.timer = setInterval(() => {
        this.callDuration++;
      }, 1000);
    },
    async answerCall() {
      if (this.currentSession) {
        await this.currentSession.accept();
        this.callStatus = 'In Progress';
        this.callStartTime = new Date();

        this.currentSession.stateChange.addListener((state) => {
          if (state === 'Terminated') {
            this.finalizeCall('Accepted');
          }
        });
      }
    },
    endCurrentCall() {
      if (this.currentSession) {
        this.currentSession.bye().catch((error) => console.error("Error ending call:", error));
      }
      this.finalizeCall('Accepted');
    },
    finalizeCall(status) {
      clearInterval(this.timer);
      const endTime = new Date();
      const duration = this.callStartTime ? Math.floor((endTime - this.callStartTime) / 1000) : 0;

      if (this.callStartTime && !this.callLog.some(log => log.startTime === this.callStartTime)) {
        this.logCall(this.callStartTime, endTime, duration, status);
      }

      this.currentSession = null;
      this.callStatus = 'Call Ended';
      this.callStartTime = null;
      this.callDuration = 0;
      this.callDirection = null;
    },
    logCall(startTime, endTime, duration, status) {
      this.callSummary = { startTime, endTime, duration, status };
      this.callLog.push({ startTime, endTime, duration, status });
    },
    handleIncomingCall(invitation) {
      this.currentSession = invitation;
      this.callStatus = 'Incoming';
      this.callerName = invitation.remoteIdentity.uri.user;
      this.callDirection = 'Incoming';

      this.currentSession.stateChange.addListener((state) => {
        if (state === 'Established') {
          this.callStatus = 'In Progress';
          this.callStartTime = new Date();
          this.startTimer();
        } else if (state === 'Terminated' && this.callStatus !== 'In Progress') {
          this.finalizeCall('Rejected');
        }
      });
    },
    async rejectCall() {
      if (this.currentSession) {
        await this.currentSession.reject().catch((error) => console.error("Error rejecting call:", error));
        this.finalizeCall('Rejected');
      }
    },
    resetCall() {
      this.callStatus = 'Idle';
      this.callSummary = null;
      this.currentSession = null;
      this.callStartTime = null;
      this.callDuration = 0;
      this.callDirection = null;
    },
  },
};
</script>
