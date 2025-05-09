// GoogleApp.js
import React, { useState } from 'react';
import '../../CSS/WindowsComponents.css';

const GoogleApp = () => {
  const [searched, setSearched] = useState(false);

  const handleSubmit = (e) => {
    e && e.preventDefault();
    setSearched(true);
  };

  return (
    <div
      style={{
        position: 'relative',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        margin: 0,
        padding: 0,
        zIndex: 9999,
        backgroundColor: '#fff',
      }}
    >
      {!searched ? (
        <div
          style={{
            position: 'absolute',
            top: '40%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
          }}
        >
          <img
            src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"
            alt="Google"
            style={{ width: '272px', height: '92px', marginBottom: '20px' }}
          />
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="q"
              style={{
                width: '500px',
                height: '44px',
                padding: '0 14px',
                fontSize: '16px',
                border: '1px solid #dfe1e5',
                borderRadius: '24px',
                outline: 'none',
              }}
            />
            <div style={{ marginTop: '20px' }}>
              <input
                type="submit"
                value="Buscar con Google"
                style={{
                  marginRight: '10px',
                  padding: '10px 16px',
                  fontSize: '14px',
                  color: '#3c4043',
                  backgroundColor: '#f8f9fa',
                  border: '1px solid #f8f9fa',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              />
              <input
                type="button"
                value="Me siento con suerte"
                onClick={handleSubmit}
                style={{
                  padding: '10px 16px',
                  fontSize: '14px',
                  color: '#3c4043',
                  backgroundColor: '#f8f9fa',
                  border: '1px solid #f8f9fa',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              />
            </div>
          </form>
        </div>
      ) : (
        <>
          <video
            src="/resources/rickRoll.mp4"
            style={{ width: '100%', height: '100%', backgroundColor: '#000' }}
            autoPlay
          />
          <h1 style={{
            position: 'absolute',
            top: '15%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: '#fff',
            textAlign: 'center',
            fontSize: '20px'

          }}>
           Debido a limitaciones de CORS,
           <br/> Google no se puede usar
          </h1>

          <h1 style={{
            position: 'absolute',
            top: '80%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: '#fff',
            textAlign: 'center',
            fontSize: '20px'
          }}>
            Asi que disfruta de un buen RickRoll
          </h1>
        </>
      )}
    </div>
  );
};

export default GoogleApp;
