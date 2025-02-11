//use client

import React from "react";
import Header1 from "../components/Header";

export default function Header() {
  return (
    <>
      <Header1 />
      <div
      className="qaim-background"
        style={{
          textAlign: "center",
          minHeight: '100vh',
          width: "100%",
          display: "flex",
          flexDirection: "column",
          // background: "linear-gradient(75deg, #4a2f2f, #302020, #612929)",
          backgroundImage: "url('https://xmple.com/wallpaper/red-graph-paper-grid-3840x2160-c2-8d0d19-ef0219-l2-5-115-a-0-f-20.svg')",
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          position: "relative",
          justifyContent: "center",
        }}
      >
        <div
          className="container-us"
          style={{
            padding: "20px 40px",
            width: "100%",
            borderRadius: "10px",
            position: "relative",
            zIndex: 2,
            color: "white",
            justifyContent: "space-between",
          }}
        >
          <h1
            style={{
              fontSize: "150px",
              fontWeight: "800",
              lineHeight: "0.8",
              textAlign: "left",
              textTransform: "uppercase",
            }}
          >
            Group Members:
          </h1>
          <div style={{
            width: 'max-content',
            marginLeft: 'auto',
            marginTop: '20px',
          }}>
            <p style={{ textAlign: "left" }}><b>Anas Hussain</b> - B21110006017</p>
            <p style={{ textAlign: "left" }}><b>Muntazir Hassan</b> - B21110006100</p>
            <p style={{ textAlign: "left" }}><b>Qaim Hassan</b> - B21110006105</p>
            <p style={{ textAlign: "left" }}><b>Syed Fakhir</b> - B21110006132</p>
            <p style={{ textAlign: "left" }}><b>Mohammad Ahmed</b> - B21110006058</p>
          </div>
        </div>
      </div>
    </>
  );
}
