export default function Slide4() {
  return (
    <section>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        padding: '2em',
        gap: '1.5em'
      }}>
        <h2 style={{
          fontFamily: 'Latin Modern Roman, Computer Modern, serif',
          fontSize: '3em',
          color: '#333',
          textAlign: 'center',
          margin: 0
        }}>
          O que está acontecendo aqui?
        </h2>

        <iframe
          width="960"
          height="540"
          src="https://www.youtube.com/embed/MlCYBrLOP3A"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          style={{
            maxWidth: '100%',
            maxHeight: '70%',
            border: 0
          }}
        />
      </div>
    </section>
  );
}
