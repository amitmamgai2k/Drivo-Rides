import * as React from "react";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

export default function VideoPanel({ roomID, setVideoCall }) {
  const myMeeting = async (element) => {
    if (!roomID) return;

    const appID = Number(import.meta.env.VITE_ZEGO_APP_ID);
    console.log("appID", appID);

    const serverSecret = import.meta.env.VITE_ZEGO_SERVER_SECRET;
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomID,
      "User-" + Math.floor(Math.random() * 10000),
      "Username"
    );

    const zp = ZegoUIKitPrebuilt.create(kitToken);
    zp.joinRoom({
      container: element,
      scenario: { mode: ZegoUIKitPrebuilt.OneONoneCall },
      showPreJoinView: true,
      onLeaveRoom: () => setVideoCall(false),
    });
  };

  return <div className="myCallContainer" ref={myMeeting} style={{ width: "100vw", height: "100vh" }} />;
}
