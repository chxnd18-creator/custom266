import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti'; // 🛠️ นำเข้าโมดูลพลุฉลอง

export default function App() {
  const [step, setStep] = useState(1);
  const [rejectCount, setRejectCount] = useState(0);
  const [isFinalBlow, setIsFinalBlow] = useState(false);
  
  // ขนาดเริ่มต้นปุ่มตกลง
  const [yesWidth, setYesWidth] = useState(120);
  const [yesHeight, setYesHeight] = useState(48);
  const [yesFontSize, setYesFontSize] = useState(16);

  // ขนาดเริ่มต้นปุ่มปฏิเสธ
  const [noWidth, setNoWidth] = useState(120);
  const [noHeight, setNoHeight] = useState(48);
  const [noFontSize, setNoFontSize] = useState(14);

  const rejectContent = [
    { text: "ไม่เป็น", img: "/image/1.gif" },                    
    { text: "คิดอีกทีน้า...", img: "/image/2.gif" },         
    { text: "จริงหรอออ?", img: "/image/3.gif" },             
    { text: "ไม่ชอบเค้าหรอ", img: "/image/4.gif" },          
    { text: "ใจร้ายยยย", img: "/image/5.gif" },                
    { text: "กดปุ่มข้างๆ น้า", img: "/image/6.gif" },        
    { text: "ยอมกันดีๆ นะ!", img: "/image/7.gif" },    
    { text: "ไม่ยอมเป็นจริงอะ", img: "/image/8.gif" } 
  ];

  // 🛠️ ฟังก์ชันยิงพลุฉลอง
  const fireConfetti = () => {
    // ยิงพลุจากฝั่งซ้าย
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { x: 0.1, y: 0.6 }
    });
    // ยิงพลุจากฝั่งขวา
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { x: 0.9, y: 0.6 }
    });
  };

  // 🛠️ ฟังก์ชันจัดการเมื่อยอมกดปุ่ม "เป็น"
  const handleAccept = () => {
    fireConfetti(); // ยิงพลุลูกแรกทันทีที่กด!
    setStep(3);     // สลับไปหน้าฉลองสำเร็จ
  };

  // 🛠️ ลูปให้ยิงพลุเพิ่มเรื่อยๆ ทุกๆ 2 วินาทีในหน้าสุดท้าย เพื่อเพิ่มความอลังการ
  useEffect(() => {
    if (step === 3) {
      const interval = setInterval(() => {
        fireConfetti();
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [step]);

  const handleReject = () => {
    if (rejectCount === rejectContent.length - 1) {
      setIsFinalBlow(true);
      return;
    }

    setRejectCount((prev) => prev + 1);
    
    setYesWidth((prev) => prev + 25);
    setYesHeight((prev) => prev + 10);
    setYesFontSize((prev) => prev + 2);

    setNoWidth((prev) => Math.max(prev - 8, 90));
    setNoHeight((prev) => Math.max(prev - 3, 38));
    setNoFontSize((prev) => Math.max(prev - 0.5, 12));
  };

  const styles = {
    container: {
      minHeight: '100vh',
      width: '100vw',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#ffe4e6',
      fontFamily: '"Mitr", -apple-system, sans-serif',
      margin: 0,
      padding: 0,
      boxSizing: 'border-box',
      userSelect: 'none',
      position: 'relative',
      overflow: 'hidden',
    },
    card: {
      backgroundColor: '#ffffff',
      width: 'min(320px, 85vw)',
      height: '380px',
      borderRadius: '24px',
      boxShadow: '0 10px 30px rgba(225, 29, 72, 0.08)',
      border: '1px solid #ffe4e6',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px 20px',
      boxSizing: 'border-box',
    },
    imageStyle: {
      width: '120px', 
      height: '120px', 
      objectFit: 'contain',
    },
    title: {
      fontSize: '18px', 
      fontWeight: '600',
      color: '#374151',
      margin: '16px 0 0 0',
      textAlign: 'center',
    },
    buttonWrapper: {
      position: 'relative',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '16px', 
      marginTop: '24px', 
      width: '100%',
      height: '120px',   
    },
    baseButton: {
      fontFamily: '"Mitr", sans-serif', 
      fontWeight: '500',
      border: 'none',
      borderRadius: '12px',
      cursor: 'pointer',
      outline: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxSizing: 'border-box',
      whiteSpace: 'nowrap',
      transition: 'all 0.2s ease-out',
    },
    startButton: {
      width: '100%',
      height: '48px',
      fontSize: '16px',
      backgroundColor: '#f43f5e',
      color: '#ffffff',
      marginTop: '32px',
    },
    yesButton: isFinalBlow ? {
      position: 'absolute',
      width: '100%', 
      height: '100%',
      fontSize: '32px', 
      backgroundColor: '#10b981',
      color: '#ffffff',
      zIndex: 10,
      boxShadow: '0 10px 20px rgba(16, 185, 129, 0.3)',
    } : {
      backgroundColor: '#10b981',
      color: '#ffffff',
      boxShadow: '0 4px 12px rgba(16, 185, 129, 0.2)',
      width: `${yesWidth}px`,
      height: `${yesHeight}px`,
      fontSize: `${yesFontSize}px`,
    },
    rejectButton: {
      backgroundColor: '#f3f4f6',
      color: '#4b5563',
      padding: '0 8px',
      width: `${noWidth}px`,
      height: `${noHeight}px`,
      fontSize: `${noFontSize}px`,
    },
    finalParagraph: {
      fontSize: '15px', 
      color: '#f43f5e', 
      marginTop: '16px', 
      fontWeight: '400',
      textAlign: 'center', 
      lineHeight: '1.6',   
      margin: '16px 12px 0 12px' 
    }
  };

  return (
    <div style={styles.container}>
      {/* STEP 1 */}
      {step === 1 && (
        <div style={styles.card}>
          <img src="/image/hello.gif" alt="Wave Hand" style={styles.imageStyle} />
          <h1 style={styles.title}>เทอเค้ามีอะไรจะบอก</h1>
          <p style={{ fontSize: '14px', color: '#9ca3af', margin: '8px 0 0 0' }}>กดดูหน่อยสิ</p>
          <button 
            onClick={() => setStep(2)} 
            style={{ ...styles.baseButton, ...styles.startButton }}
          >
            ถามมาเลย
          </button>
        </div>
      )}

      {/* STEP 2 */}
      {step === 2 && (
        <div style={styles.card}>
          <img 
            src={isFinalBlow ? "/image/9.gif" : rejectContent[rejectCount].img} 
            alt="Status Reaction" 
            style={styles.imageStyle} 
          />
          <h1 style={styles.title}>เป็นแฟนกันมั้ย?🥺</h1>
          
          <div style={styles.buttonWrapper}>
            {/* 🛠️ เปลี่ยนมากดผ่านฟังก์ชัน handleAccept */}
            <button onClick={handleAccept} style={{ ...styles.baseButton, ...styles.yesButton }}>
              เป็น
            </button>

            {!isFinalBlow && (
              <button onClick={handleReject} style={{ ...styles.baseButton, ...styles.rejectButton }}>
                {rejectContent[rejectCount].text}
              </button>
            )}
          </div>
        </div>
      )}

      {/* STEP 3 */}
      {step === 3 && (
        <div style={styles.card}>
          <img src="/image/end.gif" alt="Party" style={styles.imageStyle} />
          <h1 style={styles.title}>เย้ เป็นแฟนกันแล้วนะ</h1>
          <p style={styles.finalParagraph}>
           ขอบคุณน้าที่เลือกเค้า เค้าสัญญาว่าจะเป็นแฟนที่ดีของเธอ<br /> จะทำให้เธอมีความสุขที่สุดเลย<br />
          </p>
        </div>
      )}
    </div>
  );
}